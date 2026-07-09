import { PrismaClient } from "@prisma/client";
import { cars } from "../src/data/cars";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.deleteMany();
  await prisma.ragChunk.deleteMany();
  await prisma.car.deleteMany();

  for (const car of cars) {
    const carWithOptionalImage = car as typeof car & { image?: string };

    await prisma.car.create({
      data: {
        id: car.id,
        brand: car.brand,
        model: car.model,
        category: car.category,
        year: car.year,
        engine: car.engine,
        power: car.power,
        transmission: car.transmission,
        consumption: car.consumption,
        price: car.price,
        fuel: car.fuel,
        colors: car.colors,
        items: car.items,
        description: car.description,
        image: carWithOptionalImage.image ?? "",
      },
    });
  }

  console.log("Seed finalizado: carros carregados no banco.");
}

main()
  .catch((error) => {
    console.error("Erro no seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
