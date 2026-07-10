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
  const prices = cars.map((car) => car.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todos");
  const [category, setCategory] = useState("Todos");
  const [fuel, setFuel] = useState("Todos");
  const [transmission, setTransmission] = useState("Todos");
  const [priceLimit, setPriceLimit] = useState(maxPrice);

  const brands = useMemo(
    () => ["Todos", ...Array.from(new Set(cars.map((car) => car.brand)))],
    [cars],
  );

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(cars.map((car) => car.category)))],
    [cars],
  );

  const fuels = useMemo(
    () => ["Todos", ...Array.from(new Set(cars.map((car) => car.fuel)))],
    [cars],
  );

  const filteredCars = cars.filter((car) => {
    const searchText = `${car.brand} ${car.model} ${car.category} ${car.fuel}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const normalizedSearch = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const normalizedTransmission = car.transmission
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const matchesSearch = searchText.includes(normalizedSearch);
    const matchesBrand = brand === "Todos" || car.brand === brand;
    const matchesCategory = category === "Todos" || car.category === category;
    const matchesFuel = fuel === "Todos" || car.fuel === fuel;
    const matchesPrice = car.price <= priceLimit;

    const matchesTransmission =
      transmission === "Todos" ||
      (transmission === "Automático" &&
        normalizedTransmission.includes("automatic")) ||
      (transmission === "Manual" && normalizedTransmission.includes("manual"));

    return (
      matchesSearch &&
      matchesBrand &&
      matchesCategory &&
      matchesFuel &&
      matchesTransmission &&
      matchesPrice
    );
  });

  const cheapestCar =
    cars.length > 0
      ? cars.reduce((cheapest, currentCar) => {
          return currentCar.price < cheapest.price ? currentCar : cheapest;
        }, cars[0])
      : null;

  function clearFilters() {
    setSearch("");
    setBrand("Todos");
    setCategory("Todos");
    setFuel("Todos");
    setTransmission("Todos");
    setPriceLimit(maxPrice);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">Catálogo</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Escolha seu próximo veículo
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Filtre por marca, categoria, combustível, câmbio e preço para
            encontrar o modelo que combina com você.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Modelos
            </p>

            <p className="mt-1 text-2xl font-semibold text-slate-950">
              {cars.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              A partir de
            </p>

            <p className="mt-1 text-2xl font-semibold text-slate-950">
              {cheapestCar ? formatPrice(cheapestCar.price) : "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Filtros</h2>

              <p className="mt-1 text-sm text-slate-500">Refine sua busca.</p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Limpar
            </button>
          </div>

          <div className="space-y-4">
            <FilterInput
              label="Buscar"
              value={search}
              onChange={setSearch}
              placeholder="Modelo, marca ou categoria"
            />

            <FilterSelect
              label="Marca"
              value={brand}
              onChange={setBrand}
              options={brands}
            />

            <FilterSelect
              label="Categoria"
              value={category}
              onChange={setCategory}
              options={categories}
            />

            <FilterSelect
              label="Combustível"
              value={fuel}
              onChange={setFuel}
              options={fuels}
            />

            <FilterSelect
              label="Câmbio"
              value={transmission}
              onChange={setTransmission}
              options={["Todos", "Automático", "Manual"]}
            />

            <PriceRangeFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceLimit={priceLimit}
              onChange={setPriceLimit}
            />
          </div>
        </aside>

        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                {filteredCars.length} veículo(s) encontrado(s)
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Clique em um modelo para ver detalhes e enviar interesse.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
              Até {formatPrice(priceLimit)}
            </span>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path
                    d="M4 15l1.5-4.5A3 3 0 0 1 8.3 8h7.4a3 3 0 0 1 2.8 2.5L20 15M4 15h16v4H4v-4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M7 19v2M17 19v2M7.5 15h.01M16.5 15h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                Nenhum veículo encontrado
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tente alterar os filtros, aumentar o preço máximo ou limpar a
                busca para ver mais opções.
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
      />
    </label>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PriceRangeFilter({
  minPrice,
  maxPrice,
  priceLimit,
  onChange,
}: {
  minPrice: number;
  maxPrice: number;
  priceLimit: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-600">Preço máximo</p>

          <p className="mt-1 text-lg font-semibold text-slate-950">
            {formatPrice(priceLimit)}
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Arraste
        </span>
      </div>

      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={5000}
        value={priceLimit}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-blue-600"
      />

      <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{formatPrice(minPrice)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}
