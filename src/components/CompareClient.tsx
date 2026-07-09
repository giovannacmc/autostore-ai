"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
    cars[0]?.id ?? "",
    cars[1]?.id ?? cars[0]?.id ?? "",
    cars[2]?.id ?? cars[1]?.id ?? cars[0]?.id ?? "",
  ]);

  const selectedCars = useMemo(() => {
    return selectedIds
      .map((id) => cars.find((car) => car.id === id))
      .filter(Boolean) as Car[];
  }, [cars, selectedIds]);

  function updateSelectedCar(index: number, carId: string) {
    setSelectedIds((currentIds) =>
      currentIds.map((currentId, currentIndex) =>
        currentIndex === index ? carId : currentId,
      ),
    );
  }

  if (cars.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">
            Nenhum veículo disponível
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Cadastre veículos no catálogo para usar a comparação.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">Comparação</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Compare veículos lado a lado
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Escolha até três modelos e veja as principais diferenças antes de
            decidir qual combina melhor com você.
          </p>
        </div>

        <Link
          href="/catalogo"
          className="w-fit rounded-xl border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
        >
          Voltar ao catálogo
        </Link>
      </div>

      <div className="mb-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <label key={index} className="text-xs font-semibold text-slate-600">
            Veículo {index + 1}
            <select
              value={selectedIds[index]}
              onChange={(event) => updateSelectedCar(index, event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-400"
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

      <div className="grid gap-6 lg:grid-cols-3">
        {selectedCars.map((car, index) => (
          <CompareCard key={`${car.id}-${index}`} car={car} index={index} />
        ))}
      </div>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Comparativo completo
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Veja as informações principais dos modelos selecionados.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="w-48 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Característica
                </th>

                {selectedCars.map((car, index) => (
                  <th
                    key={`${car.id}-head-${index}`}
                    className="px-6 py-4 text-sm font-semibold text-slate-950"
                  >
                    {car.brand} {car.model}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <CompareRow
                label="Preço"
                values={selectedCars.map((car) => formatPrice(car.price))}
              />

              <CompareRow
                label="Categoria"
                values={selectedCars.map((car) => car.category)}
              />

              <CompareRow
                label="Ano"
                values={selectedCars.map((car) => String(car.year))}
              />

              <CompareRow
                label="Motor"
                values={selectedCars.map((car) => car.engine)}
              />

              <CompareRow
                label="Potência"
                values={selectedCars.map((car) => car.power)}
              />

              <CompareRow
                label="Câmbio"
                values={selectedCars.map((car) => car.transmission)}
              />

              <CompareRow
                label="Consumo"
                values={selectedCars.map((car) => car.consumption)}
              />

              <CompareRow
                label="Combustível"
                values={selectedCars.map((car) => car.fuel)}
              />

              <CompareRow
                label="Cores"
                values={selectedCars.map((car) => car.colors.join(", "))}
              />

              <CompareRow
                label="Itens principais"
                values={selectedCars.map((car) =>
                  car.items.slice(0, 3).join(", "),
                )}
              />
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function CompareCard({ car, index }: { car: Car; index: number }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6">
        <div className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          Opção {index + 1}
        </div>

        <VehicleImage image={car.image} alt={`${car.brand} ${car.model}`} />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">{car.brand}</p>

            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {car.model}
            </h2>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {car.fuel}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {car.engine} • {car.year}
        </p>

        <p className="mt-5 text-2xl font-semibold text-slate-950">
          {formatPrice(car.price)}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoPill label="Câmbio" value={car.transmission} />
          <InfoPill label="Consumo" value={car.consumption} />
        </div>

        <Link
          href={`/carros/${car.id}`}
          className="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function CompareRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <th className="bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </th>

      {values.map((value, index) => (
        <td
          key={`${label}-${index}`}
          className="px-6 py-4 font-medium text-slate-800"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

function VehicleImage({ image, alt }: { image: string; alt: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className="relative z-10 max-h-44 w-full max-w-sm object-contain drop-shadow-xl"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 900 520"
      className="relative z-10 w-full max-w-sm drop-shadow-xl"
      fill="none"
    >
      <defs>
        <linearGradient id="compareCarBody" x1="190" y1="170" x2="760" y2="390">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#eef3f8" />
          <stop offset="1" stopColor="#d7e0ea" />
        </linearGradient>

        <linearGradient
          id="compareWindowGradient"
          x1="330"
          y1="135"
          x2="610"
          y2="255"
        >
          <stop stopColor="#dce8f5" />
          <stop offset="1" stopColor="#8fa7bd" />
        </linearGradient>
      </defs>

      <ellipse
        cx="475"
        cy="428"
        rx="320"
        ry="28"
        fill="#cbd5e1"
        fillOpacity="0.55"
      />

      <path
        d="M171 330C181 285 221 256 267 246L328 176C348 153 377 140 408 140H548C590 140 627 160 650 194L694 259C748 268 787 303 801 353L811 393H159L171 330Z"
        fill="url(#compareCarBody)"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      <path
        d="M330 249L383 177C393 164 409 156 426 156H536C572 156 602 174 621 204L650 249H330Z"
        fill="url(#compareWindowGradient)"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      <path d="M456 158V249" stroke="#ffffff" strokeWidth="5" opacity="0.8" />
      <path
        d="M599 184L570 249"
        stroke="#ffffff"
        strokeWidth="5"
        opacity="0.75"
      />

      <path
        d="M198 325H302C330 325 354 347 358 375H163L198 325Z"
        fill="#111827"
      />

      <path
        d="M622 325H767L794 375H595C599 348 622 325 622 325Z"
        fill="#111827"
      />

      <rect x="223" y="292" width="58" height="20" rx="10" fill="#dbeafe" />
      <rect x="710" y="314" width="54" height="18" rx="9" fill="#fee2e2" />

      <circle cx="306" cy="384" r="66" fill="#111827" />
      <circle cx="306" cy="384" r="42" fill="#334155" />
      <circle cx="306" cy="384" r="18" fill="#64748b" />

      <circle cx="666" cy="384" r="66" fill="#111827" />
      <circle cx="666" cy="384" r="42" fill="#334155" />
      <circle cx="666" cy="384" r="18" fill="#64748b" />
    </svg>
  );
}
