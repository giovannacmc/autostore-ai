import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10 lg:py-14">
          <div className="absolute right-0 top-0 hidden h-full w-[62%] bg-gradient-to-br from-slate-50 via-blue-50 to-white lg:block" />

          <div className="absolute right-[-120px] top-[-80px] hidden h-[520px] w-[720px] rotate-[-18deg] rounded-[4rem] bg-slate-100/80 lg:block" />

          <div className="absolute right-[-80px] top-[80px] hidden h-[360px] w-[620px] rotate-[-18deg] rounded-[4rem] bg-blue-50/80 lg:block" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[470px_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                Inteligência para escolher melhor
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
                Encontre o carro{" "}
                <span className="text-blue-600">ideal com IA.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                Descubra, compare e escolha o carro perfeito para você com uma
                experiência simples e informações claras do nosso catálogo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/catalogo"
                  className="rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                >
                  Ver catálogo
                </Link>

                <Link
                  href="/assistente"
                  className="rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-blue-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg"
                >
                  Como funciona
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[390px]">
              <div className="absolute bottom-12 h-14 w-[78%] rounded-full bg-slate-300/30 blur-xl" />

              <HeroVehicle />
            </div>
          </div>

          <div className="relative z-10 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="catalog"
              title="Catálogo completo"
              description="Modelos organizados para consultar informações importantes de forma rápida."
            />

            <FeatureCard
              icon="assistant"
              title="Assistente inteligente"
              description="Tire dúvidas sobre os veículos e encontre opções de acordo com seu perfil."
            />

            <FeatureCard
              icon="compare"
              title="Compare com facilidade"
              description="Veja modelos lado a lado e analise preço, motor, câmbio e consumo."
            />

            <FeatureCard
              icon="security"
              title="Decisão com confiança"
              description="Informações claras para escolher o veículo ideal com mais segurança."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: "catalog" | "assistant" | "compare" | "security";
  title: string;
  description: string;
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <FeatureIcon type={icon} />
      </div>

      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function FeatureIcon({
  type,
}: {
  type: "catalog" | "assistant" | "compare" | "security";
}) {
  if (type === "assistant") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M7 10h10M7 14h6M5 20l2.5-2H18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "compare") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M8 7h11M8 17h11M5 7h.01M5 17h.01M12 12h7M9 12h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "security") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M9 12l2 2 4-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2-3-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeroVehicle() {
  return (
    <svg
      viewBox="0 0 760 360"
      className="relative z-10 h-auto w-full max-w-[760px] drop-shadow-[0_35px_35px_rgba(15,23,42,0.16)]"
    >
      <ellipse cx="390" cy="294" rx="285" ry="28" fill="#dbeafe" />

      <path
        d="M108 250h542l-18-66c-10-39-39-69-78-77l-54-12-49-77C433 8 401 0 367 0H269c-37 0-70 17-92 47l-45 61-52 15c-37 10-65 39-76 76L-8 250h116Z"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="5"
      />

      <path
        d="M225 88h122V28h-67c-29 0-55 14-72 37l-15 23h32Z"
        fill="#dbeafe"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      <path
        d="M363 28v60h123l-35-49c-13-7-30-11-50-11h-38Z"
        fill="#dbeafe"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      <path d="M25 250h107l28-47H61c-19 0-34 13-40 31l-7 16Z" fill="#0f172a" />

      <path
        d="M526 203h96c22 0 40 16 45 37l4 10H506l9-32c2-8 6-15 11-15Z"
        fill="#0f172a"
      />

      <circle cx="158" cy="250" r="61" fill="#0f172a" />
      <circle cx="158" cy="250" r="38" fill="#334155" />
      <circle cx="158" cy="250" r="16" fill="#64748b" />

      <circle cx="532" cy="250" r="61" fill="#0f172a" />
      <circle cx="532" cy="250" r="38" fill="#334155" />
      <circle cx="532" cy="250" r="16" fill="#64748b" />

      <rect x="72" y="220" width="65" height="9" rx="5" fill="#e2e8f0" />
      <rect x="84" y="170" width="50" height="17" rx="8" fill="#bfdbfe" />
      <rect x="575" y="187" width="50" height="15" rx="8" fill="#fecdd3" />

      <path
        d="M285 165h120M417 180h50"
        stroke="#94a3b8"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
