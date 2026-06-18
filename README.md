# Bundle Builder — Multi-Step Security System Configurator

A React + TypeScript prototype of a multi-step bundle builder with a live review panel. Built as a frontend take-home exercise.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd BundleBuilder

# 2. Install dependencies
npm install
```

### Running Locally

```bash
# Start the Vite development server (hot-module replacement enabled)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check + production bundle (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npx tsc --noEmit` | Type-check without emitting files |

---

## Key Design Decisions

### Typography — Plus Jakarta Sans instead of Gilroy

**Decision:** The project uses [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (served via Google Fonts) rather than Gilroy.

**Reasoning:** Gilroy is a commercially licensed typeface published by Radomir Tinkov / Ektype. Using it in a production web application requires purchasing a web-font licence per-domain. For a prototype / take-home context, shipping unlicensed font files would be:

1. A legal liability (copyright infringement).
2. A red flag in any engineering review.

**Tradeoffs acknowledged:**

| Aspect | Gilroy | Plus Jakarta Sans |
|---|---|---|
| Licence | Commercial (paid per domain) | Open-source (SIL OFL 1.1) |
| Geometric personality | Strong — rounded, distinctive | Similar — geometric grotesque |
| Weight range | 8 weights | 6 weights (400–700 covered) |
| Variable font | No | Yes (`wght` axis) |
| Google Fonts CDN | No | Yes — zero infra cost |
| Brand fidelity | Exact design spec | ~95% visual parity |

Plus Jakarta Sans was chosen as the nearest open-source equivalent: geometric, rounded, same x-height category. In a production handoff where the Gilroy licence is purchased, swapping fonts is a one-line change in `src/index.css`:

```css
/* Before */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans...');
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;

/* After (with purchased licence hosted on CDN) */
@font-face { src: url('/fonts/Gilroy-Regular.woff2') ... }
--font-sans: 'Gilroy', system-ui, sans-serif;
```

---

### Icon System — Compiled `index.json` SVG Registry

**Decision:** SVG icons are not imported as React components or loaded from an `<img>` tag. Instead, all raw SVG markup strings are compiled into a single `src/assets/icons/index.json` file and injected into the DOM at runtime by the `Icon` component using `DOMParser`.

**How it works:**

```
src/assets/icons/index.json   →   { "arrowIcon": "<svg>...</svg>", "plusIcon": "<svg>...", … }
```

The `Icon` component (`src/components/ui/Icon.tsx`):
1. Looks up the key in the registry.
2. Parses the SVG string with `DOMParser`.
3. Sets `width`, `height`, and `color: inherit` on the parsed element.
4. Appends it inside a `<span>` via `ref`.

**Why not `<img src="icon.svg">`?**

- `<img>` SVGs cannot be styled with CSS `color` / `currentColor`. Icon tinting (e.g., primary purple on the arrow) would require duplicated coloured variants.

**Why not SVG-as-React-component (SVGR)?**

- SVGR requires a Vite plugin, adds build tooling complexity, and produces one module per icon. The JSON registry keeps the bundle a single import with all icons tree-shakeable at the JSON key level.

**Why not an SVG `<use>` sprite?**

- A `<use>` sprite works well for static pages but requires the sprite to be inlined in the HTML or served from the same origin. The JSON approach is self-contained and works in any deployment environment.

**Tradeoffs:**

| | JSON Registry | SVGR Components | `<img>` SVG | `<use>` Sprite |
|---|---|---|---|---|
| CSS `color` / `currentColor` | ✅ | ✅ | ❌ | ✅ |
| No extra build plugin | ✅ | ❌ (needs vite-plugin-svgr) | ✅ | ✅ |
| TypeScript icon names | ✅ (keyof registry) | ✅ | ❌ | ❌ |
| SSR-safe | ⚠️ (uses DOMParser) | ✅ | ✅ | ✅ |
| Tree-shaking | ✅ (JSON key) | ✅ (import) | ✅ | ❌ |

---

### Product Images — WebP Format

**Decision:** All product images in `public/cameras/`, `public/sensors/`, `public/accessories/`, and `public/plans/` use the `.webp` extension.

**Reasoning:**

- **File size:** WebP achieves 25–35% smaller file sizes than JPEG at equivalent visual quality, and 25–50% smaller than PNG for images with transparency. On a product page where users scroll through multiple cards, this has a measurable impact on first meaningful paint.
- **Browser support:** As of 2024, WebP is supported by 97%+ of global browsers (all modern Chrome, Firefox, Safari, Edge). There is no longer a meaningful case for shipping JPEG as the primary format.
- **Transparency support:** WebP supports an alpha channel (unlike JPEG), making product images on white or transparent backgrounds clean without requiring PNG's larger payload.
- **No server-side processing required:** Images are pre-converted to WebP at authoring time and served as static files from the `public/` directory — no on-the-fly conversion infrastructure needed.

---

### Required Item Business Rule — Wyze Sense Hub

**Context:** The Wyze Sense Hub is a gateway device required for any sensor to function. It is a zero-cost item included automatically whenever the user selects at least one sensor.

**Rule:** `wyze-sense-hub` quantity must be exactly `1` when any sensor is selected, and `0` when no sensors are selected.

**Implementation:** The rule lives in `enforceBusinessRules()` inside `src/context/BundleContext.tsx`, which runs as the **final step of every reducer action**:

```typescript
// BundleContext.tsx — runs after every dispatch
function enforceBusinessRules(state: BundleState): BundleState {
  // 1. Sum all sensor quantities (excluding the hub itself)
  const sensorProducts = bundleData.steps
    .flatMap((s) => s.products)
    .filter((p) => p.reviewCategory === "Sensors" && p.id !== "wyze-sense-hub");

  let totalSensors = 0;
  for (const product of sensorProducts) {
    // Variant-aware: sum across all colour variants of a sensor
    if (product.variants?.length) {
      for (const variant of product.variants) {
        totalSensors += state.selections[`${product.id}::${variant.id}`] ?? 0;
      }
    } else {
      totalSensors += state.selections[product.id] ?? 0;
    }
  }

  // 2. Hub qty is 1 if any sensor exists, 0 otherwise
  const newHubQty = totalSensors > 0 ? 1 : 0;

  if ((state.selections["wyze-sense-hub"] ?? 0) !== newHubQty) {
    return {
      ...state,
      selections: { ...state.selections, "wyze-sense-hub": newHubQty },
    };
  }
  return state;
}
```

**What this means for the UI:**

| User action | Hub behaviour |
|---|---|
| Adds first sensor | Hub appears in Review Panel as `(Required)` with qty `1`, FREE |
| Adds more sensors | Hub remains at qty `1` — not multiplied |
| Removes all sensors | Hub silently disappears from the Review Panel |
| Tries to decrement Hub in review panel | Stepper is disabled (`isRequired: true` → `disabled` prop on `QuantityStepper`) |

The hub is flagged `isRequired: true` in `products.ts`, which:
1. Disables the `−` stepper button on the review line item.
2. Appends `(Required)` to the name in the Review Panel.
3. Does **not** render on the product card grid — it only ever appears in the review.

This approach intentionally keeps business rules in one place (the reducer post-processor) rather than scattered across component `onClick` handlers. Adding a new constraint in future means adding one more check to `enforceBusinessRules`.

---

## What's Working

- ✅ 4-step accordion (expand/collapse, one active step at a time)
- ✅ Product cards with badges, variant selectors, quantity steppers, pricing
- ✅ Variant selection switches the stepper to that variant's independent quantity
- ✅ Live review panel with grouped sections (Cameras, Sensors, Accessories, Plan)
- ✅ Bidirectional stepper sync (card ↔ review panel quantities stay in sync)
- ✅ "N selected" counter per step header
- ✅ Real-time subtotal, compare-at total, and savings calculation
- ✅ "Save my system for later" → persists to `localStorage`, restores on reload
- ✅ Wyze Sense Hub auto-add/remove enforced by reducer business rule
- ✅ Responsive layout (desktop two-column sticky panel → mobile single-column)
- ✅ Keyboard navigation with `focus-visible` rings on all interactive elements
- ✅ Screen reader semantics (`aria-controls`, `role="list"`, `aria-live`, `aside`, etc.)
