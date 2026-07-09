import Link from "next/link";

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Voltar para início
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Catálogo
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Catálogo de carros
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Aqui vamos exibir os 15 veículos oficiais do desafio com filtros por
            montadora, categoria, combustível, câmbio e preço.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-semibold text-slate-900">
            Próxima etapa: montar os cards reais dos carros.
          </p>

          <p className="mt-2 text-slate-600">
            Primeiro criamos a rota. Depois vamos conectar os dados oficiais do
            pacote do desafio.
          </p>
        </div>
      </section>
    </main>
  );
}
