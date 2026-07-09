"use client";

import { useState } from "react";
import {
  formatWhatsapp,
  isValidEmail,
  isValidWhatsapp,
  normalizePhone,
} from "../lib/leadValidation";

type LeadFormProps = {
  carId: string;
  carName: string;
};

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

export default function LeadForm({ carId, carName }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(`Tenho interesse no ${carName}.`);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validateForm() {
    const errors: FieldErrors = {};
    const normalizedPhone = normalizePhone(phone);

    if (!name.trim()) {
      errors.name = "Informe seu nome.";
    }

    if (!email.trim()) {
      errors.email = "Informe seu e-mail.";
    } else if (!isValidEmail(email)) {
      errors.email = "Digite um e-mail válido. Ex: nome@email.com";
    }

    if (!phone.trim()) {
      errors.phone = "Informe seu WhatsApp.";
    } else if (normalizedPhone.length < 11) {
      errors.phone =
        "O WhatsApp precisa ter DDD + 9 dígitos. Ex: (11) 99999-9999.";
    } else if (!isValidWhatsapp(phone)) {
      errors.phone =
        "Digite um WhatsApp válido com DDD do Brasil. Ex: (11) 99999-9999.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    const isValid = validateForm();

    if (!isValid) {
      setStatus("error");
      setErrorMessage("Revise os campos destacados antes de enviar.");
      return;
    }

    setStatus("loading");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: formatWhatsapp(phone),
        message: message.trim(),
        carId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setErrorMessage(
        data.error || "Não foi possível enviar agora. Tente novamente.",
      );
      return;
    }

    setStatus("success");
    setFieldErrors({});
    setErrorMessage("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage(`Tenho interesse no ${carName}.`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600">
          Seu nome
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setFieldErrors((currentErrors) => ({
                ...currentErrors,
                name: undefined,
              }));
            }}
            placeholder="Digite seu nome"
            className={`mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none transition focus:border-blue-400 ${
              fieldErrors.name ? "border-red-300" : "border-slate-200"
            }`}
          />
        </label>

        {fieldErrors.name && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">
          E-mail
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldErrors((currentErrors) => ({
                ...currentErrors,
                email: undefined,
              }));
            }}
            type="text"
            inputMode="email"
            placeholder="nome@email.com"
            className={`mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none transition focus:border-blue-400 ${
              fieldErrors.email ? "border-red-300" : "border-slate-200"
            }`}
          />
        </label>

        {fieldErrors.email && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">
          WhatsApp
          <input
            value={phone}
            onChange={(event) => {
              const formattedPhone = formatWhatsapp(event.target.value);

              setPhone(formattedPhone);
              setFieldErrors((currentErrors) => ({
                ...currentErrors,
                phone: undefined,
              }));
            }}
            type="tel"
            inputMode="numeric"
            placeholder="(11) 99999-9999"
            maxLength={15}
            className={`mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none transition focus:border-blue-400 ${
              fieldErrors.phone ? "border-red-300" : "border-slate-200"
            }`}
          />
        </label>

        {fieldErrors.phone && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {fieldErrors.phone}
          </p>
        )}
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

      {status === "error" && errorMessage && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
