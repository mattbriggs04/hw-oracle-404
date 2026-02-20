"use client";

export default function ResultDisplay({
  result,
}: {
  result: Record<string, string> | null;
}) {
  if (!result) return null;

  return (
    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
      <h3 className="text-sm font-semibold mb-2">Result</h3>
      <dl className="space-y-1">
        {Object.entries(result).map(([key, value]) => (
          <div key={key} className="flex gap-2 text-sm">
            <dt className="font-medium">{key}:</dt>
            <dd className="font-mono break-all">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
