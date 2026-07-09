import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        price: "asc",
      },
    });

    return NextResponse.json(cars);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar carros." },
      { status: 500 },
    );
  }
}
