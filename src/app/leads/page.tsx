import Link from "next/link";

export default function LeadsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Voltar para início
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Leads
            </p>

            <h1 className="mt-3 text-5xl font-bold tracking-tight">
              Leads recebidos
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Aqui o avaliador poderá consultar os interessados que enviaram o
              formulário de contato.
            </p>
          </div>

          <button className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm">
            Exportar leads
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="font-semibold text-slate-900">
              Nenhum lead cadastrado ainda
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Quando o formulário estiver conectado ao banco, os leads
              aparecerão nesta tabela.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500">
            <span>Nome</span>
            <span>Contato</span>
            <span>Veículo</span>
            <span>Mensagem</span>
            <span>Data</span>
          </div>

          <div className="px-6 py-10 text-center text-slate-500">
            Aguardando envio de leads.
          </div>
        </div>
      </section>
    </main>
  );
}
