"use client";

import { useMemo, useState } from "react";
import CarCard from "./CarCard";
import type { Car } from "../types/car";

type CatalogClientProps = {
  cars: Car[];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CatalogClient({ cars }: CatalogClientProps) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [fuel, setFuel] = useState("Todos");
  const [transmission, setTransmission] = useState("Todos");

  const brands = useMemo(
    () => ["Todas", ...Array.from(new Set(cars.map((car) => car.brand)))],
    [cars],
  );

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(cars.map((car) => car.category)))],
    [cars],
  );

  const fuels = useMemo(
    () => ["Todos", ...Array.from(new Set(cars.map((car) => car.fuel)))],
    [cars],
  );

  const transmissions = ["Todos", "Automático", "Manual"];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const text = `${car.brand} ${car.model} ${car.category}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesBrand = brand === "Todas" || car.brand === brand;
      const matchesCategory = category === "Todas" || car.category === category;
      const matchesFuel = fuel === "Todos" || car.fuel === fuel;

      const matchesTransmission =
        transmission === "Todos" ||
        (transmission === "Automático" &&
          car.transmission.toLowerCase().includes("autom")) ||
        (transmission === "Manual" &&
          car.transmission.toLowerCase().includes("manual"));

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory &&
        matchesFuel &&
        matchesTransmission
      );
    });
  }, [cars, search, brand, category, fuel, transmission]);

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-950">Filtros</h2>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setBrand("Todas");
              setCategory("Todas");
              setFuel("Todos");
              setTransmission("Todos");
            }}
            className="text-xs font-semibold text-blue-600"
          >
            Limpar filtros
          </button>
        </div>

        <label className="text-xs font-semibold text-slate-600">
          Buscar
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar modelo..."
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          />
        </label>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-slate-600">Marca</p>

          <div className="space-y-2">
            {brands.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setBrand(item)}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  brand === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-slate-600">Categoria</p>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-slate-600">
            Combustível
          </p>

          <select
            value={fuel}
            onChange={(event) => setFuel(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          >
            {fuels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-slate-600">Câmbio</p>

          <select
            value={transmission}
            onChange={(event) => setTransmission(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          >
            {transmissions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Catálogo de carros
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Explore e encontre o veículo ideal para você.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            {filteredCars.length} veículos encontrados
          </p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-950">
              Nenhum veículo encontrado
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Tente ajustar os filtros para visualizar outras opções.
            </p>
          </div>
        )}

        {cars.length > 0 && (
          <p className="mt-8 text-sm text-slate-500">
            Preços a partir de{" "}
            {formatPrice(Math.min(...cars.map((car) => car.price)))}.
          </p>
        )}
      </div>
    </section>
  );
}
