import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import {
  formatWhatsapp,
  isValidEmail,
  isValidWhatsapp,
} from "../../../lib/leadValidation";

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

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (!phone || typeof phone !== "string" || !isValidWhatsapp(phone)) {
      return NextResponse.json(
        {
          error:
            "Informe um WhatsApp válido com DDD do Brasil. Exemplo: (11) 99999-9999.",
        },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: formatWhatsapp(phone),
        message: typeof message === "string" ? message.trim() : "",
        carId: typeof carId === "string" ? carId : undefined,
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
