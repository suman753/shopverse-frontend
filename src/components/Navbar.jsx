import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiShoppingCart, HiBars3, HiXMark, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * Navbar with logo, nav links, cart icon with badge, and auth controls.
 * Responsive: hamburger menu on mobile.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-surface-900 hidden sm:block">
              Shop<span className="text-primary-600">Verse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-surface-600 hover:text-primary-600 transition-colors"
            >
              <HiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-surface-200">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-700">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-surface-700">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <HiArrowRightOnRectangle className="w-5 h-5" />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              className="relative p-2 text-surface-600 hover:text-primary-600 transition-colors"
            >
              <HiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-surface-600"
            >
              {mobileOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-surface-200 py-4 space-y-3 animate-slide-down">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
            >
              Cart ({cartCount})
            </Link>
            {user && (
              <div className="pt-3 border-t border-surface-100">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-surface-700">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
