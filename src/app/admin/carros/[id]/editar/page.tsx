import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Header from "../../../../../components/Header";
import AdminCarForm from "../../../../../components/AdminCarForm";
import { isAdminAuthenticated } from "../../../../../lib/adminAuth";
import { prisma } from "../../../../../lib/prisma";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login?next=/admin/carros");
  }

  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <Link
            href="/admin/carros"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Voltar para o catálogo
          </Link>

          <p className="mt-6 text-sm font-semibold text-blue-600">
            Administração
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Editar veículo
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Atualize os dados de {car.brand} {car.model}.
          </p>
        </div>

        <AdminCarForm
          mode="edit"
          initialData={{
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
            image: car.image,
          }}
        />
      </section>
    </main>
  );
}
