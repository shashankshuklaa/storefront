import React from "react";
/**
 * SearchBar
 * Controlled text input that calls `onChange` on every keystroke.
 * The parent (App) owns the query state — this component is "dumb" by design.
 */
export default function SearchBar({ value, onChange, total, filtered }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input wrapper */}
      <div className="relative group">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ghost
                     group-focus-within:text-accent transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M16.5 16.5l4 4" />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          className="
            w-full pl-12 pr-12 py-3.5
            bg-paper-card border border-paper-warm
            rounded-xl font-body text-ink placeholder-ghost
            shadow-sm
            focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
            transition-all duration-200
          "
        />

        {/* Clear button — only shown when there's text */}
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              w-6 h-6 flex items-center justify-center
              rounded-full bg-paper-warm text-ghost
              hover:bg-accent hover:text-white
              transition-all duration-150
            "
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count — only show when actively searching */}
      {value.trim() && (
        <p className="mt-2.5 text-center text-sm font-body text-ghost">
          {filtered === 0
            ? 'No products match your search.'
            : `Showing ${filtered} of ${total} products`}
        </p>
      )}
    </div>
  )
}
