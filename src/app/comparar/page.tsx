import Header from "../../components/Header";
import CompareClient from "../../components/CompareClient";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
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
      image: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />
      <CompareClient cars={cars} />
    </main>
  );
}
