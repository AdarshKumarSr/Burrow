import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart, total, updateQuantity, removeFromCart, loading } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (cart.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-semibold text-lg">Your Cart</h3>

      {cart.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">₹{item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.name, Number(e.target.value))
            }
            className="w-16 border px-2 py-1"
          />

          <button
            onClick={() => removeFromCart(item.name)}
            className="text-red-500 text-xs"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button className="w-full bg-teal-500 text-white py-2 rounded">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
