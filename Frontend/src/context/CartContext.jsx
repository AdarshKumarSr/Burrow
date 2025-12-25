import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cartApi";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Load cart on app start / refresh
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await fetchCart();
      setCart(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    try {
      const res = await addItemToCart(item);
      setCart(res.data.items);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const updateQuantity = async (name, quantity) => {
    try {
      const res = await updateCartItem(name, quantity);
      setCart(res.data.items);
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  const removeFromCart = async (name) => {
    try {
      const res = await removeCartItem(name);
      setCart(res.data.items);
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  const clearUserCart = async () => {
    await clearCart();
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
