import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function createCarLine(car: {
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
}) {
  return `${car.brand} ${car.model} — ${car.category}, ${car.year}, ${car.engine}, ${car.transmission}, ${car.fuel}, ${car.consumption}, a partir de ${formatPrice(car.price)}.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem inválida." },
        { status: 400 },
      );
    }

    const cars = await prisma.car.findMany({
      orderBy: {
        price: "asc",
      },
      select: {
        id: true,
        brand: true,
        model: true,
        category: true,
        year: true,
        engine: true,
        power: true,
        transmission: true,
        consumption: true,
        price: true,
        fuel: true,
        colors: true,
        items: true,
        description: true,
      },
    });

    const question = normalizeText(message);

    if (cars.length === 0) {
      return NextResponse.json({
        answer:
          "No momento não encontrei veículos cadastrados no catálogo. Tente novamente mais tarde.",
      });
    }

    if (
      question.includes("automatico") ||
      question.includes("automatica") ||
      question.includes("automaticos")
    ) {
      const automaticCars = cars.filter((car) =>
        normalizeText(car.transmission).includes("automatic"),
      );

      const answer =
        automaticCars.length > 0
          ? `Temos ${automaticCars.length} modelo(s) automático(s) disponível(is):\n\n${automaticCars
              .map(createCarLine)
              .join("\n")}`
          : "No momento não encontrei modelos automáticos no catálogo.";

      return NextResponse.json({ answer });
    }

    if (question.includes("manual") || question.includes("manuais")) {
      const manualCars = cars.filter((car) =>
        normalizeText(car.transmission).includes("manual"),
      );

      const answer =
        manualCars.length > 0
          ? `Temos ${manualCars.length} modelo(s) manual(is) disponível(is):\n\n${manualCars
              .map(createCarLine)
              .join("\n")}`
          : "No momento não encontrei modelos manuais no catálogo.";

      return NextResponse.json({ answer });
    }

    if (question.includes("suv") || question.includes("utilitario")) {
      const suvs = cars.filter((car) =>
        normalizeText(car.category).includes("suv"),
      );

      const answer =
        suvs.length > 0
          ? `Encontrei estes SUVs no catálogo:\n\n${suvs
              .map(createCarLine)
              .join("\n")}`
          : "No momento não encontrei SUVs cadastrados no catálogo.";

      return NextResponse.json({ answer });
    }

    if (
      question.includes("economico") ||
      question.includes("economica") ||
      question.includes("consumo") ||
      question.includes("gasta menos")
    ) {
      const economicalCars = cars.slice(0, 5);

      return NextResponse.json({
        answer: `Para quem busca economia, estes modelos podem ser boas opções para comparar:\n\n${economicalCars
          .map(createCarLine)
          .join(
            "\n",
          )}\n\nRecomendo observar também o tipo de uso: cidade, estrada ou uso misto.`,
      });
    }

    if (
      question.includes("barato") ||
      question.includes("menor preco") ||
      question.includes("mais em conta") ||
      question.includes("ate 100") ||
      question.includes("100 mil")
    ) {
      const affordableCars = cars.filter((car) => car.price <= 100000);

      const answer =
        affordableCars.length > 0
          ? `Encontrei estes modelos até R$ 100 mil:\n\n${affordableCars
              .map(createCarLine)
              .join("\n")}`
          : "No momento não encontrei modelos até R$ 100 mil no catálogo.";

      return NextResponse.json({ answer });
    }

    if (
      question.includes("comparar") ||
      question.includes("compare") ||
      question.includes("diferenca")
    ) {
      return NextResponse.json({
        answer:
          "Você pode comparar modelos na página Comparar. Lá é possível escolher até três veículos e analisar preço, motor, câmbio, consumo, combustível, cores e itens principais lado a lado.",
      });
    }

    const mentionedCars = cars.filter((car) => {
      const fullName = normalizeText(`${car.brand} ${car.model}`);
      const model = normalizeText(car.model);
      const brand = normalizeText(car.brand);

      return (
        question.includes(fullName) ||
        question.includes(model) ||
        question.includes(brand)
      );
    });

    if (mentionedCars.length > 0) {
      return NextResponse.json({
        answer: `Encontrei estes veículos relacionados à sua pergunta:\n\n${mentionedCars
          .slice(0, 5)
          .map(createCarLine)
          .join(
            "\n",
          )}\n\nVocê pode abrir os detalhes do modelo no catálogo para enviar seu interesse.`,
      });
    }

    const featuredCars = cars.slice(0, 4);

    return NextResponse.json({
      answer: `Posso ajudar você a encontrar um veículo pelo tipo de uso, preço, câmbio, consumo ou categoria. Alguns modelos disponíveis no catálogo são:\n\n${featuredCars
        .map(createCarLine)
        .join(
          "\n",
        )}\n\nVocê também pode perguntar algo como: “quais modelos automáticos estão disponíveis?” ou “qual carro mais econômico até R$ 100 mil?”.`,
    });
  } catch (error) {
    console.error("Erro no chat:", error);

    return NextResponse.json(
      { error: "Erro ao responder mensagem." },
      { status: 500 },
    );
  }
}
