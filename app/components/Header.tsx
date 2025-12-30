export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            HookHub
          </h1>
        </div>
        <nav>
          <a
            href="https://github.com/hesreallyhim/awesome-claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
