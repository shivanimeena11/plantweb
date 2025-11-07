import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import ThankYouPopup from "../components/ThankYouPopup";

// Utility to clean currency
const sanitizePrice = (price) => Number(String(price).replace(/[^\d.]/g, "")) || 0;

const steps = [
  { label: "Personal", icon: "👤" },
  { label: "Shipping", icon: "🚚" },
  { label: "Payment", icon: "💳" },
];

// Demo options
const addressList = [
  "House No 123, Green Avenue",
  "Apt 45, Eco Residency",
  "23B, Flora Colony",
  "12, Main Street",
];
const cityList = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Kolkata",
];
const zipList = [
  "110001",
  "400001",
  "560001",
  "600001",
  "700001",
];
const paymentList = [
  "Debit/Credit Card",
  "UPI",
  "Cash on Delivery",
];
const couponList = [
  "GREEN10",
  "NEWUSER",
  "PLANTLOVER",
];

// Reusable dropdown w/filter-as-you-type
function DynamicDropdown({ name, value, options, onChange, placeholder }) {
  const [showOptions, setShowOptions] = useState(false);
  const filtered = value
    ? options.filter(
        (v) => v.toLowerCase().includes(value.toLowerCase())
      )
    : options;
  // Show the user’s typed text always as an option if no match
  const list = filtered.length > 0 ? filtered : [value];

  return (
    <div style={{ position: "relative", marginBottom: "1.3rem" }}>
      <motion.input
        whileFocus={{ scale: 1.03 }}
        type="text"
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 120)}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border-2 border-white/50 p-4 rounded-lg text-lg bg-white/80"
      />
      <AnimatePresence>
        {showOptions && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bg-white w-full rounded shadow-lg z-10 max-h-44 overflow-auto border"
          >
            {list.map((option, idx) => (
              <li
                key={idx}
                onMouseDown={() => onChange(name, option)}
                className="p-3 hover:bg-emerald-50 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const sectionAnim = {
  initial: { opacity: 0, y: 34 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.79 } },
  exit: { opacity: 0, y: -34, transition: { duration: 0.27 } }
};

const cardAnim = {
  initial: { opacity: 0, scale: 0.97, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.44 } },
  exit: { opacity: 0, scale: 0.92, y: 25, transition: { duration: 0.12 } }
};

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    payment: "",
    coupon: "",
  });

  const [discount, setDiscount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [localCart, setLocalCart] = useState([...cart]);
  const updateLocalCart = (items) => setLocalCart(items);
  const total = localCart.reduce((sum, item) => sum + sanitizePrice(item.price) * Number(item.quantity || 1), 0);
  const discountedTotal = Math.max(0, total - discount);

  // Handle special field dropdowns
  function handleFieldChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const applyCoupon = () =>
    setDiscount(form.coupon.trim().toUpperCase() === "GREEN10" ? total * 0.15 : 0);

  const handleRemovePlant = (id) =>
    updateLocalCart(localCart.filter((item) => item.id !== id));
  const handleConfirm = () => {
    clearCart();
    setShowPopup(true);
  };

  const inputFocus =
    "focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 backdrop-blur";

  return (
    <div
      className="relative font-lora min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/checkout.jpg')" }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-emerald-100/0 via-white/40 to-emerald-50/70 transition-all duration-300 ${
          showPopup ? "opacity-60" : "opacity-100"
        }`}
      ></div>

      {!showPopup && (
        <div className="relative z-10">
          <Navbar />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.08, type: "spring" }}
            className="max-w-3xl mx-auto px-4 py-12 md:py-20"
          >
            <motion.h1
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.56 }}
              className="text-5xl md:text-6xl font-extrabold mt-5 text-white mb-10 text-center drop-shadow-lg"
            >
              Checkout
            </motion.h1>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="flex justify-center mt-2 mb-11 gap-4"
            >
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  layout
                  className={`flex-1 flex flex-col items-center py-3 px-1 rounded-2xl font-bold text-lg border-2 bg-white/60 backdrop-blur-sm shadow
                    duration-200 ${step - 1 === i ? "border-emerald-400 text-emerald-700 shadow-md scale-105" : "border-gray-200 text-gray-500"}`}
                  whileHover={step - 1 !== i ? { scale: 1.05 } : {}}
                  transition={{ type: "spring", stiffness: 360, damping: 29 }}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Step Forms */}
            <motion.div layout className="bg-white/70 border-4 border-white rounded-3xl shadow-xl px-10 py-12 relative backdrop-blur-lg">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="step1" {...sectionAnim}>
                    <h2 className="font-bold text-2xl mb-7 text-emerald-700 tracking-wide">Personal Details</h2>
                    <motion.input
                      whileFocus={{ scale: 1.03 }}
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border-2 border-white/50 p-4 rounded-lg text-lg mb-2 ${inputFocus}`}
                    />
                    <motion.input
                      whileFocus={{ scale: 1.03 }}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full border-2 border-white/50 p-4 rounded-lg text-lg ${inputFocus}`}
                    />
                    <div className="flex justify-center mt-7">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep(2)}
                        className="px-7 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-md border border-emerald-600 transition-colors duration-200 hover:bg-emerald-500 hover:text-white"
                      >
                        Next: Shipping
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="step2" {...sectionAnim}>
                    <h2 className="font-bold text-2xl mb-7 text-emerald-700 tracking-wide">Shipping Address</h2>

                    <DynamicDropdown
                      name="address"
                      value={form.address}
                      options={addressList}
                      onChange={handleFieldChange}
                      placeholder="Select or type Address"
                    />
                    <DynamicDropdown
                      name="city"
                      value={form.city}
                      options={cityList}
                      onChange={handleFieldChange}
                      placeholder="Select or type City"
                    />
                    <DynamicDropdown
                      name="zip"
                      value={form.zip}
                      options={zipList}
                      onChange={handleFieldChange}
                      placeholder="Select or type Postal Code"
                    />
                    <div className="flex justify-center mt-7">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep(3)}
                        className="px-7 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-md border border-emerald-600 transition-colors duration-200 hover:bg-emerald-500 hover:text-white"
                      >
                        Next: Payment
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div key="step3" {...sectionAnim}>
                    <h2 className="font-bold text-2xl mb-7 text-emerald-700 tracking-wide">Payment Details</h2>
                    <DynamicDropdown
                      name="payment"
                      value={form.payment}
                      options={paymentList}
                      onChange={handleFieldChange}
                      placeholder="Select or type Payment Method"
                    />
                    <div className="flex gap-2 items-center">
                      <DynamicDropdown
                        name="coupon"
                        value={form.coupon}
                        options={couponList}
                        onChange={handleFieldChange}
                        placeholder="Select or type Coupon"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={applyCoupon}
                        className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold shadow border border-emerald-200 transition-colors duration-200 hover:bg-emerald-200 hover:text-emerald-800"
                      >
                        Apply
                      </motion.button>
                    </div>
                    {discount > 0 && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="text-emerald-600 font-bold my-3 text-lg"
                      >
                        Discount Applied: -₹{discount.toFixed(2)}
                      </motion.p>
                    )}

                    {/* CART SUMMARY */}
                    <motion.div
                      layout
                      initial={{ scale: 0.97, opacity: 0.87 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white/90 border border-emerald-100 rounded-2xl p-7 mt-6 shadow-lg"
                    >
                      <h2 className="font-bold text-lg mb-5 text-emerald-700">Order Summary</h2>
                      {localCart.length === 0 ? (
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-10 text-lg text-gray-400 font-semibold"
                        >
                          No plants in your order!
                        </motion.p>
                      ) : (
                        <ul className="mb-4 space-y-4 max-h-64 overflow-auto">
                          <AnimatePresence>
                            {localCart.map((item) => (
                              <motion.li
                                key={item.id}
                                {...cardAnim}
                                layout
                                className="flex items-center justify-between p-4 rounded-xl bg-white/80 border shadow hover:shadow-md transition-all"
                              >
                                <div className="flex items-center gap-4">
                                  <motion.img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-14 h-14 object-cover rounded-xl border shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                  />
                                  <div>
                                    <h3 className="text-base font-bold text-gray-700">{item.name}</h3>
                                    <div className="flex gap-2 items-center mt-1">
                                      <span className="text-emerald-700 font-bold text-base">₹{sanitizePrice(item.price)}</span>
                                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                                    </div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.05, backgroundColor: "#f8e7e5" }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleRemovePlant(item.id)}
                                  className="px-3 py-1 bg-white/90 border border-red-400 text-red-500 rounded-full font-semibold shadow hover:bg-red-50 transition"
                                >
                                  Remove
                                </motion.button>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      )}
                      <div className="flex justify-between font-extrabold text-2xl mt-6 border-t pt-4">
                        <span>Total</span>
                        <span>₹{discountedTotal.toFixed(2)}</span>
                      </div>
                    </motion.div>
                    <div className="flex justify-center mt-10">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleConfirm}
                        className={`px-9 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg shadow-md border border-emerald-600 transition-colors duration-200 hover:bg-emerald-500 hover:text-white ${
                          localCart.length === 0 ? "opacity-60 pointer-events-none" : ""
                        }`}
                      >
                        Confirm & Place Order
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* BACK BUTTON */}
            <div className="mt-16 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/cart")}
                className="px-7 py-3 bg-white text-emerald-700 font-semibold rounded-full shadow-md border border-emerald-400 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                ← Back to Cart
              </motion.button>
            </div>
          </motion.div>
          <Footer />
        </div>
      )}

      {/* Thank You Popup */}
      <AnimatePresence>
        {showPopup && (
          <ThankYouPopup
            onClose={() => {
              setShowPopup(false);
              navigate("/");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;
