import api from "./axios";

// GET cart
export const fetchCart = () => api.get("/cart");

// ADD item
export const addItemToCart = (item) =>
  api.post("/cart/add", item);

// UPDATE quantity
export const updateCartItem = (name, quantity) =>
  api.patch("/cart/update", { name, quantity });

// REMOVE item
export const removeCartItem = (name) =>
  api.delete(`/cart/remove/${encodeURIComponent(name)}`);

// CLEAR cart
export const clearCart = () =>
  api.delete("/cart/clear");
