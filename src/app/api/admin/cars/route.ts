import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/adminAuth";
import { prisma } from "../../../../lib/prisma";

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function createUniqueCarId(brand: string, model: string) {
  const baseId = `${slugify(brand)}-${slugify(model)}`;
  let carId = baseId;
  let counter = 2;

  while (await prisma.car.findUnique({ where: { id: carId } })) {
    carId = `${baseId}-${counter}`;
    counter += 1;
  }

  return carId;
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
  if (!year || year < 1900)
    return { error: "Informe um ano válido.", data: null };
  if (!engine) return { error: "Informe o motor.", data: null };
  if (!power) return { error: "Informe a potência.", data: null };
  if (!transmission) return { error: "Informe o câmbio.", data: null };
  if (!consumption) return { error: "Informe o consumo.", data: null };
  if (!price || price <= 0)
    return { error: "Informe um preço válido.", data: null };
  if (!fuel) return { error: "Informe o combustível.", data: null };
  if (!description) return { error: "Informe a descrição.", data: null };

  if (!image || !image.startsWith("/images/cars/")) {
    return {
      error: "Informe uma imagem válida dentro de /images/cars/.",
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

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Acesso não autorizado." },
      { status: 401 },
    );
  }

  const cars = await prisma.car.findMany({
    orderBy: [{ brand: "asc" }, { model: "asc" }],
  });

  return NextResponse.json({ cars });
}

export async function POST(request: Request) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Acesso não autorizado." },
      { status: 401 },
    );
  }

  const body = await request.json();
  const validation = validateCarPayload(body);

  if (validation.error || !validation.data) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const id = await createUniqueCarId(
    validation.data.brand,
    validation.data.model,
  );

  const car = await prisma.car.create({
    data: {
      id,
      ...validation.data,
    },
  });

  return NextResponse.json({ car }, { status: 201 });
}
