import Link from "next/link";

export default function CompararPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Voltar para início
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Comparação
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Comparar veículos
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Aqui o usuário poderá comparar carros lado a lado para tomar uma
            decisão melhor.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-semibold text-slate-900">
            O comparador será um diferencial do projeto.
          </p>

          <p className="mt-2 text-slate-600">
            A prioridade do desafio é o fluxo catálogo, detalhe, chat e lead,
            mas essa tela melhora a experiência do cliente.
          </p>
        </div>
      </section>
    </main>
  );
}
