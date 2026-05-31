import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  message: string;
};

/** Friendly message when a list has no items */
function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 py-16 text-center">
      <div className="text-amber-400">{icon}</div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="max-w-sm text-sm text-zinc-400">{message}</p>
    </div>
  );
}

export default EmptyState;
