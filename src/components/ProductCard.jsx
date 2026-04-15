/**
 * ProductCard
 * Displays a single product: image, category badge, title, description, and price.
 * Accepts an optional `style` prop for staggered animation delays.
 */
export default function ProductCard({ product, style }) {
  const { image, title, price, description, category, rating } = product

  // Truncate description to ~90 chars for a tidy card
  const shortDesc =
    description.length > 90 ? description.slice(0, 90).trimEnd() + '…' : description

  // Category label: capitalise first letter only
  const categoryLabel = category
    .split("'")[0]          // strip possessives
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  // Star rating display (filled / empty)
  const stars = Math.round(rating?.rate ?? 0)

  return (
    <article
      style={style}
      className="
        group flex flex-col bg-paper-card border border-paper-warm
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-lg
        transition-all duration-300 hover:-translate-y-1
        opacity-0 animate-fade-up
      "
    >
      {/* Image area */}
      <div className="relative bg-white flex items-center justify-center h-56 p-6 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            max-h-40 max-w-full object-contain
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Category badge */}
        <span
          className="
            absolute top-3 left-3
            text-[10px] font-mono uppercase tracking-widest
            bg-paper-warm text-ghost
            px-2.5 py-1 rounded-full
          "
        >
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Stars */}
        <div className="flex items-center gap-1" aria-label={`Rated ${rating?.rate} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < stars ? 'text-accent' : 'text-paper-warm'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          <span className="ml-1 text-xs font-mono text-ghost">
            ({rating?.count ?? 0})
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-base leading-snug text-ink line-clamp-2">
          {title}
        </h2>

        {/* Short description */}
        <p className="text-sm font-body text-ghost leading-relaxed flex-1">
          {shortDesc}
        </p>

        {/* Footer: price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-paper-warm">
          <span className="font-display text-xl text-ink">
            ${price.toFixed(2)}
          </span>

          <button
            className="
              text-sm font-body font-medium
              bg-ink text-paper-card
              px-4 py-2 rounded-lg
              hover:bg-accent
              transition-colors duration-200
              active:scale-95
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
