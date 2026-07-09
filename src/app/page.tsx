import Link from "next/link";
import Header from "../components/Header";

const highlights = [
  {
    title: "Catálogo selecionado",
    description:
      "Veja modelos disponíveis com informações claras para decidir melhor.",
  },
  {
    title: "Compare modelos",
    description:
      "Analise opções lado a lado e encontre o carro que combina com sua rotina.",
  },
  {
    title: "Atendimento rápido",
    description:
      "Envie seu interesse e receba retorno sobre o veículo escolhido.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Header />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
        <div>
          <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            AutoStore
          </span>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Encontre o carro ideal para o seu momento.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore veículos, compare modelos e registre seu interesse de forma
            simples, rápida e segura.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalogo"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ver catálogo
            </Link>

            <Link
              href="/comparar"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Comparar modelos
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -right-6 bottom-8 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-slate-100 p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Destaque do catálogo
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                    Modelos para todos os estilos
                  </h2>
                </div>

                <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                  15 veículos
                </div>
              </div>

              <div className="relative mx-auto h-56 max-w-md">
                <div className="absolute bottom-10 left-1/2 h-24 w-[85%] -translate-x-1/2 rounded-[999px_999px_32px_32px] bg-blue-600 shadow-2xl" />

                <div className="absolute bottom-[96px] left-1/2 h-24 w-[52%] -translate-x-1/2 rounded-t-[5rem] bg-blue-500" />

                <div className="absolute bottom-[112px] left-1/2 flex h-16 w-[42%] -translate-x-1/2 overflow-hidden rounded-t-[4rem]">
                  <div className="h-full flex-1 border-r border-blue-300 bg-white/70" />
                  <div className="h-full flex-1 bg-white/60" />
                </div>

                <div className="absolute bottom-6 left-[18%] h-20 w-20 rounded-full border-[12px] border-slate-900 bg-slate-700 shadow-md" />
                <div className="absolute bottom-6 right-[18%] h-20 w-20 rounded-full border-[12px] border-slate-900 bg-slate-700 shadow-md" />

                <div className="absolute bottom-[76px] left-[12%] h-4 w-10 rounded-full bg-yellow-200" />
                <div className="absolute bottom-[76px] right-[12%] h-4 w-10 rounded-full bg-red-200" />

                <div className="absolute bottom-0 left-1/2 h-3 w-[92%] -translate-x-1/2 rounded-full bg-slate-300/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-3 lg:px-8">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {item.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
