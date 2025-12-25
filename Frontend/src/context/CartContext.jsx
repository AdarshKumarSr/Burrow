import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cartApi";

import toast from "react-hot-toast"; // ✅ ADD

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // ================= ADD TO CART =================
  const addToCart = async (item) => {
    try {
      const res = await addItemToCart({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        doctor: item.doctor,
      });

      setCart(res.data.items);
      setTotal(res.data.total);

      toast.success(`${item.name} added to cart 🛒`);
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error(err);
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (name, quantity) => {
    try {
      const res = await updateCartItem(name, quantity);
      setCart(res.data.items);
      setTotal(res.data.total);

      toast.success("Cart updated");
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ================= REMOVE ITEM =================
  const removeFromCart = async (name) => {
    try {
      const res = await removeCartItem(name);
      setCart(res.data.items);
      setTotal(res.data.total);

      toast("Item removed", { icon: "🗑️" });
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // ================= CLEAR CART =================
  const clearUserCart = async () => {
    try {
      await clearCart();
      setCart([]);
      setTotal(0);

      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
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
