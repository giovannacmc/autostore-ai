import Link from "next/link";
import type { Car } from "@/data/cars";

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
    <article className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute bottom-8 h-12 w-64 rounded-full bg-slate-300/40 blur-2xl" />

        <div className="relative h-24 w-72">
          <div className="absolute bottom-4 h-14 w-64 rounded-[3rem] bg-slate-900 transition group-hover:bg-blue-950" />
          <div className="absolute bottom-12 left-12 h-14 w-36 rounded-t-[4rem] bg-slate-800" />
          <div className="absolute bottom-14 left-20 h-8 w-16 rounded-t-[2rem] bg-slate-200" />
          <div className="absolute bottom-14 left-40 h-8 w-14 rounded-t-[2rem] bg-slate-200" />
          <div className="absolute bottom-0 left-10 h-14 w-14 rounded-full border-[9px] border-slate-900 bg-slate-300" />
          <div className="absolute bottom-0 right-12 h-14 w-14 rounded-full border-[9px] border-slate-900 bg-slate-300" />
        </div>

        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
          {car.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">{car.brand}</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              {car.model}
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {car.fuel}
          </span>
        </div>

        <p className="mt-3 text-lg font-bold text-slate-950">
          {formatPrice(car.price)}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Motor</p>
            <p className="mt-1 font-semibold text-slate-800">{car.engine}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Potência</p>
            <p className="mt-1 font-semibold text-slate-800">{car.power}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Câmbio</p>
            <p className="mt-1 font-semibold text-slate-800">
              {car.transmission}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Consumo</p>
            <p className="mt-1 font-semibold text-slate-800">
              {car.consumption}
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/carros/${car.id}`}
            className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Ver detalhes
          </Link>

          <Link
            href="/comparar"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            Comparar
          </Link>
        </div>
      </div>
    </article>
  );
}
