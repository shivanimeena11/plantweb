import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // load from localStorage once
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored.map(item => ({ ...item, quantity: Number(item.quantity || 1) })));
    } catch {
      setCart([]);
    }
  }, []);

  // persist whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // also dispatch an event for any non-context listeners (optional)
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: Number(p.quantity || 0) + Number(qty) } : p
        );
      }
      return [...prev, { ...product, quantity: Number(qty) || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const increaseQty = (id) => {
    setCart(prev => prev.map(p => (p.id === id ? { ...p, quantity: Number(p.quantity || 0) + 1 } : p)));
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const newQ = Math.max(1, Number(p.quantity || 1) - 1);
        return { ...p, quantity: newQ };
      })
    );
  };

  const setQuantity = (id, qty) => {
    setCart(prev => prev.map(p => (p.id === id ? { ...p, quantity: Math.max(1, Number(qty || 1)) } : p)));
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseQty,
      decreaseQty,
      setQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
