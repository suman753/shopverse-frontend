import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { HiPlus, HiMinus, HiTrash, HiArrowLeft, HiShoppingBag } from 'react-icons/hi2';

/**
 * Cart page — shows all cart items with quantity controls and total.
 */
export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center mb-6">
            <HiShoppingBag className="w-10 h-10 text-surface-400" />
          </div>
          <h2 className="text-2xl font-bold text-surface-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-surface-500 mb-8">
            Looks like you haven't added any products yet.
          </p>
          <Link to="/" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
            Shopping Cart
          </h1>
          <p className="text-surface-500 mt-1">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="btn-danger text-sm"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 animate-fade-in"
          >
            {/* Image */}
            <Link
              to={`/product/${item.id}`}
              className="w-full sm:w-24 h-24 bg-white rounded-lg border border-surface-100 flex items-center justify-center p-2 shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link
                to={`/product/${item.id}`}
                className="text-sm font-semibold text-surface-800 hover:text-primary-600 transition-colors line-clamp-2"
              >
                {item.title}
              </Link>
              <p className="text-xs text-surface-400 capitalize mt-1">
                {item.category}
              </p>
              <p className="text-sm font-medium text-surface-500 mt-1">
                {formatPrice(item.price)} each
              </p>
            </div>

            {/* Quantity + Remove */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
              {/* Quantity controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-surface-100 hover:bg-surface-200 
                             flex items-center justify-center transition-colors
                             text-surface-600"
                  aria-label="Decrease quantity"
                >
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-surface-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-surface-100 hover:bg-surface-200 
                             flex items-center justify-center transition-colors
                             text-surface-600"
                  aria-label="Increase quantity"
                >
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Subtotal + Remove */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span className="text-base font-bold text-surface-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-surface-400 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-surface-900 mb-4">
          Order Summary
        </h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-surface-500">Subtotal</span>
            <span className="font-medium text-surface-700">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-surface-500">Shipping</span>
            <span className="font-medium text-emerald-600">Free</span>
          </div>
          <div className="border-t border-surface-200 pt-3">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-surface-900">Total</span>
              <span className="text-xl font-bold text-surface-900">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>
        </div>
        <button className="btn-primary w-full text-center">
          Proceed to Checkout
        </button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mt-3 text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
