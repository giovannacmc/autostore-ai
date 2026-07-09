import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import LeadForm from "../../../components/LeadForm";
import { prisma } from "../../../lib/prisma";
import VehicleGallery from "../../../components/VehicleGallery";

export const dynamic = "force-dynamic";

type CarDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
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

  const carName = `${car.brand} ${car.model}`;

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/catalogo" className="transition hover:text-blue-600">
            Catálogo
          </Link>

          <span>/</span>

          <span>{car.brand}</span>

          <span>/</span>

          <span className="font-medium text-slate-800">{car.model}</span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <section className="h-fit space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <VehicleGallery
                carId={car.id}
                carName={carName}
                fallbackImage={car.image}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SpecCard
                title="Categoria"
                value={car.category}
                icon="category"
              />
              <SpecCard title="Ano" value={String(car.year)} icon="year" />
              <SpecCard title="Câmbio" value={car.transmission} icon="gear" />
              <SpecCard title="Combustível" value={car.fuel} icon="fuel" />
            </div>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold text-slate-950">
                Sobre o veículo
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {car.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoItem label="Motor" value={car.engine} />
                <InfoItem label="Potência" value={car.power} />
                <InfoItem label="Consumo" value={car.consumption} />
                <InfoItem label="Preço" value={formatPrice(car.price)} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Cores disponíveis
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {car.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Itens principais
                </h2>

                <ul className="mt-4 space-y-3">
                  {car.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-5 text-slate-600"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </section>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-blue-600">{car.brand}</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {car.model}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {car.description}
            </p>

            <div className="mt-8 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">A partir de</p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatPrice(car.price)}
              </p>
            </div>

            <LeadForm carId={car.id} carName={carName} />

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Preços sujeitos a variação. Consulte condições e disponibilidade.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SpecCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: "category" | "year" | "gear" | "fuel";
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <SpecIcon type={icon} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function SpecIcon({ type }: { type: "category" | "year" | "gear" | "fuel" }) {
  if (type === "year") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7.2 7.2 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7.2 7.2 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.2 7.2 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7.2 7.2 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "fuel") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M7 3h7v18H7V3ZM14 7h2.5L20 10.5V18a2 2 0 0 1-2 2h-1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M9 7h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
  );
}
