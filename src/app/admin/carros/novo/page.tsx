import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../../../../components/Header";
import AdminCarForm from "../../../../components/AdminCarForm";
import { isAdminAuthenticated } from "../../../../lib/adminAuth";

export default async function NewCarPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login?next=/admin/carros/novo");
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <Link
            href="/admin/carros"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Voltar para o catálogo
          </Link>

          <p className="mt-6 text-sm font-semibold text-blue-600">
            Administração
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Cadastrar novo veículo
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Preencha os dados do carro para adicioná-lo ao catálogo público da
            AutoStore.
          </p>
        </div>

        <AdminCarForm mode="create" />
      </section>
    </main>
  );
}
