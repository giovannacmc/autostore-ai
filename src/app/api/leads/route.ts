import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        car: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar leads." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, message, carId } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        {
          error: "Informe nome e pelo menos um contato: e-mail ou telefone.",
        },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        carId,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar lead." },
      { status: 500 },
    );
  }
}
