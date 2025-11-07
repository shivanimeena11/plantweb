import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BlogSection from "./BlogSection";
import { Star, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import plantsData from "../data/plants2.json";
import { useCart } from "../context/CartContext";

// Utility favorites functions
const loadFavorites = () => JSON.parse(localStorage.getItem("favorites") || "[]");
const saveFavorites = (arr) => localStorage.setItem("favorites", JSON.stringify(arr));

// 🌿 Wavy Line
const WavyLine = ({ color }) => (
  <svg className="w-full h-4" viewBox="0 0 180 18" fill="none">
    <motion.path
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M0 9.5C30 1.5 60 17.5 90 9.5C120 1.5 150 17.5 180 9.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

// ✅ Popup Wrapper (fixed spacing and layout)
const PopupWrapper = ({ children }) => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 70, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-72 rounded-2xl bg-white shadow-2xl px-5 py-4 flex flex-col items-start justify-center space-y-2 select-none border border-gray-100"
    style={{
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    }}
  >
    {children}
  </motion.div>
);

// ✅ Add To Cart Popup (compact version)
const AddToCartPopup = () => (
  <PopupWrapper>
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 12, -12, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <Heart size={26} className="fill-green-600 text-green-600" />
      </motion.div>
      <span className="font-bold text-gray-900 text-lg">Added to Cart!</span>
    </div>
    <div className="w-full mt-1">
      <WavyLine color="#22c55e" />
    </div>
  </PopupWrapper>
);

// ✅ Favorites Popup (same spacing fix)
const FavoritesPopup = ({ added }) => (
  <PopupWrapper>
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, added ? -12 : 12, added ? 12 : -12, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <Heart
          size={26}
          className={added ? "fill-red-600 text-red-600" : "fill-gray-400 text-gray-400"}
        />
      </motion.div>
      <span className="font-bold text-gray-900 text-lg">
        {added ? "Added to Favorites!" : "Removed from Favorites!"}
      </span>
    </div>
    <div className="w-full mt-1">
      <WavyLine color={added ? "#ef4444" : "#9ca3af"} />
    </div>
  </PopupWrapper>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [cartPopups, setCartPopups] = useState([]);
  const [favPopups, setFavPopups] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const selectedPlant = plantsData.find((p) => p.id === parseInt(id, 10));
    setPlant(selectedPlant);
    if (selectedPlant) setMainImg(selectedPlant.img);

    const favs = loadFavorites();
    setLiked(selectedPlant ? favs.includes(selectedPlant.id) : false);
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) return null;

  const images = [plant.img, plant.imgHover, plant.img1].filter(Boolean);

  const handleLike = () => {
    let favs = loadFavorites();
    const popupId = Date.now() + Math.random();

    if (liked) {
      favs = favs.filter((fid) => fid !== plant.id);
      setLiked(false);
      setFavPopups((prev) => [...prev, { id: popupId, added: false }]);
    } else {
      favs.push(plant.id);
      setLiked(true);
      setFavPopups((prev) => [...prev, { id: popupId, added: true }]);
    }
    saveFavorites(favs);
    window.dispatchEvent(new Event("favoritesUpdated"));

    setTimeout(() => {
      setFavPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 3000);
  };

  const handleAddToCart = () => {
    addToCart({ ...plant }, quantity);
    const popupId = Date.now() + Math.random();
    setCartPopups((prev) => [...prev, { id: popupId }]);
    setTimeout(() => {
      setCartPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-green-100 via-white to-lime-50">
      <Navbar />

      {/* ✅ Popups fixed and aligned properly */}
      <div className="fixed mt-20 right-6 z-[99] flex flex-col items-end space-y-3 pointer-events-none">
        <AnimatePresence>
          {cartPopups.map((p) => (
            <AddToCartPopup key={p.id} />
          ))}
          {favPopups.map((p) => (
            <FavoritesPopup key={p.id} added={p.added} />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Section */}
      <main className="flex-grow max-w-8xl mx-auto mt-20 px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left - Image Section */}
        <motion.section
          className="flex flex-col items-center mt-5 justify-start relative"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={mainImg}
              src={mainImg}
              alt={plant.name}
              className="w-full max-w-[600px] rounded-3xl shadow-2xl border mb-5 object-cover aspect-square"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex gap-6 mt-6 flex-wrap justify-center">
            {images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`thumb${idx}`}
                className={`w-[140px] h-[130px] object-cover rounded-xl border-2 cursor-pointer transition-transform ${
                  mainImg === img
                    ? "ring-4 ring-green-400 scale-105"
                    : "hover:ring-2 hover:ring-green-200 hover:scale-105"
                }`}
                onClick={() => setMainImg(img)}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
          </div>
        </motion.section>

        {/* Right - Content Section */}
        <motion.section
          className="flex flex-col mt-10 md:mt-20"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-green-800">
            {plant.name}
          </motion.h1>
          <WavyLine color="#22c55e" />

          <div className="flex items-center gap-4 mt-3">
            <span className="text-3xl font-bold text-green-700">₹{plant.price}</span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={21}
                  fill={i < plant.rating ? "currentColor" : "rgb(212, 175, 55)"}
                  stroke="none"
                />
              ))}
            </div>
          </div>

          <p className="mt-5 mb-10 mr-4 leading-relaxed text-black text-lg">
            This stunning plant adds a touch of nature and elegance to any space. Its vibrant green
            leaves purify the air and uplift your home ambiance.
            <br />
            <br />
            <span className="text-green-700 text-2xl font-serif italic leading-relaxed">
              Easy to care for, it thrives even for beginners. Perfect for cozy corners, desks, or
              living rooms, bringing freshness and positivity. A natural beauty that complements
              every decor effortlessly.
            </span>
          </p>

          {/* Info Cards */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { label: "🌱 Family", value: plant.family || "Sansevieria", bg: "bg-green-100" },
              { label: "🌍 Origin", value: plant.origin || "Tanzania", bg: "bg-yellow-100" },
              { label: "🌿 Type", value: plant.category || "Succulent", bg: "bg-lime-100" },
              { label: "💧 Watering", value: plant.watering || "Once a week", bg: "bg-blue-100" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.bg} border border-gray-200 rounded-2xl shadow-sm p-4 min-w-[140px] hover:shadow-lg hover:border-green-400 transition-all duration-300`}
              >
                <h5 className="font-bold text-lg md:text-xl mb-1 text-gray-800">{item.label}:</h5>
                <p className="text-md md:text-lg text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-6 mt-20">
            <div className="flex items-center border rounded-lg h-12 pr-3 bg-gray-50 select-none">
              <button
                className="px-4 text-lg font-bold hover:text-green-700"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-6 text-lg font-semibold">{quantity}</span>
              <button
                className="px-4 text-lg font-bold hover:text-green-700"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <motion.button
              className="px-10 py-4 bg-green-700 text-white rounded-2xl  font-semibold shadow-lg hover:shadow-xl flex gap-2 items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.section>
      </main>

      <BlogSection />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
