import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { HiShoppingBag } from 'react-icons/hi2';

const PRODUCTS_PER_PAGE = 8;

/**
 * Home page — product listing with search, category filter, and pagination.
 * Fetches all products once, filters locally.
 */
export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search value
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch products and categories once on mount
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  // Filter products by search + category (memoized)
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, selectedCategory, debouncedSearch]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="skeleton h-10 w-64 rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>
        <Loader count={8} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
          Products
        </h1>
        <p className="text-surface-500">
          Discover {products.length} items across {categories.length} categories
        </p>
      </div>

      {/* Search + Filter */}
      <div className="space-y-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-surface-500">
        Showing {paginatedProducts.length} of {filteredProducts.length} products
        {debouncedSearch && (
          <span>
            {' '}for "<span className="font-medium text-surface-700">{debouncedSearch}</span>"
          </span>
        )}
        {selectedCategory && (
          <span>
            {' '}in <span className="font-medium text-surface-700 capitalize">{selectedCategory}</span>
          </span>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mb-4">
            <HiShoppingBag className="w-8 h-8 text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">
            No products found
          </h3>
          <p className="text-surface-500 text-center max-w-sm">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="btn-secondary mt-4"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
