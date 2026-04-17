import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HiStar, HiShoppingCart } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

/**
 * Reusable product card component.
 * Displays product image, title, price, rating, and add-to-cart button.
 */
function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="card group flex flex-col overflow-hidden animate-fade-in"
    >
      {/* Image */}
      <div className="relative bg-white p-6 flex items-center justify-center h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 badge bg-primary-50 text-primary-700 capitalize">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-surface-800 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <HiStar className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-surface-700">
              {product.rating.rate}
            </span>
          </div>
          <span className="text-xs text-surface-400">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Cart button */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-100">
          <span className="text-lg font-bold text-surface-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-lg bg-primary-50 text-primary-600 
                       hover:bg-primary-100 active:bg-primary-200
                       transition-colors duration-200"
            aria-label={`Add ${product.title} to cart`}
          >
            <HiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
