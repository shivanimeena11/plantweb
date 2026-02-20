import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/cartContext";

const sanitizePrice = (price) => Number(String(price).replace(/[^\d.]/g, "")) || 0;

const BouncyPlant = () => (
  <motion.div
    initial={{ y: 0, scale: 1 }}
    animate={{ y: [0, -16, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 1.6, repeat: Infinity }}
    className="flex justify-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 text-green-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 2.21 0 8.25 0 8.25s-1.5-1.125-1.5-2.625c0-.322-.231-1.266-.674-1.816M12 3c.58.456 1 2 1 2s1.5-1.125 1.5-2.625c0-.322.146-1.375.146-1.375" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75c4.5-1.5 6-6 6-6S14.25 10 13.5 8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5c1.5 1.5 3.75 2.25 6 2.25 4.5 0 6-6 6-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 19.5a8.25 8.25 0 0112 0" />
    </svg>
  </motion.div>
);

const RemovePopup = () => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 70, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-64 rounded-3xl shadow-xl bg-white mt-28 flex flex-col items-center px-6 py-4 mb-4 select-none"
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 8px 40px rgba(0,0,0,0.1)" }}
  >
    <div className="flex items-center gap-3 mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span className="font-semibold text-lg text-gray-700">Item removed from cart</span>
    </div>
    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: 0 }}
      transition={{ duration: 4, ease: "linear" }}
      className="h-1 bg-red-400 rounded-full w-full"
    />
  </motion.div>
);

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();
  const [popups, setPopups] = useState([]);

  const total = cart.reduce(
    (sum, item) => sum + sanitizePrice(item.price) * Number(item.quantity || 1),
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
    const popupId = Date.now() + Math.random();
    setPopups((prev) => [...prev, { id: popupId }]);
    setTimeout(() => setPopups((prev) => prev.filter((p) => p.id !== popupId)), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />

      {/* Popups */}
      <div className="fixed top-8 right-8 z-[99] flex flex-col items-end pointer-events-none space-y-1">
        <AnimatePresence>
          {popups.map((p) => (
            <RemovePopup key={p.id} />
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 mt-6 md:mt-10">
        <div className="mb-3 mt-10 flex items-center space-x-2">
          <span className="text-xl">🌱</span>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Your Cart</h1>
        </div>

        <div className="flex justify-between items-center mb-8 mt-6">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.09, x: -3 }}
            className="px-3 py-1 bg-green-700 rounded shadow text-white font-medium"
          >
            ← Back
          </motion.button>
          {cart.length > 0 && (
            <motion.button
              onClick={() => clearCart()}
              whileHover={{ scale: 1.09, x: 3 }}
              className="px-4 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 transition font-medium"
            >
              Clear All
            </motion.button>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-20 text-center">
            <BouncyPlant />
            <p className="text-lg text-gray-500 mb-2 font-semibold mt-4">Your cart is empty!</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm text-green-600 mb-1"
            >
              Jungle missing... Add some green friends!
            </motion.p>
            <motion.p initial={{ y: 7, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.36 }} className="text-xs text-gray-400">
              🪴 Start exploring new plants from the shop!
            </motion.p>
          </motion.div>
        ) : (
          <ul className="space-y-5 mb-8">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97, x: -30, transition: { duration: 0.22 } }}
                  transition={{ type: "spring", duration: 0.32 }}
                  className="flex justify-between items-center border p-4 rounded-xl shadow bg-white hover:shadow-xl transition"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg border bg-gray-50" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                      <p className="text-green-600 font-bold text-base">₹{sanitizePrice(item.price)}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => decreaseQty(item.id)}
                          className="px-3 py-1 bg-gray-300 rounded shadow-sm hover:bg-gray-400 transition text-lg"
                        >
                          -
                        </motion.button>
                        <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => increaseQty(item.id)}
                          className="px-3 py-1 bg-gray-300 rounded shadow-sm hover:bg-gray-400 transition text-lg"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition font-semibold"
                  >
                    Remove
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`mt-6 bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-end md:flex-row md:items-center md:justify-between transition-all duration-300 ${cart.length === 0 ? "opacity-60 pointer-events-none" : ""
            }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Total Amount */}
          <h2 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-4 md:mb-0">
            Total: ₹{total.toFixed(2)}
          </h2>

          {/* Checkout Info & Button */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            {/* Message */}
            <span className="text-gray-700 font-medium text-base md:text-lg text-center md:text-left">
              🌿 Order plants with love, get fast doorstep delivery!
            </span>
            <motion.button
              whileHover={{ scale: 1.03, y: -1, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
              disabled={cart.length === 0}
              onClick={() => navigate("/checkout")}
              className={`px-6 py-3 font-semibold text-lg rounded-lg shadow-md focus:outline-none transition-all duration-300 ${cart.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
            >
              Checkout &rarr;
            </motion.button>

          </div>
        </motion.div>


        <motion.div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-500 transition text-lg"
          >
            Return to Shop
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
