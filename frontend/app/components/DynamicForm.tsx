"use client";

import { useState } from "react";

type FieldSchema = {
  name: string;
  label: string;
  type: string;
};

export default function DynamicForm({
  schema,
  onSubmit,
  loading,
}: {
  schema: FieldSchema[];
  onSubmit: (values: Record<string, string>) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(schema.map((f) => [f.name, ""]))
  );

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium mb-1"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {loading ? "Computing..." : "Submit"}
      </button>
    </form>
  );
}
