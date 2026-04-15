import { useState, useEffect, useMemo } from 'react'

const API_URL = 'https://fakestoreapi.com/products'

/**
 * useProducts
 * Fetches all products from the Fake Store API and provides
 * a filtered list based on the search query.
 *
 * @param {string} query - The current search term
 * @returns {{ products, loading, error }}
 */
export function useProducts(query) {
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  // Fetch once on mount
  useEffect(() => {
    let cancelled = false   // prevent state update on unmounted component

    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(API_URL)

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        if (!cancelled) {
          setProducts(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    // Cleanup: ignore the response if the component unmounts mid-request
    return () => {
      cancelled = true
    }
  }, [])

  // Filter products client-side whenever `query` changes
  const filtered = useMemo(() => {
    if (!query.trim()) return products

    const q = query.toLowerCase()
    return products.filter((p) =>
      p.title.toLowerCase().includes(q)
    )
  }, [products, query])

  return { products: filtered, loading, error }
}
