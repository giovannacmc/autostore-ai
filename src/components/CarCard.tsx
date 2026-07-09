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
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-44 bg-gradient-to-br from-slate-50 to-blue-50">
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm"
          aria-label="Salvar veículo"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-24 w-56">
            <div className="absolute bottom-7 left-1/2 h-14 w-[88%] -translate-x-1/2 rounded-[999px_999px_26px_26px] bg-slate-900" />
            <div className="absolute bottom-[70px] left-1/2 h-14 w-[48%] -translate-x-1/2 rounded-t-[70px] bg-slate-700" />
            <div className="absolute bottom-[78px] left-1/2 flex h-9 w-[38%] -translate-x-1/2 overflow-hidden rounded-t-[60px]">
              <div className="flex-1 border-r border-white/40 bg-white/60" />
              <div className="flex-1 bg-white/45" />
            </div>
            <div className="absolute bottom-2 left-8 h-14 w-14 rounded-full border-[10px] border-slate-950 bg-slate-600" />
            <div className="absolute bottom-2 right-8 h-14 w-14 rounded-full border-[10px] border-slate-950 bg-slate-600" />
            <div className="absolute bottom-[56px] left-3 h-3 w-8 rounded-full bg-yellow-200" />
            <div className="absolute bottom-[56px] right-3 h-3 w-8 rounded-full bg-red-200" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-slate-500">{car.brand}</p>

        <h2 className="mt-1 text-lg font-semibold text-slate-950">
          {car.model}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {car.engine} • {car.year}
        </p>

        <p className="mt-4 text-xl font-semibold text-slate-950">
          {formatPrice(car.price)}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {car.fuel}
          </span>

          <Link
            href={`/carros/${car.id}`}
            className="rounded-lg border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
