"use client";

import { HookCategory, CATEGORIES } from "@/lib/hooks";

interface CategoryFilterProps {
  selected: HookCategory;
  onSelect: (category: HookCategory) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === category
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black"
              : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
          aria-label={`Filter by ${category}`}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
