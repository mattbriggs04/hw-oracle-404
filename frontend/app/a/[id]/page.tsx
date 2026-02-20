"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DynamicForm from "../../components/DynamicForm";
import ResultDisplay from "../../components/ResultDisplay";
import { HomeworkSummary } from "../../components/HomeworkList";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function AssignmentPage() {
  const { id } = useParams<{ id: string }>();
  const [homework, setHomework] = useState<HomeworkSummary | null>(null);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/homeworks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Homework not found");
        return res.json();
      })
      .then(setHomework)
      .catch((e) => setError(e.message));
  }, [id]);

  async function handleSubmit(values: Record<string, string>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/oracle/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? "Oracle request failed");
      }
      const data = await res.json();
      setResult(data.result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  if (error && !homework) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-red-500">{error}</p>
        <Link href="/" className="text-sm underline mt-4 inline-block">
          Back to home
        </Link>
      </div>
    );
  }

  if (!homework) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        &larr; All assignments
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-1">{homework.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">
        {homework.description}
      </p>
      <DynamicForm
        schema={homework.input_schema}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      <ResultDisplay result={result} />
    </div>
  );
}
