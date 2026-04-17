import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import ErrorMessage from '../components/ErrorMessage';
import { HiStar, HiShoppingCart, HiArrowLeft, HiCheck } from 'react-icons/hi2';

/**
 * Product details page.
 * Fetches a single product by ID from the URL params.
 */
export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const isInCart = cart.some((item) => item.id === Number(id));

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProduct(id);
      setProduct(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load product.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="skeleton h-6 w-24 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="skeleton h-96 w-full rounded-xl" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-8 w-full rounded" />
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-6 w-32 rounded" />
            <div className="skeleton h-20 w-full rounded" />
            <div className="skeleton h-12 w-48 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={fetchProduct} />
      </div>
    );
  }

  if (!product) return null;

  // Generate star rating
  const fullStars = Math.floor(product.rating.rate);
  const hasHalfStar = product.rating.rate % 1 >= 0.5;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors mb-8"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="card p-8 flex items-center justify-center bg-white min-h-[320px]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 max-w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {/* Category */}
          <span className="badge bg-primary-50 text-primary-700 capitalize mb-4 self-start">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-4 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < fullStars
                      ? 'text-amber-400'
                      : i === fullStars && hasHalfStar
                      ? 'text-amber-300'
                      : 'text-surface-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-surface-700">
              {product.rating.rate}
            </span>
            <span className="text-sm text-surface-400">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-surface-900 mb-6">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-surface-700 uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-surface-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-200">
            <button
              onClick={handleAddToCart}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium
                transition-all duration-200
                ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
                }
              `}
            >
              {added ? (
                <>
                  <HiCheck className="w-5 h-5" />
                  Added!
                </>
              ) : (
                <>
                  <HiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
            {isInCart && !added && (
              <Link
                to="/cart"
                className="btn-secondary text-center"
              >
                View Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
