"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryFilter } from "./components/CategoryFilter";
import { HooksGrid } from "./components/HooksGrid";
import { HookCategory, filterByCategory } from "@/lib/hooks";
import hooksData from "@/data/hooks.json";

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<HookCategory>("All");

  const hooks = hooksData.hooks;
  const filteredHooks = filterByCategory(hooks, selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-4">
        <Hero />

        <div className="py-8">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="py-8 pb-16">
          <HooksGrid hooks={filteredHooks} />
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Built with Next.js • Claude Code
        </p>
      </footer>
    </div>
  );
}
