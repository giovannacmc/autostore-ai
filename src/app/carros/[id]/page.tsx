import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import LeadForm from "../../../components/LeadForm";
import { prisma } from "../../../lib/prisma";

type CarDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const colorMap: Record<string, string> = {
  Branco: "bg-white",
  Prata: "bg-slate-300",
  Preto: "bg-slate-950",
  Cinza: "bg-slate-500",
  Azul: "bg-blue-700",
  Vermelho: "bg-red-600",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      brand: true,
      model: true,
      category: true,
      year: true,
      engine: true,
      power: true,
      transmission: true,
      consumption: true,
      price: true,
      fuel: true,
      colors: true,
      items: true,
      description: true,
      image: true,
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/catalogo" className="transition hover:text-blue-600">
            Catálogo
          </Link>
          <span>›</span>
          <span>{car.brand}</span>
          <span>›</span>
          <span className="font-medium text-slate-900">{car.model}</span>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-white via-slate-50 to-blue-50">
              <div className="absolute left-8 top-8 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                1 / 1
              </div>

              <button
                type="button"
                className="absolute left-8 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-blue-600 lg:flex"
                aria-label="Imagem anterior"
              >
                ‹
              </button>

              <button
                type="button"
                className="absolute right-8 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-blue-600 lg:flex"
                aria-label="Próxima imagem"
              >
                ›
              </button>

              <VehicleImage
                image={car.image}
                alt={`${car.brand} ${car.model}`}
              />
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{car.brand}</p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {car.model}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  {car.engine} • {car.year}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {car.fuel}
              </span>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              {car.description}
            </p>

            <div className="mt-8">
              <p className="text-sm text-slate-500">A partir de</p>
              <p className="mt-1 text-3xl font-semibold text-slate-950">
                {formatPrice(car.price)}
              </p>
            </div>

            <LeadForm carId={car.id} carName={`${car.brand} ${car.model}`} />

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Preços sujeitos a variação. Consulte condições e disponibilidade.
            </p>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Especificações principais
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Spec icon="engine" label="Motor" value={car.engine} />
                <Spec icon="power" label="Potência" value={car.power} />
                <Spec icon="gear" label="Câmbio" value={car.transmission} />
                <Spec icon="fuel" label="Consumo" value={car.consumption} />
                <Spec icon="category" label="Categoria" value={car.category} />
                <Spec icon="year" label="Ano" value={String(car.year)} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Cores disponíveis
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {car.colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border border-slate-300 ${
                        colorMap[color] || "bg-slate-200"
                      }`}
                    />
                    {color}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Itens de série
            </h2>

            <ul className="mt-5 space-y-4">
              {car.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                    >
                      <path
                        d="m6 12 4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/catalogo"
              className="mt-8 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Ver outros veículos
            </Link>
          </section>
        </section>
      </section>
    </main>
  );
}

function VehicleImage({ image, alt }: { image: string; alt: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className="relative z-10 max-h-[340px] w-full max-w-[720px] object-contain drop-shadow-2xl"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 900 520"
      className="relative z-10 w-full max-w-[720px] drop-shadow-2xl"
      fill="none"
    >
      <defs>
        <linearGradient id="detailCarBody" x1="190" y1="170" x2="760" y2="390">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#eef3f8" />
          <stop offset="1" stopColor="#d7e0ea" />
        </linearGradient>

        <linearGradient
          id="detailWindowGradient"
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
        fill="url(#detailCarBody)"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      <path
        d="M330 249L383 177C393 164 409 156 426 156H536C572 156 602 174 621 204L650 249H330Z"
        fill="url(#detailWindowGradient)"
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

      <path
        d="M370 287H510"
        stroke="#cbd5e1"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <rect x="223" y="292" width="58" height="20" rx="10" fill="#dbeafe" />
      <rect x="710" y="314" width="54" height="18" rx="9" fill="#fee2e2" />

      <circle cx="306" cy="384" r="66" fill="#111827" />
      <circle cx="306" cy="384" r="42" fill="#334155" />
      <circle cx="306" cy="384" r="18" fill="#64748b" />

      <circle cx="666" cy="384" r="66" fill="#111827" />
      <circle cx="666" cy="384" r="42" fill="#334155" />
      <circle cx="666" cy="384" r="18" fill="#64748b" />

      <path
        d="M182 355H239"
        stroke="#e2e8f0"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path
        d="M508 301H558"
        stroke="#94a3b8"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M244 261C275 245 312 237 351 235"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <SpecIcon type={icon} />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

function SpecIcon({ type }: { type: string }) {
  if (type === "engine") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M7 9h8l3 3v5H7V9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4 13h3M18 14h2M10 6h4M12 6v3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "power") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="m13 3-8 11h6l-1 7 8-11h-6l1-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M7 7h10M12 7v10M7 17h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "fuel") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M8 21h7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16h2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M15 8h2l2 2v8a2 2 0 0 0 2 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "category") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M4 8h16M4 16h16M8 4v16M16 4v16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M7 3v3M17 3v3M5 9h14M6 5h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
