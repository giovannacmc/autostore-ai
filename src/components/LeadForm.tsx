"use client";

import { useState } from "react";

type LeadFormProps = {
  carId: string;
  carName: string;
};

export default function LeadForm({ carId, carName }: LeadFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(`Tenho interesse no ${carName}.`);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const isEmail = contact.includes("@");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: isEmail ? contact : undefined,
        phone: !isEmail ? contact : undefined,
        message,
        carId,
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setContact("");
    setMessage(`Tenho interesse no ${carName}.`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600">
          Seu nome
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="Digite seu nome"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-400"
          />
        </label>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">
          E-mail ou telefone
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            required
            placeholder="Digite seu contato"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-400"
          />
        </label>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">
          Mensagem
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-400"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Enviando..." : "Tenho interesse"}
      </button>

      {status === "success" && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Interesse enviado com sucesso.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Não foi possível enviar agora. Tente novamente.
        </p>
      )}
    </form>
  );
}
