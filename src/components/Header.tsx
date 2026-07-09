"use client";

import Link from "next/link";

function CarLogoIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="#2563eb" />

      <path
        d="M8 18.2h16M10.2 18.2l1.2-4.1A2.2 2.2 0 0 1 13.5 12.5h5A2.2 2.2 0 0 1 20.6 14.1l1.2 4.1"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 18.2v2.4A1.4 1.4 0 0 0 11.4 22h9.2a1.4 1.4 0 0 0 1.4-1.4v-2.4"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="21.4" r="1.2" fill="white" />
      <circle cx="20" cy="21.4" r="1.2" fill="white" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <CarLogoIcon />

          <span className="text-base font-bold tracking-tight text-slate-950">
            AutoStore AI
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex">
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

        <button
          type="button"
          aria-label="Área do usuário"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4.5 20a7.5 7.5 0 0 1 15 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
