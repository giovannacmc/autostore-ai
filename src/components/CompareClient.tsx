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

const comparisonRows = [
  {
    label: "Marca",
    getValue: (car: Car) => car.brand,
  },
  {
    label: "Modelo",
    getValue: (car: Car) => car.model,
  },
  {
    label: "Categoria",
    getValue: (car: Car) => car.category,
  },
  {
    label: "Ano",
    getValue: (car: Car) => car.year,
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
    label: "Combustível",
    getValue: (car: Car) => car.fuel,
  },
  {
    label: "Consumo",
    getValue: (car: Car) => car.consumption,
  },
  {
    label: "Preço",
    getValue: (car: Car) => formatPrice(car.price),
  },
];

export default function CompareClient({ cars }: CompareClientProps) {
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>(() => [
    cars[0]?.id ?? "",
    cars[1]?.id ?? "",
    cars[2]?.id ?? "",
  ]);

  const selectedCars = useMemo(() => {
    return selectedCarIds.map((carId) => {
      return cars.find((car) => car.id === carId) || null;
    });
  }, [cars, selectedCarIds]);

  const selectedCount = selectedCars.filter(Boolean).length;

  function handleSelectCar(index: number, carId: string) {
    setSelectedCarIds((currentIds) => {
      const isRepeated =
        carId !== "" &&
        currentIds.some((selectedId, selectedIndex) => {
          return selectedIndex !== index && selectedId === carId;
        });

      if (isRepeated) {
        return currentIds;
      }

      const updatedIds = [...currentIds];
      updatedIds[index] = carId;

      return updatedIds;
    });
  }

  function isCarAlreadySelected(carId: string, currentIndex: number) {
    return selectedCarIds.some((selectedId, index) => {
      return index !== currentIndex && selectedId === carId;
    });
  }

  function clearComparison() {
    setSelectedCarIds(["", "", ""]);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">Comparar</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Compare veículos lado a lado
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Selecione até três modelos diferentes para analisar preço,
            categoria, câmbio, consumo e principais características.
          </p>
        </div>

        <button
          type="button"
          onClick={clearComparison}
          className="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
        >
          Limpar comparação
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <label
            key={index}
            className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Veículo {index + 1}
            </span>

            <select
              value={selectedCarIds[index]}
              onChange={(event) => handleSelectCar(index, event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
            >
              <option value="">Selecione um veículo</option>

              {cars.map((car) => {
                const alreadySelected = isCarAlreadySelected(car.id, index);

                return (
                  <option
                    key={car.id}
                    value={car.id}
                    disabled={alreadySelected}
                  >
                    {car.brand} {car.model}
                    {alreadySelected ? " — já selecionado" : ""}
                  </option>
                );
              })}
            </select>

            <CompareVehicleCard car={selectedCars[index]} />
          </label>
        ))}
      </div>

      {selectedCount > 0 ? (
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <p className="text-lg font-semibold text-slate-950">
              Resultado da comparação
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Os modelos repetidos ficam bloqueados para evitar uma comparação
              duplicada.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Item
                  </th>

                  {[0, 1, 2].map((index) => (
                    <th
                      key={index}
                      className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      Veículo {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-950">
                      {row.label}
                    </td>

                    {selectedCars.map((car, index) => (
                      <td
                        key={`${row.label}-${index}`}
                        className="px-5 py-4 text-sm text-slate-600"
                      >
                        {car ? row.getValue(car) : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Nenhum veículo selecionado
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Escolha pelo menos um modelo para iniciar a comparação.
          </p>
        </div>
      )}
    </section>
  );
}

function CompareVehicleCard({ car }: { car: Car | null }) {
  if (!car) {
    return (
      <div className="mt-5 flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path
                d="M8 7h11M8 17h11M5 7h.01M5 17h.01M12 12h7M9 12h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-950">
            Selecione um veículo
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            O resumo do modelo aparecerá aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="flex h-52 items-center justify-center bg-white p-4">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-blue-600">{car.brand}</p>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {car.fuel}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-950">{car.model}</h2>

        <p className="mt-3 text-sm text-slate-500">
          {car.category} • {car.year}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>{car.engine}</p>
          <p>{car.transmission}</p>
          <p>{car.consumption}</p>
        </div>

        <p className="mt-5 text-2xl font-bold text-slate-950">
          {formatPrice(car.price)}
        </p>

        <Link
          href={`/carros/${car.id}`}
          className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
