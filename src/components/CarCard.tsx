import Link from "next/link";
import type { Car } from "../types/car";

type CarCardProps = {
  car: Car;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CarCard({ car }: CarCardProps) {
  const carName = `${car.brand} ${car.model}`;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-5">
        {car.image ? (
          <div
            aria-label={carName}
            className="h-full w-full bg-contain bg-center bg-no-repeat transition duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url(${car.image})`,
            }}
          />
        ) : (
          <CarPlaceholder />
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-blue-600">{car.brand}</p>

            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              {car.model}
            </h2>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {car.fuel}
          </span>
        </div>

        <p className="text-sm text-slate-500">
          {car.category} • {car.year}
        </p>

        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          <p>{car.engine}</p>
          <p>{car.transmission}</p>
        </div>

        <p className="mt-5 text-2xl font-bold text-slate-950">
          {formatPrice(car.price)}
        </p>

        <Link
          href={`/carros/${car.id}`}
          className="mt-5 block rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}

function CarPlaceholder() {
  return (
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
    </svg>
  );
}
