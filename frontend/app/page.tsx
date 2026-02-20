"use client";

import { useEffect, useState } from "react";
import HomeworkList, { HomeworkSummary } from "./components/HomeworkList";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function Home() {
  const [homeworks, setHomeworks] = useState<HomeworkSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/homeworks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch homeworks");
        return res.json();
      })
      .then(setHomeworks)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold mb-2">ECE 404 Homework Oracle</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">
        Select an assignment to compute the expected output.
      </p>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <HomeworkList homeworks={homeworks} />
      )}
    </div>
  );
}
