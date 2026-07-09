import Link from "next/link";

export default function AssistentePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Voltar para início
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Assistente IA
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Chat de IA com RAG
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Aqui ficará o assistente que responde perguntas sobre os carros com
            base nos dados oficiais do desafio.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-blue-600">
                AutoStore AI
              </p>

              <p className="mt-3 rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
                Olá! Sou o assistente da AutoStore. Em breve vou responder com
                base no catálogo oficial usando RAG.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <input
                disabled
                placeholder="Digite sua pergunta..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500 outline-none"
              />

              <button
                disabled
                className="rounded-full bg-blue-600 px-6 py-4 font-semibold text-white opacity-70"
              >
                Enviar
              </button>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Perguntas de teste</h2>

            <div className="mt-5 space-y-3">
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                Quais cores e qual o consumo do Corolla Cross?
              </p>

              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                Compare o Onix e o HB20 para uso urbano.
              </p>

              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                Qual carro tem o menor preço inicial?
              </p>

              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                Vocês vendem motos?
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
