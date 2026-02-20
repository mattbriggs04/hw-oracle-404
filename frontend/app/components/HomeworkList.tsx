"use client";

import Link from "next/link";

export type HomeworkSummary = {
  id: string;
  title: string;
  description: string;
  input_schema: { name: string; label: string; type: string }[];
};

export default function HomeworkList({
  homeworks,
}: {
  homeworks: HomeworkSummary[];
}) {
  if (homeworks.length === 0) {
    return <p className="text-zinc-500">No homeworks available yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {homeworks.map((hw) => (
        <li key={hw.id}>
          <Link
            href={`/a/${hw.id}`}
            className="block rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
          >
            <h2 className="text-lg font-semibold">{hw.title}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {hw.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
