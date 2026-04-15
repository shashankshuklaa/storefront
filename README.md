# 🛍️ Storefront

A responsive single-page application built with **React (Vite)** and **Tailwind CSS** that fetches and displays products from the [Fake Store API](https://fakestoreapi.com).

---

## ✨ Features

- **Live Product Catalogue** — fetches 20 products from the Fake Store API
- **Instant Search** — filter products by title in real time
- **Skeleton Loading** — smooth shimmer cards while data loads
- **Error Handling** — friendly error state with a retry button
- **Empty State** — helpful message when no results match
- **Responsive Grid** — 1 → 2 → 3 → 4 columns across breakpoints
- **Accessible** — proper `aria-label` attributes and semantic HTML
- **Modern UI** — editorial aesthetic with custom fonts, micro-animations, and a warm colour palette

---

## 🗂 Project Structure

```
storefront/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx    # Single product card
│   │   ├── ProductList.jsx    # Grid + loading / error / empty states
│   │   └── SearchBar.jsx      # Controlled search input
│   ├── hooks/
│   │   └── useProducts.js     # Data fetching + client-side filtering
│   ├── App.jsx                # Root component (Header, Hero, Footer)
│   ├── index.css              # Tailwind imports + custom utilities
│   └── main.jsx               # React entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/storefront.git
cd storefront

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # serves the built output locally
```

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite and sets the correct build settings.

### Option B — Vercel Dashboard (no CLI needed)

1. Push your code to a GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import your repository.
4. Vercel auto-fills these settings — leave them as-is:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Done! 🎉

> The included `vercel.json` ensures all routes resolve to `index.html` for correct SPA behaviour.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI library |
| [Vite 5](https://vitejs.dev) | Dev server & bundler |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Fake Store API](https://fakestoreapi.com) | Product data |

---

## 🧩 How It Works

### Data Fetching (`useProducts.js`)

A custom hook uses `useEffect` to fetch from the API once on mount. A cleanup flag (`cancelled`) prevents state updates if the component unmounts mid-request — a common React best practice. The hook also uses `useMemo` to re-filter products on the client side every time the search query changes, avoiding redundant API calls.

### Search (`SearchBar.jsx` + `App.jsx`)

The search query is owned by `App` (single source of truth). `SearchBar` is a controlled, "dumb" component that only fires `onChange`. `ProductList` receives the already-filtered array — it doesn't know about the search logic at all.

### Loading State (`ProductList.jsx`)

While `loading === true`, 8 skeleton cards render with a shimmer animation powered by a CSS `background: linear-gradient` trick. Once data arrives, real cards fade-in with staggered animation delays.

### Error State

If the fetch fails (network error, bad status), the hook sets an `error` string. `ProductList` renders a friendly error card with a **Try again** button that resets state and triggers a fresh fetch via a `retryKey` counter in `App`.

---

## 📄 License

MIT — free to use, modify, and distribute.
