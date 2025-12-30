export type HookCategory =
  | "Security"
  | "Automation"
  | "Notifications"
  | "Quality Control"
  | "Workflow"
  | "Monitoring"
  | "All";

export interface Hook {
  id: string;
  name: string;
  category: Exclude<HookCategory, "All">;
  description: string;
  repoUrl: string;
  author?: string;
  hookType?: string;
}

export const CATEGORIES: HookCategory[] = [
  "All",
  "Security",
  "Automation",
  "Notifications",
  "Quality Control",
  "Workflow",
  "Monitoring",
];

export function filterByCategory(
  hooks: Hook[],
  category: HookCategory
): Hook[] {
  if (category === "All") {
    return hooks;
  }
  return hooks.filter((hook) => hook.category === category);
}

export function getCategoryColor(category: Exclude<HookCategory, "All">): string {
  const colors: Record<Exclude<HookCategory, "All">, string> = {
    Security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Automation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Notifications: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Quality Control": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Workflow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Monitoring: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };
  return colors[category];
}
