# HookHub MVP Specification

## Project Overview

**HookHub** is a community-driven platform for discovering and browsing open-source Claude Code hooks. It provides a curated collection of hooks with categorization, filtering, and direct links to GitHub repositories.

### What are Claude Code Hooks?

Claude Code hooks are user-defined shell commands that execute at various points in Claude Code's lifecycle (PreToolUse, PostToolUse, UserPromptSubmit, Stop, etc.). They provide deterministic control over Claude Code's behavior, enabling:
- Security guardrails (blocking dangerous commands)
- Automation (auto-formatting, auto-commits)
- Notifications (desktop alerts, TTS)
- Quality control (linting, validation)
- Workflow optimization (logging, monitoring)

**Reference Resources:**
- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Hooks Mastery Repository](https://github.com/disler/claude-code-hooks-mastery)
- [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code)

---

## MVP Scope

### Core Features

1. **Grid View Display** - Main page displays hooks in a responsive grid layout
2. **Hook Information** - Each hook card shows: name, category, description, link to repo
3. **Category Filtering** - Users can filter hooks by pre-defined categories
4. **Direct Repository Links** - Clicking a hook opens the GitHub repository in a new tab

### Out of Scope (Future Features)

- User authentication
- User-submitted hooks
- Dynamic GitHub API integration
- Hook installation/setup automation
- Detailed hook pages
- Search functionality
- Sorting options
- Hook ratings/popularity
- Code preview

---

## Data Model

### Hook Object Schema

```typescript
interface Hook {
  id: string;                  // Unique identifier (e.g., "hook-001")
  name: string;                // Display name (e.g., "Security Blocker")
  category: HookCategory;      // Pre-defined category
  description: string;         // 1-2 sentence description
  repoUrl: string;            // Full GitHub repository URL
  author?: string;            // Optional: GitHub username/org
  hookType?: string;          // Optional: PreToolUse, PostToolUse, etc.
}

type HookCategory =
  | "Security"
  | "Automation"
  | "Notifications"
  | "Quality Control"
  | "Workflow"
  | "Monitoring"
  | "All";
```

### Data Source

**Static JSON file**: `data/hooks.json` in the repository

This file contains a hardcoded array of curated hooks for the MVP. Example structure:

```json
{
  "hooks": [
    {
      "id": "hook-001",
      "name": "Security Command Blocker",
      "category": "Security",
      "description": "Blocks dangerous commands like rm -rf, git reset --hard, and network curls in PreToolUse for Bash.",
      "repoUrl": "https://github.com/disler/claude-code-hooks-mastery",
      "author": "disler",
      "hookType": "PreToolUse"
    },
    {
      "id": "hook-002",
      "name": "Auto-Formatter",
      "category": "Quality Control",
      "description": "Automatically runs prettier on .ts files and gofmt on .go files after every file edit.",
      "repoUrl": "https://github.com/decider/claude-hooks",
      "author": "decider",
      "hookType": "PostToolUse"
    }
  ]
}
```

**Initial Hooks to Include** (from research):

1. **Security Command Blocker** - [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
2. **Multi-Agent Observability** - [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability)
3. **TypeScript Hook System** - [johnlindquist/claude-hooks](https://github.com/johnlindquist/claude-hooks)
4. **Code Quality Enforcer** - [decider/claude-hooks](https://github.com/decider/claude-hooks)
5. **Skill Auto-Activation** - [diet103/claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase)

---

## User Interface Design

### Page Structure

```
┌─────────────────────────────────────────┐
│           HEADER                        │
│  Logo | "HookHub" | GitHub Link         │
├─────────────────────────────────────────┤
│           HERO SECTION                  │
│  Headline: "Discover Claude Code Hooks" │
│  Subtitle: Description                  │
├─────────────────────────────────────────┤
│         CATEGORY FILTER                 │
│  [All] [Security] [Automation] ...      │
├─────────────────────────────────────────┤
│           HOOKS GRID                    │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Hook 1│ │Hook 2│ │Hook 3│            │
│  └──────┘ └──────┘ └──────┘            │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Hook 4│ │Hook 5│ │Hook 6│            │
│  └──────┘ └──────┘ └──────┘            │
├─────────────────────────────────────────┤
│           FOOTER                        │
│  "Built with Next.js • Claude Code"     │
└─────────────────────────────────────────┘
```

### Component Breakdown

1. **Header Component**
   - Logo/brand name "HookHub"
   - Navigation (optional: link to GitHub repo)
   - Responsive design

2. **Hero Section**
   - H1: "Discover Claude Code Hooks"
   - Description: "Browse a curated collection of open-source hooks to supercharge your Claude Code workflow"
   - Optional: CTA to contribute hooks (links to GitHub issues)

3. **Category Filter Bar**
   - Horizontal pill buttons for each category
   - "All" selected by default
   - Active state styling
   - Responsive: wraps on mobile

4. **Hook Card Component**
   ```
   ┌─────────────────────────┐
   │ [Category Badge]        │
   │                         │
   │ Hook Name               │
   │ Description text that   │
   │ spans multiple lines... │
   │                         │
   │ [GitHub Icon] View Repo │
   └─────────────────────────┘
   ```

   **Card Features:**
   - Category badge (color-coded)
   - Hook name (bold, larger font)
   - Description (truncated if too long)
   - GitHub link button/icon
   - Hover effect (slight elevation, border highlight)
   - Opens repo in new tab on click

5. **Hooks Grid**
   - Responsive grid:
     - Mobile (< 640px): 1 column
     - Tablet (640-1024px): 2 columns
     - Desktop (> 1024px): 3 columns
   - Even spacing between cards
   - Cards have consistent height

6. **Footer**
   - Simple, centered text
   - Credits: "Built with Next.js • Claude Code"
   - Optional: Links to docs, GitHub

---

## Styling Guidelines

### Color Palette

Using existing Tailwind theme:

**Light Mode:**
- Background: `bg-zinc-50` (off-white)
- Card background: `bg-white`
- Text: `text-zinc-900`
- Borders: `border-zinc-200`

**Dark Mode:**
- Background: `bg-black`
- Card background: `bg-zinc-900`
- Text: `text-zinc-100`
- Borders: `border-zinc-800`

**Category Badge Colors:**
- Security: `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
- Automation: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`
- Notifications: `bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`
- Quality Control: `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
- Workflow: `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`
- Monitoring: `bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`

### Typography

- Headings: `font-sans` (Geist Sans)
- Body text: `font-sans`
- Code snippets (if any): `font-mono` (Geist Mono)
- Hook name: `text-lg font-semibold`
- Description: `text-sm text-zinc-600 dark:text-zinc-400`

### Spacing & Layout

- Container max-width: `max-w-7xl`
- Grid gap: `gap-6`
- Card padding: `p-6`
- Section spacing: `py-12`

---

## Technical Implementation

### File Structure

```
app/
├── layout.tsx                 # Root layout (already exists)
├── page.tsx                   # Homepage with hooks grid (modify)
├── globals.css                # Global styles (already exists)
└── components/
    ├── Header.tsx             # Header component (new)
    ├── Hero.tsx               # Hero section (new)
    ├── CategoryFilter.tsx     # Category filter bar (new)
    ├── HookCard.tsx           # Individual hook card (new)
    └── HooksGrid.tsx          # Grid container (new)

data/
└── hooks.json                 # Static hooks data (new)

lib/
└── hooks.ts                   # Types and data fetching utilities (new)
```

### Core Components to Build

1. **`lib/hooks.ts`** - Data layer
   ```typescript
   export interface Hook { /* schema */ }
   export type HookCategory = /* ... */

   export async function getHooks(): Promise<Hook[]> {
     // Read from hooks.json
   }

   export function filterByCategory(hooks: Hook[], category: HookCategory): Hook[] {
     // Filter logic
   }
   ```

2. **`components/HookCard.tsx`** - Hook display
   ```typescript
   interface HookCardProps {
     hook: Hook;
   }

   export function HookCard({ hook }: HookCardProps) {
     // Card UI with link to repoUrl
   }
   ```

3. **`components/CategoryFilter.tsx`** - Filter UI (Client Component)
   ```typescript
   "use client"

   interface CategoryFilterProps {
     categories: HookCategory[];
     selected: HookCategory;
     onSelect: (category: HookCategory) => void;
   }
   ```

4. **`components/HooksGrid.tsx`** - Grid layout
   ```typescript
   interface HooksGridProps {
     hooks: Hook[];
   }

   export function HooksGrid({ hooks }: HooksGridProps) {
     // Responsive grid with HookCard children
   }
   ```

5. **`app/page.tsx`** - Main page (Client Component)
   ```typescript
   "use client"

   export default function Home() {
     const [selectedCategory, setSelectedCategory] = useState<HookCategory>("All");
     const hooks = getHooks(); // Or use server action
     const filtered = filterByCategory(hooks, selectedCategory);

     return (
       <>
         <Hero />
         <CategoryFilter />
         <HooksGrid hooks={filtered} />
       </>
     );
   }
   ```

### State Management

**MVP Approach: React useState**
- Client-side filtering with useState for selected category
- No need for complex state management (Redux, Zustand, etc.)
- Hooks data loaded once, filtered client-side

### Responsive Design

**Breakpoints (Tailwind CSS):**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Grid Responsive Classes:**
```typescript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
```

---

## User Interactions

### Category Filtering

1. User clicks a category pill in the filter bar
2. Selected category state updates
3. Hooks grid re-renders with filtered hooks
4. Active category has distinct styling (darker background, bold text)

### Hook Card Click

1. User clicks anywhere on a hook card (or "View Repo" button)
2. Opens `repoUrl` in a new browser tab (`target="_blank" rel="noopener noreferrer"`)
3. No navigation within the app

### Accessibility

- Semantic HTML (`<button>`, `<a>`, `<article>`)
- ARIA labels for filter buttons
- Keyboard navigation support
- Focus states for interactive elements
- Alt text for any images/icons

---

## Development Phases

### Phase 1: Data & Types
1. Create `lib/hooks.ts` with TypeScript interfaces
2. Create `data/hooks.json` with initial 5-10 curated hooks
3. Implement `getHooks()` and `filterByCategory()` functions

### Phase 2: Core Components
1. Build `HookCard.tsx` component
2. Build `HooksGrid.tsx` container
3. Build `CategoryFilter.tsx` with client-side state
4. Build `Hero.tsx` and `Header.tsx`

### Phase 3: Integration
1. Modify `app/page.tsx` to use new components
2. Wire up category filtering state
3. Test responsive behavior

### Phase 4: Styling & Polish
1. Apply Tailwind styles to match design
2. Add dark mode support
3. Implement hover/focus states
4. Ensure accessibility

### Phase 5: Testing & Launch
1. Test on multiple screen sizes
2. Verify all links work correctly
3. Check dark mode
4. Deploy to Vercel

---

## Success Metrics

For MVP validation:
- Clean, scannable grid layout
- All hooks displayed correctly
- Category filtering works smoothly
- Links open in new tabs
- Responsive on mobile, tablet, desktop
- Dark mode looks good
- No console errors

---

## Future Enhancements (Post-MVP)

1. **Search functionality** - Text search across name/description
2. **Sorting** - Sort by popularity, recent, alphabetical
3. **GitHub API integration** - Fetch hooks dynamically from GitHub topics
4. **Detailed hook pages** - Dedicated page per hook with installation guide
5. **Code preview** - Show hook code snippets
6. **User submissions** - Form to submit new hooks
7. **Hook categories expansion** - More granular categories
8. **Favorites/bookmarks** - Save hooks for later
9. **Copy-to-clipboard** - Quick copy of hook code
10. **Hook templates** - Pre-configured hook templates

---

## Technical Notes

### Next.js 16 App Router

- Use Server Components by default
- Add `"use client"` only for interactive components (CategoryFilter, filtering logic)
- Leverage Next.js Image for any logos/icons

### Tailwind CSS v4

- No `tailwind.config.js` - use `@theme inline` in `globals.css`
- Import is `@import "tailwindcss"` (not individual layers)
- PostCSS plugin is `@tailwindcss/postcss`

### TypeScript

- Strict mode enabled
- Use explicit types for all props
- No `any` types

---

## Initial Hooks Data (Curated List)

Based on research, these are excellent open-source hooks to feature:

1. **Security Command Blocker**
   - Repo: https://github.com/disler/claude-code-hooks-mastery
   - Category: Security
   - Description: Blocks dangerous commands like rm -rf and git reset --hard in PreToolUse hooks

2. **Multi-Agent Observability**
   - Repo: https://github.com/disler/claude-code-hooks-multi-agent-observability
   - Category: Monitoring
   - Description: Real-time monitoring dashboard for Claude Code agents with hook event tracking

3. **TypeScript Hooks with Type Safety**
   - Repo: https://github.com/johnlindquist/claude-hooks
   - Category: Workflow
   - Description: Full type safety and auto-completion for writing Claude Code hooks in TypeScript

4. **Code Quality Enforcer**
   - Repo: https://github.com/decider/claude-hooks
   - Category: Quality Control
   - Description: Comprehensive hooks for enforcing clean code practices and automated quality checks

5. **Skill Auto-Activation System**
   - Repo: https://github.com/diet103/claude-code-infrastructure-showcase
   - Category: Automation
   - Description: Automatically activate skills and track tool usage with post-hook automation

6. **Awesome Claude Code Collection**
   - Repo: https://github.com/hesreallyhim/awesome-claude-code
   - Category: Workflow
   - Description: Curated list of commands, hooks, and workflows for Claude Code

---

## Design Inspiration

Look at these sites for grid layout inspiration:
- npm package registry (grid of packages)
- Tailwind UI components gallery
- Vercel templates page
- GitHub topics pages

Keep it clean, minimal, and focused on discoverability.

---

## References

- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Hooks Quickstart Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Hooks Blog Post](https://claude.com/blog/how-to-configure-hooks)
- [Automate AI Workflows with Hooks](https://blog.gitbutler.com/automate-your-ai-workflows-with-claude-code-hooks)
- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---

**End of Specification**
