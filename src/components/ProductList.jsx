import React from "react";
import ProductCard from './ProductCard'

/* ─── Skeleton card — shown while data loads ───────────────────────── */
function SkeletonCard() {
  return (
    <div className="flex flex-col bg-paper-card border border-paper-warm rounded-2xl overflow-hidden">
      <div className="shimmer h-56 w-full" />
      <div className="p-5 flex flex-col gap-3">
        <div className="shimmer h-3 w-16 rounded-full" />
        <div className="shimmer h-5 w-full rounded-lg" />
        <div className="shimmer h-4 w-3/4 rounded-lg" />
        <div className="shimmer h-4 w-1/2 rounded-lg" />
        <div className="flex justify-between items-center pt-3 border-t border-paper-warm">
          <div className="shimmer h-6 w-16 rounded-lg" />
          <div className="shimmer h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

/* ─── Empty / no-results state ─────────────────────────────────────── */
function EmptyState({ query }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="font-display text-2xl text-ink mb-2">No results found</h3>
      <p className="font-body text-ghost max-w-sm">
        We couldn't find anything matching{' '}
        <span className="font-medium text-ink">"{query}"</span>.{' '}
        Try a different keyword.
      </p>
    </div>
  )
}

/* ─── Error state ───────────────────────────────────────────────────── */
function ErrorState({ message, onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="font-display text-2xl text-ink mb-2">Something went wrong</h3>
      <p className="font-body text-ghost max-w-sm mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="
          font-body font-medium text-sm
          bg-accent text-white
          px-6 py-2.5 rounded-lg
          hover:bg-accent-dark transition-colors duration-200
        "
      >
        Try again
      </button>
    </div>
  )
}

/* ─── Main ProductList ──────────────────────────────────────────────── */
/**
 * ProductList
 * Renders the product grid with loading skeletons, error handling,
 * and an empty state for unmatched searches.
 */
export default function ProductList({ products, loading, error, query, onRetry }) {
  const gridClass = `
    grid gap-6
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
  `

  // Stagger delay helper: cycles through 8 slots
  const staggerStyle = (i) => ({
    animationDelay: `${(i % 8) * 0.05}s`,
  })

  if (error) {
    return (
      <div className={gridClass}>
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className={gridClass}>
        <EmptyState query={query} />
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          style={staggerStyle(i)}
        />
      ))}
    </div>
  )
}
