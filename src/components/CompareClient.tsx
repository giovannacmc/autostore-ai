"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Car } from "../types/car";

type CompareClientProps = {
  cars: Car[];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CompareClient({ cars }: CompareClientProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    cars[0]?.id || "",
    cars[1]?.id || "",
    cars[2]?.id || "",
  ]);

  const selectedCars = useMemo(() => {
    return selectedIds
      .map((id) => cars.find((car) => car.id === id))
      .filter(Boolean) as Car[];
  }, [cars, selectedIds]);

  function updateSelectedCar(index: number, carId: string) {
    setSelectedIds((currentIds) => {
      const nextIds = [...currentIds];
      nextIds[index] = carId;
      return nextIds;
    });
  }

  const rows = [
    {
      label: "Preço",
      getValue: (car: Car) => formatPrice(car.price),
    },
    {
      label: "Categoria",
      getValue: (car: Car) => car.category,
    },
    {
      label: "Ano",
      getValue: (car: Car) => String(car.year),
    },
    {
      label: "Motor",
      getValue: (car: Car) => car.engine,
    },
    {
      label: "Potência",
      getValue: (car: Car) => car.power,
    },
    {
      label: "Câmbio",
      getValue: (car: Car) => car.transmission,
    },
    {
      label: "Consumo",
      getValue: (car: Car) => car.consumption,
    },
    {
      label: "Combustível",
      getValue: (car: Car) => car.fuel,
    },
    {
      label: "Cores",
      getValue: (car: Car) => car.colors.join(", "),
    },
    {
      label: "Itens principais",
      getValue: (car: Car) => car.items.slice(0, 3).join(", "),
    },
  ];

  if (cars.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">
            Nenhum veículo disponível
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Quando houver veículos cadastrados, eles aparecerão aqui para
            comparação.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">Comparação</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Compare veículos lado a lado
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Escolha até três modelos para analisar preço, motor, câmbio,
            consumo, combustível e itens principais.
          </p>
        </div>

        <Link
          href="/catalogo"
          className="w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Voltar ao catálogo
        </Link>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <label
            key={index}
            className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Veículo {index + 1}
            </span>

            <select
              value={selectedIds[index]}
              onChange={(event) => updateSelectedCar(index, event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400"
            >
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.model}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-3">
        {selectedCars.map((car) => (
          <article
            key={car.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
          >
            <CarVisual
              image={car.image}
              carName={`${car.brand} ${car.model}`}
            />

            <div className="p-5">
              <p className="text-sm font-semibold text-blue-600">{car.brand}</p>

              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                {car.model}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {car.category} • {car.year}
              </p>

              <p className="mt-5 text-2xl font-bold text-slate-950">
                {formatPrice(car.price)}
              </p>

              <div className="mt-5 grid gap-3 text-sm text-slate-600">
                <InfoLine label="Motor" value={car.engine} />
                <InfoLine label="Câmbio" value={car.transmission} />
                <InfoLine label="Consumo" value={car.consumption} />
              </div>

              <Link
                href={`/carros/${car.id}`}
                className="mt-5 block rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ver detalhes
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Comparativo completo
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            No celular, deslize a tabela para o lado para ver todos os veículos.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="w-[190px] px-6 py-4">Critério</th>

                {selectedCars.map((car) => (
                  <th key={car.id} className="px-6 py-4">
                    {car.brand} {car.model}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.label} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {row.label}
                  </td>

                  {selectedCars.map((car) => (
                    <td
                      key={`${row.label}-${car.id}`}
                      className="px-6 py-5 text-slate-600"
                    >
                      {row.getValue(car)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function CarVisual({ image, carName }: { image: string; carName: string }) {
  if (image) {
    return (
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-5">
        <div
          aria-label={carName}
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-5">
      <svg
        viewBox="0 0 720 300"
        className="h-auto w-full max-w-md drop-shadow-[0_20px_20px_rgba(15,23,42,0.10)]"
      >
        <ellipse cx="360" cy="250" rx="260" ry="24" fill="#dbeafe" />

        <path
          d="M115 205h490l-15-55c-9-34-34-60-68-67l-48-10-43-68C416 18 388 10 359 10H274c-32 0-62 15-81 41l-39 53-45 13c-32 9-57 34-66 66l-10 38h82Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="4"
        />

        <path
          d="M235 75h107V22h-58c-25 0-48 12-62 32l-13 21h26Z"
          fill="#dbeafe"
          stroke="#cbd5e1"
          strokeWidth="3"
        />

        <path
          d="M355 22v53h107l-30-43c-11-6-26-10-43-10h-34Z"
          fill="#dbeafe"
          stroke="#cbd5e1"
          strokeWidth="3"
        />

        <path d="M45 205h92l24-40H75c-17 0-29 11-34 27l-6 13Z" fill="#0f172a" />

        <path
          d="M500 165h82c19 0 34 14 38 32l3 8H482l8-28c2-7 5-12 10-12Z"
          fill="#0f172a"
        />

        <circle cx="160" cy="205" r="52" fill="#0f172a" />
        <circle cx="160" cy="205" r="32" fill="#334155" />
        <circle cx="160" cy="205" r="14" fill="#64748b" />

        <circle cx="500" cy="205" r="52" fill="#0f172a" />
        <circle cx="500" cy="205" r="32" fill="#334155" />
        <circle cx="500" cy="205" r="14" fill="#64748b" />

        <rect x="85" y="179" width="55" height="8" rx="4" fill="#e2e8f0" />
        <rect x="95" y="135" width="44" height="15" rx="7" fill="#bfdbfe" />
        <rect x="535" y="150" width="44" height="13" rx="7" fill="#fecdd3" />

        <path
          d="M285 130h102M395 142h42"
          stroke="#94a3b8"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
