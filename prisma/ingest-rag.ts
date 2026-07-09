import { PrismaClient } from "@prisma/client";
import { createCarChunks, generateEmbedding } from "../src/lib/rag";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "Configure GEMINI_API_KEY no .env antes de rodar o ingest.",
    );
  }

  const cars = await prisma.car.findMany({
    orderBy: {
      brand: "asc",
    },
  });

  await prisma.ragChunk.deleteMany();

  for (const car of cars) {
    const chunks = createCarChunks(car);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.content);

      await prisma.ragChunk.create({
        data: {
          carId: chunk.carId,
          title: chunk.title,
          content: chunk.content,
          embedding,
        },
      });

      console.log(`Chunk criado: ${chunk.title}`);
    }
  }

  console.log("Base do assistente gerada com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao gerar base do assistente:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
