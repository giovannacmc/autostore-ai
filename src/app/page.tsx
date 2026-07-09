import Link from "next/link";
import Header from "../components/Header";

const benefits = [
  {
    title: "Catálogo completo",
    description: "15 modelos oficiais do desafio organizados por categoria.",
    icon: "▣",
  },
  {
    title: "IA que entende você",
    description: "Respostas baseadas nos dados reais do catálogo.",
    icon: "✦",
  },
  {
    title: "Compare com facilidade",
    description: "Compare modelos lado a lado e tome a melhor decisão.",
    icon: "◇",
  },
  {
    title: "Decisão com confiança",
    description: "Informações detalhadas para comprar com segurança.",
    icon: "✓",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Header />

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Inteligência para escolher melhor
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
            Encontre o carro{" "}
            <span className="text-blue-600">ideal com IA.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Descubra, compare e escolha o veículo certo com dados reais do
            catálogo, filtros inteligentes e um assistente de IA pronto para
            tirar dúvidas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="rounded-2xl bg-blue-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Ver catálogo
            </Link>

            <Link
              href="/assistente"
              className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center font-semibold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
            >
              Como funciona
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute bottom-4 right-6 h-52 w-52 rounded-full bg-sky-100 blur-3xl" />

          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-blue-50 p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Recomendação da IA
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    Corolla Cross
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    SUV médio • 2025
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
                  Híbrido
                </span>
              </div>

              <div className="relative flex h-72 items-center justify-center rounded-[1.5rem] bg-white">
                <div className="absolute bottom-12 h-16 w-96 rounded-full bg-slate-300/50 blur-2xl" />

                <div className="relative flex h-36 w-[30rem] items-end justify-center">
                  <div className="absolute bottom-4 h-20 w-[28rem] rounded-[3rem] bg-slate-900" />
                  <div className="absolute bottom-16 left-20 h-20 w-56 rounded-t-[5rem] bg-slate-800" />
                  <div className="absolute bottom-20 left-32 h-12 w-28 rounded-t-[3rem] bg-slate-200" />
                  <div className="absolute bottom-20 left-64 h-12 w-24 rounded-t-[3rem] bg-slate-200" />
                  <div className="absolute bottom-0 left-20 h-20 w-20 rounded-full border-[12px] border-slate-900 bg-slate-300" />
                  <div className="absolute bottom-0 right-20 h-20 w-20 rounded-full border-[12px] border-slate-900 bg-slate-300" />
                  <div className="absolute bottom-16 right-10 h-6 w-12 rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Motor</p>
                  <p className="mt-1 font-bold text-slate-950">
                    1.8 Hybrid Flex
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Potência</p>
                  <p className="mt-1 font-bold text-slate-950">122 cv</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Câmbio</p>
                  <p className="mt-1 font-bold text-slate-950">
                    Automático CVT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                {benefit.icon}
              </div>

              <h3 className="mt-5 font-bold text-slate-950">{benefit.title}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
