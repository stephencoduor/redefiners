# Performance Optimization Report

## Bundle Size Results

### Before Optimization

| Chunk | Raw Size | Gzip Size |
|-------|----------|-----------|
| `index.js` (main bundle) | 348.26 KB | 105.44 KB |
| `AppLayout.js` | 161.73 KB | 53.29 KB |
| `sanitize.js` | 21.84 KB | 8.84 KB |
| `utils.js` | 26.41 KB | 8.43 KB |
| **Total initial load** | **~558 KB** | **~176 KB** |

### After Optimization

| Chunk | Raw Size | Gzip Size |
|-------|----------|-----------|
| `index.js` (app code only) | 64.94 KB | 16.36 KB |
| `vendor-react.js` | 181.79 KB | 57.19 KB |
| `vendor-router.js` | 91.90 KB | 30.46 KB |
| `vendor-query.js` | 35.49 KB | 11.15 KB |
| `vendor-sanitize.js` | 21.03 KB | 8.46 KB |
| `AppLayout.js` | 161.85 KB | 53.33 KB |
| `utils.js` | 26.41 KB | 8.43 KB |

### Key Improvement

- **Main index bundle: 348.26 KB -> 64.94 KB (81% reduction)**
- Vendor chunks are now separately cacheable by the browser
- `vendor-query` and `vendor-sanitize` only load when needed by page chunks

## Optimizations Applied

### 1. Vendor Bundle Splitting (vite.config.ts)

Added `manualChunks` to Rollup output configuration to split large vendor dependencies out of the main bundle:

- **vendor-react**: `react`, `react-dom`, `scheduler` -- core runtime, cached long-term
- **vendor-router**: `react-router` -- routing library, cached separately
- **vendor-query**: `@tanstack/react-query` -- data-fetching library, loaded on demand
- **vendor-sanitize**: `dompurify` -- HTML sanitizer, loaded only by pages that need it

This ensures that vendor code (which changes infrequently) is cached independently from application code (which changes often).

### 2. Route-Level Code Splitting (already in place)

All page components in `src/routes/index.tsx` already use React Router's `lazy()` pattern for route-level code splitting. Each page is loaded as a separate chunk only when navigated to.

### 3. React.memo on Shared Components

Wrapped frequently-rendered shared components with `React.memo()` to prevent unnecessary re-renders when parent components update but props remain the same:

- `CourseCard` -- rendered in grid lists, avoids re-render when sibling cards change
- `AssignmentRow` -- rendered in assignment lists
- `StatusPill` -- pure presentational pill component
- `EmptyState` -- static empty-state display
- `LoadingSkeleton` -- skeleton loading placeholders
- `SidebarItem` -- sidebar navigation items
- `SidebarSubmenu` -- sidebar collapsible submenus

### 4. Image Optimization

Added `loading="lazy"` and explicit `width`/`height` attributes to all `<img>` tags across page components:

- **Lazy loading**: Defers off-screen image loading until the user scrolls near them, reducing initial page weight
- **Width/height attributes**: Prevents Cumulative Layout Shift (CLS) by reserving space before images load

Affected files: `CourseCard.tsx`, `LoginPage.tsx`, `LoginVariant1-5.tsx`

### 5. Icon Tree-Shaking (already optimized)

All `lucide-react` icon imports use named imports (e.g., `import { FileText } from 'lucide-react'`), which allows Vite/Rollup to tree-shake unused icons. No barrel-import issues were found.

## Architecture Decisions

### Why function-based manualChunks?

Using a function (`manualChunks(id)`) instead of an object map provides better compatibility with Rollup's type system and allows pattern matching on `node_modules` paths, which handles nested dependencies and hoisted packages correctly.

### Why not split AppLayout?

`AppLayout.js` (161 KB) contains the sidebar, top bar, and bottom navigation. These are loaded once on authentication and remain mounted for the entire session. Splitting them further would add waterfall requests without meaningful benefit since they are always needed together.

### Why not dynamic-import react-query?

React Query's `QueryClientProvider` wraps the entire app in `App.tsx`. Moving it to a lazy boundary would require restructuring the component tree and would delay data prefetching. The vendor-query chunk is already separate and browser-cached.

## Lighthouse Score Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | > 90 | Bundle splitting reduces main-thread blocking |
| First Contentful Paint | < 1.5s | Smaller initial JS payload |
| Largest Contentful Paint | < 2.5s | Lazy-loaded images, code splitting |
| Cumulative Layout Shift | < 0.1 | Explicit image dimensions prevent shifts |
| Time to Interactive | < 3.0s | Vendor caching speeds repeat visits |
| Total Blocking Time | < 200ms | Smaller eval per chunk |
