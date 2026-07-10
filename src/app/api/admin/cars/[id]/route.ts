import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/adminAuth";
import { prisma } from "../../../../../lib/prisma";

function parseText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function parseTextArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

function validateCarPayload(body: unknown) {
  if (!body || typeof body !== "object") {
    return {
      error: "Dados inválidos.",
      data: null,
    };
  }

  const payload = body as Record<string, unknown>;

  const brand = parseText(payload.brand);
  const model = parseText(payload.model);
  const category = parseText(payload.category);
  const year = parseNumber(payload.year);
  const engine = parseText(payload.engine);
  const power = parseText(payload.power);
  const transmission = parseText(payload.transmission);
  const consumption = parseText(payload.consumption);
  const price = parseNumber(payload.price);
  const fuel = parseText(payload.fuel);
  const description = parseText(payload.description);
  const image = parseText(payload.image);
  const colors = parseTextArray(payload.colors);
  const items = parseTextArray(payload.items);

  if (!brand) return { error: "Informe a montadora.", data: null };
  if (!model) return { error: "Informe o modelo.", data: null };
  if (!category) return { error: "Informe a categoria.", data: null };

  if (!year || year < 1900 || year > 2100) {
    return { error: "Informe um ano válido.", data: null };
  }

  if (!engine) return { error: "Informe o motor.", data: null };
  if (!power) return { error: "Informe a potência.", data: null };
  if (!transmission) return { error: "Informe o câmbio.", data: null };
  if (!consumption) return { error: "Informe o consumo.", data: null };

  if (!price || price <= 0) {
    return { error: "Informe um preço válido.", data: null };
  }

  if (!fuel) return { error: "Informe o combustível.", data: null };
  if (!description) return { error: "Informe a descrição.", data: null };

  if (!image || !image.startsWith("/images/cars/")) {
    return {
      error: "Informe uma imagem válida começando com /images/cars/.",
      data: null,
    };
  }

  if (colors.length === 0) {
    return { error: "Informe pelo menos uma cor.", data: null };
  }

  if (items.length === 0) {
    return { error: "Informe pelo menos um item de série.", data: null };
  }

  return {
    error: null,
    data: {
      brand,
      model,
      category,
      year,
      engine,
      power,
      transmission,
      consumption,
      price,
      fuel,
      description,
      image,
      colors,
      items,
    },
  };
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID do veículo não informado." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const validation = validateCarPayload(body);

    if (validation.error || !validation.data) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const carExists = await prisma.car.findUnique({
      where: { id },
    });

    if (!carExists) {
      return NextResponse.json(
        { error: "Veículo não encontrado." },
        { status: 404 },
      );
    }

    const updatedCar = await prisma.car.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json({
      success: true,
      car: updatedCar,
    });
  } catch (error) {
    console.error("Erro ao editar veículo:", error);

    return NextResponse.json(
      { error: "Erro interno ao editar o veículo." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID do veículo não informado." },
        { status: 400 },
      );
    }

    const carExists = await prisma.car.findUnique({
      where: { id },
    });

    if (!carExists) {
      return NextResponse.json(
        { error: "Veículo não encontrado." },
        { status: 404 },
      );
    }

    const leadsCount = await prisma.lead.count({
      where: { carId: id },
    });

    if (leadsCount > 0) {
      return NextResponse.json(
        {
          error:
            "Este veículo possui leads vinculados e não pode ser excluído com segurança.",
        },
        { status: 409 },
      );
    }

    await prisma.car.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);

    return NextResponse.json(
      { error: "Erro interno ao excluir o veículo." },
      { status: 500 },
    );
  }
}
