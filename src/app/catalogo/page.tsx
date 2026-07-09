import Header from "@/components/Header";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

const brands = Array.from(new Set(cars.map((car) => car.brand)));
const categories = Array.from(new Set(cars.map((car) => car.category)));
const fuels = Array.from(new Set(cars.map((car) => car.fuel)));

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Catálogo
            </p>

            <h1 className="mt-3 text-5xl font-bold tracking-tight">
              Escolha seu próximo carro
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Explore os modelos disponíveis, compare especificações e encontre
              o veículo mais adequado para o seu perfil.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm">
            <p className="font-semibold text-slate-950">
              {cars.length} veículos
            </p>
            <p className="text-slate-500">disponíveis no catálogo</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Filtros</h2>

              <span className="text-sm font-semibold text-blue-600">
                Limpar
              </span>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">
                Buscar
              </label>

              <input
                disabled
                placeholder="Modelo ou montadora"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </div>

            <FilterGroup title="Montadora" items={brands} />
            <FilterGroup title="Categoria" items={categories} />
            <FilterGroup title="Combustível" items={fuels} />

            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-700">
                Preço máximo
              </p>

              <div className="mt-3 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Até R$ 300.000
                </p>

                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-3/4 rounded-full bg-blue-600" />
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Mostrando todos os veículos
              </p>

              <select
                disabled
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none"
              >
                <option>Ordenar por relevância</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-7">
      <p className="text-sm font-semibold text-slate-700">{title}</p>

      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
          >
            <input
              disabled
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />

            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
