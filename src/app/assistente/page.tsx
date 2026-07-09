"use client";

import { useState } from "react";
import Header from "../../components/Header";

const suggestions = [
  "Qual SUV tem melhor consumo?",
  "Qual carro mais econômico até R$ 100 mil?",
  "Compare Corolla Cross e T-Cross",
  "Quais modelos automáticos estão disponíveis?",
];

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente da AutoStore. Posso ajudar você a encontrar o carro ideal, comparar modelos e tirar dúvidas sobre os veículos disponíveis.",
    },
  ]);

  function handleSend(message?: string) {
    const text = message || question;

    if (!text.trim()) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        content: text,
      },
      {
        role: "assistant",
        content:
          "Estou preparando essa resposta com base nos veículos disponíveis no catálogo. Em breve esta conversa estará conectada ao atendimento completo.",
      },
    ]);

    setQuestion("");
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
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
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
                className="rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Enviar
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
                  className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-left text-sm leading-5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
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
