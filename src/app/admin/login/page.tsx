"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Header from "../../../components/Header";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function getRedirectPath() {
    if (typeof window === "undefined") {
      return "/leads";
    }

    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get("next");

    if (
      nextPath &&
      nextPath.startsWith("/") &&
      !nextPath.startsWith("//") &&
      !nextPath.includes("://")
    ) {
      return nextPath;
    }

    return "/leads";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Informe o e-mail de administrador.");
      return;
    }

    if (!password.trim()) {
      setStatus("error");
      setErrorMessage("Informe a senha de administrador.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Não foi possível entrar.");
        return;
      }

      router.replace(getRedirectPath());
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao tentar entrar. Tente novamente.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center justify-center px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_420px]">
          <div className="relative hidden overflow-hidden bg-blue-600 p-10 text-white lg:block">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-400/20" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                    <path
                      d="M6 11V8a6 6 0 0 1 12 0v3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M5 11h14v9H5v-9Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M12 15v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h1 className="mt-8 text-4xl font-semibold tracking-tight">
                  Área administrativa
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                  Acesse os contatos enviados pelos clientes interessados nos
                  veículos da AutoStore.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-5 text-sm leading-6 text-blue-50">
                Os leads ficam protegidos para que apenas pessoas autorizadas
                possam visualizar os dados de contato.
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 lg:hidden">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                <path
                  d="M6 11V8a6 6 0 0 1 12 0v3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M5 11h14v9H5v-9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 15v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="mt-6 text-center lg:mt-0 lg:text-left">
              <p className="text-sm font-semibold text-blue-600">
                Login do administrador
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Entrar na área administrativa
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Informe o e-mail e a senha de administrador para continuar.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  E-mail
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    placeholder="Digite o e-mail do administrador"
                    autoComplete="username"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Senha
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Entrando..." : "Entrar"}
              </button>

              {status === "error" && errorMessage && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400 lg:text-left">
              Acesso restrito para visualização dos contatos recebidos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
