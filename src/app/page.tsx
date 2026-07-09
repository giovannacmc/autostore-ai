import Link from "next/link";

const featuredCars = [
  {
    brand: "Toyota",
    model: "Corolla Cross",
    category: "SUV",
    price: "A partir de R$ 170.790",
    specs: ["Híbrido", "Automático", "Uso urbano"],
  },
  {
    brand: "BYD",
    model: "Dolphin",
    category: "Elétrico",
    price: "A partir de R$ 149.800",
    specs: ["Elétrico", "Automático", "Econômico"],
  },
  {
    brand: "Chevrolet",
    model: "Onix",
    category: "Hatch",
    price: "A partir de R$ 83.990",
    specs: ["Flex", "Automático", "Compacto"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
              A
            </div>

            <div>
              <p className="text-lg font-bold leading-none">AutoStore AI</p>
              <p className="text-xs text-slate-500">Carros com inteligência</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/catalogo" className="transition hover:text-blue-600">
              Catálogo
            </Link>

            <Link href="/comparar" className="transition hover:text-blue-600">
              Comparar
            </Link>

            <Link href="/assistente" className="transition hover:text-blue-600">
              Assistente IA
            </Link>

            <Link href="/leads" className="transition hover:text-blue-600">
              Leads
            </Link>
          </nav>

          <Link
            href="/catalogo"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Ver catálogo
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Inteligência para escolher melhor
          </div>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
            Encontre o carro ideal com IA.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Descubra, compare e escolha o veículo certo com dados reais do
            catálogo, filtros inteligentes e um assistente de IA pronto para
            tirar dúvidas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="rounded-full bg-blue-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explorar catálogo
            </Link>

            <Link
              href="/assistente"
              className="rounded-full border border-slate-300 bg-white px-7 py-4 text-center font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-600"
            >
              Falar com a IA
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-3xl font-bold text-slate-950">15</p>
              <p className="mt-1 text-sm text-slate-500">veículos</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-3xl font-bold text-slate-950">5</p>
              <p className="mt-1 text-sm text-slate-500">montadoras</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-3xl font-bold text-slate-950">IA</p>
              <p className="mt-1 text-sm text-slate-500">com RAG</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute -bottom-8 right-4 h-40 w-40 rounded-full bg-cyan-200 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Recomendação da IA</p>
                  <h2 className="mt-2 text-3xl font-bold">Corolla Cross</h2>
                </div>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  SUV híbrido
                </span>
              </div>

              <div className="mt-8 flex h-52 items-center justify-center rounded-3xl bg-white/10">
                <div className="text-center">
                  <div className="mx-auto h-24 w-64 rounded-full bg-white/20 blur-xl" />
                  <p className="-mt-12 text-sm text-blue-100">
                    Imagem do veículo
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-blue-100">Motor</p>
                  <p className="mt-1 font-semibold">Híbrido</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-blue-100">Câmbio</p>
                  <p className="mt-1 font-semibold">Auto</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-blue-100">Perfil</p>
                  <p className="mt-1 font-semibold">Família</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-950">
                Cliente pergunta:
              </p>

              <p className="mt-2 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                Qual SUV híbrido você recomenda para uso urbano?
              </p>

              <p className="mt-3 rounded-2xl bg-blue-600 p-4 text-sm text-white shadow-sm">
                Com base no catálogo, o Corolla Cross é uma boa opção por
                combinar categoria SUV, motorização híbrida e conforto para uso
                urbano.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Catálogo
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Veículos em destaque
            </h2>
          </div>

          <Link
            href="/catalogo"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCars.map((car) => (
            <article
              key={`${car.brand}-${car.model}`}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
                <div className="text-center">
                  <div className="mx-auto h-20 w-64 rounded-full bg-slate-300/50 blur-xl" />
                  <p className="-mt-10 text-sm font-medium text-slate-500">
                    Foto do carro
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-blue-600">
                    {car.brand}
                  </p>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {car.category}
                  </span>
                </div>

                <h3 className="mt-2 text-2xl font-bold">{car.model}</h3>

                <p className="mt-3 text-slate-600">{car.price}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {car.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <button className="mt-6 w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-600">
                  Ver detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
