const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");

const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authUser, getCart);
router.post("/add", authUser, addToCart);
router.patch("/update", authUser, updateCartItem);
router.delete("/remove/:name", authUser, removeCartItem);
router.delete("/clear", authUser, clearCart);

module.exports = router;
