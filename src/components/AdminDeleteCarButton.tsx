"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDeleteCarButton({
  carId,
  carName,
}: {
  carId: string;
  carName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${carName}? Essa ação não pode ser desfeita.`,
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/cars/${carId}`, {
        method: "DELETE",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Não foi possível excluir o veículo.");
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao tentar excluir o veículo.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDeleting ? "Excluindo..." : "Excluir"}
    </button>
  );
}
