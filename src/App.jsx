import { useState, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'

/* ─── Header ─────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="border-b border-paper-warm bg-paper-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded-md flex items-center justify-center">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <span className="font-display text-xl text-ink tracking-tight">Storefront</span>
        </div>

        {/* Nav hint */}
        <span className="hidden sm:block font-mono text-xs text-ghost uppercase tracking-widest">
          Premium Catalogue
        </span>
      </div>
    </header>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
function Hero({ query, onChange, total, filtered }) {
  return (
    <section className="py-14 sm:py-20 text-center px-4">
      {/* Eyebrow */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
        Curated Collection
      </p>

      {/* Headline */}
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight mb-4">
        Find What You<br className="hidden sm:block" /> Love
      </h1>

      {/* Sub-headline */}
      <p className="font-body text-ghost max-w-md mx-auto mb-10 text-lg">
        Browse our full catalogue of handpicked products across every category.
      </p>

      {/* Search */}
      <SearchBar
        value={query}
        onChange={onChange}
        total={total}
        filtered={filtered}
      />
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-paper-warm mt-20 py-8 text-center">
      <p className="font-mono text-xs text-ghost uppercase tracking-widest">
        Powered by{' '}
        <a
          href="https://fakestoreapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Fake Store API
        </a>
        {' '}· Built with React + Tailwind
      </p>
    </footer>
  )
}

/* ─── App (root) ──────────────────────────────────────────────────────── */
export default function App() {
  const [query, setQuery] = useState('')

  // Wrap in useCallback so SearchBar / Hero don't re-render unnecessarily
  const handleSearch = useCallback((val) => setQuery(val), [])

  // All data logic lives in this custom hook
  const { products, loading, error } = useProducts(query)

  // For the retry button: reset query and re-mount hook triggers re-fetch
  // We achieve a re-fetch by keeping a key that changes on retry
  const [retryKey, setRetryKey] = useState(0)
  const handleRetry = () => {
    setQuery('')
    setRetryKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Hero
          query={query}
          onChange={handleSearch}
          total={loading ? 0 : products.length + (query ? 0 : 0)}
          filtered={products.length}
        />

        {/* Section label */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink">
              {query ? 'Search Results' : 'All Products'}
            </h2>
            {!query && (
              <span className="font-mono text-xs text-ghost uppercase tracking-widest">
                {products.length} items
              </span>
            )}
          </div>
        )}

        <ProductList
          key={retryKey}
          products={products}
          loading={loading}
          error={error}
          query={query}
          onRetry={handleRetry}
        />
      </main>

      <Footer />
    </div>
  )
}
