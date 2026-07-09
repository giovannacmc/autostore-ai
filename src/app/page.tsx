import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-14 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
              Inteligência para escolher melhor
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[68px] lg:leading-[1.04]">
              Encontre o carro{" "}
              <span className="text-blue-600">ideal com IA.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore modelos, compare opções e envie seu interesse em uma
              experiência simples, moderna e segura.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
              >
                Ver catálogo
              </Link>

              <Link
                href="/assistente"
                className="rounded-xl border border-blue-200 bg-white px-7 py-3.5 text-center text-sm font-semibold text-blue-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg"
              >
                Usar assistente
              </Link>
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              <MiniStat value="15" label="modelos no catálogo" />
              <MiniStat value="5" label="marcas disponíveis" />
              <MiniStat value="3" label="comparação lado a lado" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Catálogo completo"
            description="Consulte veículos organizados por marca, categoria, preço e combustível."
          />

          <FeatureCard
            title="Assistente inteligente"
            description="Tire dúvidas sobre os modelos e receba respostas com base no catálogo."
          />

          <FeatureCard
            title="Compare com facilidade"
            description="Analise até três veículos lado a lado antes de escolher."
          />

          <FeatureCard
            title="Contato protegido"
            description="Os interesses enviados ficam salvos em uma área administrativa."
          />
        </div>
      </section>
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <p className="text-3xl font-bold text-slate-950">{value}</p>

      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M8 7h10M8 12h7M8 17h10M4 7h.01M4 12h.01M4 17h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
