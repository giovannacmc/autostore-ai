import Link from "next/link";
import Header from "../components/Header";

const features = [
  {
    title: "Catálogo completo",
    description:
      "Modelos novos e seminovos com informações claras para você escolher melhor.",
    icon: "catalog",
  },
  {
    title: "Atendimento inteligente",
    description:
      "Respostas rápidas para tirar dúvidas sobre os veículos do catálogo.",
    icon: "chat",
  },
  {
    title: "Compare com facilidade",
    description:
      "Compare modelos lado a lado e encontre a melhor opção para sua rotina.",
    icon: "compare",
  },
  {
    title: "Decisão com confiança",
    description: "Informações organizadas para comprar com mais segurança.",
    icon: "shield",
  },
];

function FeatureIcon({ type }: { type: string }) {
  return (
    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
      {type === "catalog" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M8 4h8M7 8h10M7 12h10M7 16h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      )}

      {type === "chat" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M7.5 10.5h9M7.5 14h5M6 19l-2.2 1.2.6-2.7A7.7 7.7 0 0 1 3 13c0-4 3.8-7.2 8.5-7.2S20 9 20 13s-3.8 7.2-8.5 7.2A10 10 0 0 1 6 19Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {type === "compare" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M8 7h10M8 12h7M8 17h12M4 7h.01M4 12h.01M4 17h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === "shield" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 21s7-3.2 7-10V5.5L12 3 5 5.5V11c0 6.8 7 10 7 10Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

function HeroCar() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[430px]">
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-blue-50/70 via-white to-slate-100/80" />

      <svg
        viewBox="0 0 900 520"
        className="relative z-10 w-full max-w-[720px] drop-shadow-2xl"
        fill="none"
      >
        <defs>
          <linearGradient id="carBody" x1="190" y1="170" x2="760" y2="390">
            <stop stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#eef3f8" />
            <stop offset="1" stopColor="#d7e0ea" />
          </linearGradient>

          <linearGradient
            id="windowGradient"
            x1="330"
            y1="135"
            x2="610"
            y2="255"
          >
            <stop stopColor="#dce8f5" />
            <stop offset="1" stopColor="#8fa7bd" />
          </linearGradient>
        </defs>

        <ellipse
          cx="475"
          cy="428"
          rx="320"
          ry="28"
          fill="#cbd5e1"
          fillOpacity="0.55"
        />

        <path
          d="M171 330C181 285 221 256 267 246L328 176C348 153 377 140 408 140H548C590 140 627 160 650 194L694 259C748 268 787 303 801 353L811 393H159L171 330Z"
          fill="url(#carBody)"
          stroke="#cbd5e1"
          strokeWidth="4"
        />

        <path
          d="M330 249L383 177C393 164 409 156 426 156H536C572 156 602 174 621 204L650 249H330Z"
          fill="url(#windowGradient)"
          stroke="#cbd5e1"
          strokeWidth="4"
        />

        <path d="M456 158V249" stroke="#ffffff" strokeWidth="5" opacity="0.8" />
        <path
          d="M599 184L570 249"
          stroke="#ffffff"
          strokeWidth="5"
          opacity="0.75"
        />

        <path
          d="M198 325H302C330 325 354 347 358 375H163L198 325Z"
          fill="#111827"
        />

        <path
          d="M622 325H767L794 375H595C599 348 622 325 622 325Z"
          fill="#111827"
        />

        <path
          d="M370 287H510"
          stroke="#cbd5e1"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <rect x="223" y="292" width="58" height="20" rx="10" fill="#dbeafe" />
        <rect x="710" y="314" width="54" height="18" rx="9" fill="#fee2e2" />

        <circle cx="306" cy="384" r="66" fill="#111827" />
        <circle cx="306" cy="384" r="42" fill="#334155" />
        <circle cx="306" cy="384" r="18" fill="#64748b" />

        <circle cx="666" cy="384" r="66" fill="#111827" />
        <circle cx="666" cy="384" r="42" fill="#334155" />
        <circle cx="666" cy="384" r="18" fill="#64748b" />

        <path
          d="M182 355H239"
          stroke="#e2e8f0"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <path
          d="M508 301H558"
          stroke="#94a3b8"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M244 261C275 245 312 237 351 235"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faff] text-slate-950">
      <Header />

      <section className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,#ffffff_0%,#ffffff_42%,#eef5ff_42%,#f7faff_100%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Inteligência para escolher melhor
            </p>

            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Encontre o carro{" "}
              <span className="text-blue-600">ideal com IA.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Descubra, compare e escolha o carro perfeito para você com
              informações claras e atendimento rápido.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Ver catálogo
              </Link>

              <Link
                href="/assistente"
                className="rounded-lg border border-blue-200 bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                Como funciona
              </Link>
            </div>
          </div>

          <HeroCar />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-20 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <FeatureIcon type={feature.icon} />

            <h2 className="text-base font-semibold text-slate-950">
              {feature.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {feature.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
