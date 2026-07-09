"use client";

import { useState } from "react";
import Header from "../../components/Header";

const suggestions = [
  "Quais modelos automáticos estão disponíveis?",
  "Tem algum carro até 100 mil?",
  "Quais SUVs vocês têm?",
  "Compare Corolla Cross e T-Cross",
];

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente da AutoStore. Posso ajudar você a encontrar o carro ideal, comparar modelos e tirar dúvidas sobre os veículos disponíveis.",
    },
  ]);

  async function handleSend(message?: string) {
    const text = message || question;

    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao responder.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "Não consegui responder agora. Tente novamente em alguns instantes.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">Assistente</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Tire suas dúvidas sobre os veículos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Pergunte sobre modelos, consumo, câmbio, preço, categoria ou compare
            opções para escolher com mais segurança.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex min-h-[420px] flex-col rounded-3xl bg-slate-50 p-4 sm:min-h-[500px] sm:p-5">
              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%] ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                      Digitando resposta...
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Digite sua pergunta..."
                className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="min-h-14 rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </section>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path
                  d="M7 10h10M7 14h6M5 20l2.5-2H18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-950">
              Sugestões de perguntas
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Toque em uma sugestão ou escreva sua própria dúvida.
            </p>

            <div className="mt-5 space-y-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-sm leading-5 text-slate-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
