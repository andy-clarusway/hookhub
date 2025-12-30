import { Hook } from "@/lib/hooks";
import { HookCard } from "./HookCard";

interface HooksGridProps {
  hooks: Hook[];
}

export function HooksGrid({ hooks }: HooksGridProps) {
  if (hooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400">
          No hooks found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hooks.map((hook) => (
        <HookCard key={hook.id} hook={hook} />
      ))}
    </div>
  );
}
