"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type AdminCarFormData = {
  id?: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  engine: string;
  power: string;
  transmission: string;
  consumption: string;
  price: number;
  fuel: string;
  colors: string[];
  items: string[];
  description: string;
  image: string;
};

type AdminCarFormProps = {
  mode: "create" | "edit";
  initialData?: AdminCarFormData;
};

const emptyForm = {
  brand: "",
  model: "",
  category: "",
  year: 2025,
  engine: "",
  power: "",
  transmission: "",
  consumption: "",
  price: 0,
  fuel: "",
  colors: "",
  items: "",
  description: "",
  image: "/images/cars/",
};

export default function AdminCarForm({ mode, initialData }: AdminCarFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState(() => {
    if (!initialData) return emptyForm;

    return {
      brand: initialData.brand,
      model: initialData.model,
      category: initialData.category,
      year: initialData.year,
      engine: initialData.engine,
      power: initialData.power,
      transmission: initialData.transmission,
      consumption: initialData.consumption,
      price: initialData.price,
      fuel: initialData.fuel,
      colors: initialData.colors.join(", "),
      items: initialData.items.join(", "),
      description: initialData.description,
      image: initialData.image,
    };
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof typeof formData, value: string | number) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    const endpoint =
      mode === "create"
        ? "/api/admin/cars"
        : `/api/admin/cars/${initialData?.id}`;

    const method = mode === "create" ? "POST" : "PUT";

    const payload = {
      brand: formData.brand,
      model: formData.model,
      category: formData.category,
      year: Number(formData.year),
      engine: formData.engine,
      power: formData.power,
      transmission: formData.transmission,
      consumption: formData.consumption,
      price: Number(formData.price),
      fuel: formData.fuel,
      colors: formData.colors,
      items: formData.items,
      description: formData.description,
      image: formData.image,
    };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let data: { error?: string } = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Não foi possível salvar o veículo.");
        return;
      }

      router.push("/admin/carros");
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao salvar o veículo. Tente novamente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInput
          label="Montadora"
          value={formData.brand}
          onChange={(value) => updateField("brand", value)}
          placeholder="Ex: Toyota"
        />

        <FormInput
          label="Modelo"
          value={formData.model}
          onChange={(value) => updateField("model", value)}
          placeholder="Ex: Corolla Cross"
        />

        <FormInput
          label="Categoria"
          value={formData.category}
          onChange={(value) => updateField("category", value)}
          placeholder="Ex: SUV"
        />

        <FormInput
          label="Ano"
          type="number"
          value={String(formData.year)}
          onChange={(value) => updateField("year", Number(value))}
          placeholder="2025"
        />

        <FormInput
          label="Motor"
          value={formData.engine}
          onChange={(value) => updateField("engine", value)}
          placeholder="Ex: 2.0 Flex"
        />

        <FormInput
          label="Potência"
          value={formData.power}
          onChange={(value) => updateField("power", value)}
          placeholder="Ex: 177 cv"
        />

        <FormInput
          label="Câmbio"
          value={formData.transmission}
          onChange={(value) => updateField("transmission", value)}
          placeholder="Ex: Automático CVT"
        />

        <FormInput
          label="Combustível"
          value={formData.fuel}
          onChange={(value) => updateField("fuel", value)}
          placeholder="Ex: Flex"
        />

        <FormInput
          label="Consumo"
          value={formData.consumption}
          onChange={(value) => updateField("consumption", value)}
          placeholder="Ex: Até 12,5 km/l"
        />

        <FormInput
          label="Preço"
          type="number"
          value={String(formData.price)}
          onChange={(value) => updateField("price", Number(value))}
          placeholder="170790"
        />

        <FormInput
          label="Cores"
          value={formData.colors}
          onChange={(value) => updateField("colors", value)}
          placeholder="Branco, Prata, Preto"
        />

        <FormInput
          label="Imagem principal"
          value={formData.image}
          onChange={(value) => updateField("image", value)}
          placeholder="/images/cars/toyota_corolla.jpg"
        />
      </div>

      <div className="mt-5 grid gap-5">
        <FormTextarea
          label="Itens de série"
          value={formData.items}
          onChange={(value) => updateField("items", value)}
          placeholder="Central multimídia, Ar-condicionado digital, Controle de estabilidade"
        />

        <FormTextarea
          label="Descrição"
          value={formData.description}
          onChange={(value) => updateField("description", value)}
          placeholder="Descreva o veículo de forma clara para o cliente."
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/carros")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading"
            ? "Salvando..."
            : mode === "create"
              ? "Cadastrar veículo"
              : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
      />
    </label>
  );
}

function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
      />
    </label>
  );
}
