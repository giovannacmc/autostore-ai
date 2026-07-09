import { prisma } from "./prisma";
import { gemini, GEMINI_EMBEDDING_MODEL } from "./gemini";

export type RetrievedChunk = {
  id: string;
  title: string;
  content: string;
  score: number;
};

export function createCarChunks(car: {
  id: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  engine: string;
  power: string;
  transmission: string;
  consumption: string;
  price: number;
  fuel: string;
  colors: string[];
  items: string[];
  description: string;
}) {
  const carName = `${car.brand} ${car.model}`;

  return [
    {
      carId: car.id,
      title: `${carName} - resumo`,
      content: `
Veículo: ${carName}
Categoria: ${car.category}
Ano: ${car.year}
Preço: R$ ${car.price}
Combustível: ${car.fuel}
Descrição: ${car.description}
      `.trim(),
    },
    {
      carId: car.id,
      title: `${carName} - especificações`,
      content: `
Veículo: ${carName}
Motor: ${car.engine}
Potência: ${car.power}
Câmbio: ${car.transmission}
Consumo: ${car.consumption}
Cores disponíveis: ${car.colors.join(", ")}
Itens principais: ${car.items.join(", ")}
      `.trim(),
    },
  ];
}

export async function generateEmbedding(text: string) {
  if (!gemini) {
    throw new Error("GEMINI_API_KEY não configurada.");
  }

  const response = await gemini.models.embedContent({
    model: GEMINI_EMBEDDING_MODEL,
    contents: text,
  });

  const values = response.embeddings?.[0]?.values;

  if (!values) {
    throw new Error("Não foi possível gerar embedding.");
  }

  return values;
}

function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < a.length; index++) {
    dotProduct += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieveRelevantChunks(question: string, limit = 5) {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = await prisma.ragChunk.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      embedding: true,
    },
  });

  const scoredChunks = chunks
    .map((chunk) => {
      const embedding = chunk.embedding as number[];

      return {
        id: chunk.id,
        title: chunk.title,
        content: chunk.content,
        score: cosineSimilarity(questionEmbedding, embedding),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scoredChunks;
}
