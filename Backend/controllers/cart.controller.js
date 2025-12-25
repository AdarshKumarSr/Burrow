const Cart = require("../models/cart.js");

/**
 * GET /cart
 */
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.json({ items: [], total: 0 });
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.json({ items: cart.items, total });
};

/**
 * POST /cart/add
 */
const addToCart = async (req, res) => {
  const { name, price, quantity = 1, image, doctor } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ name, price, quantity, image, doctor }],
    });
  } else {
    const item = cart.items.find((i) => i.name === name);

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ name, price, quantity, image, doctor });
    }
  }

  await cart.save();
  res.json(cart);
};

/**
 * PATCH /cart/update
 */
const updateCartItem = async (req, res) => {
  const { name, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.name === name);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
};

/**
 * DELETE /cart/remove/:name
 */
const removeCartItem = async (req, res) => {
  const { name } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.name !== name);
  await cart.save();

  res.json(cart);
};

/**
 * DELETE /cart/clear
 */
const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
