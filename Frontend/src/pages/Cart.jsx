import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 items-center border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.name, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 border rounded"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.name, item.quantity + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">
                Total: ₹{total}
              </p>

              <button className="bg-teal-500 text-white px-6 py-3 rounded hover:bg-teal-600">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
