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

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
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

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="min-h-[430px] rounded-3xl bg-slate-50 p-5">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
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
              className="mt-5 flex gap-3"
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
                className="rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </section>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Sugestões de perguntas
            </h2>

            <div className="mt-5 space-y-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-sm leading-5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
