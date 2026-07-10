import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../../components/Header";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import { isAdminAuthenticated } from "../../lib/adminAuth";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login?next=/leads");
  }

  const leads = await prisma.lead.findMany({
    include: {
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalLeads = leads.length;
  const leadsWithCar = leads.filter((lead) => lead.car).length;
  const leadsWithoutCar = leads.filter((lead) => !lead.car).length;
  const lastLead = leads[0];

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Painel de contatos
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Clientes interessados
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Acompanhe os contatos enviados pelos clientes e veja quais
              veículos despertaram interesse.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/carros"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Gerenciar catálogo
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              {totalLeads} contato(s) recebido(s)
            </div>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total de contatos"
            value={String(totalLeads)}
            description="Registros recebidos pelo formulário"
            icon="total"
          />

          <SummaryCard
            title="Com veículo escolhido"
            value={String(leadsWithCar)}
            description="Clientes que vieram da página de detalhe"
            icon="car"
          />

          <SummaryCard
            title="Sem veículo definido"
            value={String(leadsWithoutCar)}
            description="Contatos gerais ou testes cadastrados"
            icon="question"
          />

          <SummaryCard
            title="Último contato"
            value={lastLead ? formatDate(lastLead.createdAt) : "Nenhum"}
            description={lastLead ? lastLead.name : "Ainda não há contatos"}
            icon="time"
          />
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Lista de contatos
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Visualize nome, e-mail, WhatsApp, veículo de interesse e
                mensagem enviada.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
              Atualizado automaticamente
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">E-mail</th>
                  <th className="px-6 py-4">WhatsApp</th>
                  <th className="px-6 py-4">Veículo</th>
                  <th className="px-6 py-4">Mensagem</th>
                  <th className="px-6 py-4">Recebido em</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-950">
                            {lead.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Novo interesse
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {lead.email || "Não informado"}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {lead.phone || "Não informado"}
                    </td>

                    <td className="px-6 py-5">
                      {lead.car ? (
                        <div>
                          <p className="font-medium text-slate-900">
                            {lead.car.brand} {lead.car.model}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {lead.car.category} • {lead.car.year}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500">Não informado</span>
                      )}
                    </td>

                    <td className="max-w-xs px-6 py-5 text-slate-600">
                      <p className="line-clamp-2">
                        {lead.message || "Sem mensagem"}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {formatDate(lead.createdAt)}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Novo
                      </span>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto max-w-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                          >
                            <path
                              d="M7 8h10M7 12h7M5 20l2.5-2H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-950">
                          Nenhum contato recebido
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Quando um cliente enviar interesse por um veículo, ele
                          aparecerá nesta lista.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: "total" | "car" | "question" | "time";
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <SummaryIcon type={icon} />
      </div>

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>

      <p className="mt-2 text-sm leading-5 text-slate-500">{description}</p>
    </article>
  );
}

function SummaryIcon({
  type,
}: {
  type: "total" | "car" | "question" | "time";
}) {
  if (type === "car") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7h5.4a3 3 0 0 1 2.8 2.5L19 14M5 14h14v4H5v-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M7 18v2M17 18v2M8 14h.01M16 14h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "question") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-.9.8-1.9 1.3-1.9 2.9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M12 17h.01"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "time") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />

        <path
          d="M12 8v4l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M8 7h10M8 12h7M8 17h12M4 7h.01M4 12h.01M4 17h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
