import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../../../components/Header";
import AdminDeleteCarButton from "../../../components/AdminDeleteCarButton";
import AdminLogoutButton from "../../../components/AdminLogoutButton";
import { isAdminAuthenticated } from "../../../lib/adminAuth";
import { prisma } from "../../../lib/prisma";

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function AdminCarsPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login?next=/admin/carros");
  }

  const cars = await prisma.car.findMany({
    orderBy: [{ brand: "asc" }, { model: "asc" }],
    include: {
      leads: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">Administração</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Gerenciar catálogo
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Cadastre, edite e remova veículos exibidos no catálogo da
              AutoStore.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/leads"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Ver leads
            </Link>

            <Link
              href="/admin/carros/novo"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
            >
              Novo veículo
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Veículos
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {cars.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Montadoras
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {new Set(cars.map((car) => car.brand)).size}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Leads vinculados
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {cars.reduce((total, car) => total + car.leads.length, 0)}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <p className="text-lg font-semibold text-slate-950">
              Carros cadastrados
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Veículos com leads vinculados não podem ser excluídos por
              segurança.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Veículo
                  </th>

                  <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Categoria
                  </th>

                  <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Preço
                  </th>

                  <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Leads
                  </th>

                  <th className="border-b border-slate-200 px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => {
                  const carName = `${car.brand} ${car.model}`;

                  return (
                    <tr key={car.id} className="border-b border-slate-100">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-slate-50 p-2">
                            <img
                              src={car.image}
                              alt={carName}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-950">
                              {carName}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {car.year} • {car.fuel} • {car.transmission}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {car.category}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-950">
                        {formatPrice(car.price)}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {car.leads.length}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/carros/${car.id}/editar`}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Editar
                          </Link>

                          <AdminDeleteCarButton
                            carId={car.id}
                            carName={carName}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
