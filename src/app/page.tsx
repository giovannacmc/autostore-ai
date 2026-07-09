import Link from "next/link";
import Header from "../components/Header";

const benefits = [
  {
    title: "Catálogo completo",
    description:
      "Explore os modelos disponíveis com filtros por marca, categoria e faixa de preço.",
  },
  {
    title: "Comparação simples",
    description:
      "Compare opções lado a lado para entender qual carro combina melhor com você.",
  },
  {
    title: "Assistente inteligente",
    description:
      "Tire dúvidas sobre os veículos usando o assistente com base técnica do catálogo.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Header />

      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            AutoStore AI
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Encontre o carro ideal com uma experiência simples e inteligente.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Navegue pelo catálogo, compare modelos, tire dúvidas com o
            assistente e registre interesse em poucos passos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalogo"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ver catálogo
            </Link>

            <Link
              href="/assistente"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Falar com assistente
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {benefit.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
