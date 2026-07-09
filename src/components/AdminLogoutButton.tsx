"use client";

import { useState } from "react";

export default function AdminLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    await fetch("/api/admin/logout", {
      method: "POST",
      cache: "no-store",
    });

    window.location.replace("/admin/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? "Saindo..." : "Sair"}
    </button>
  );
}
