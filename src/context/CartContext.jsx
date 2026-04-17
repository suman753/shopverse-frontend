import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

/**
 * CartProvider manages shopping cart state.
 * Persists cart to localStorage.
 * Handles edge cases: duplicate items, min quantity, removal.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('shopverse_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopverse_cart', JSON.stringify(cart));
  }, [cart]);

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Add product to cart — if already exists, increase quantity by 1
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Increased "${product.title}" quantity`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`Added "${product.title}" to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [showToast]);

  // Remove product from cart entirely
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        showToast(`Removed "${item.title}" from cart`, 'info');
      }
      return prev.filter((i) => i.id !== productId);
    });
  }, [showToast]);

  // Update quantity — minimum 1, if set to 0 remove the item
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setCart((prev) => {
        const item = prev.find((i) => i.id === productId);
        if (item) {
          showToast(`Removed "${item.title}" from cart`, 'info');
        }
        return prev.filter((i) => i.id !== productId);
      });
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [showToast]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    showToast('Cart cleared', 'info');
  }, [showToast]);

  // Derived values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access cart state and actions.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
