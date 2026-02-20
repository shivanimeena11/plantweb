import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

// Wavy Line animation
const WavyLine = ({ color }) => (
  <svg
    className="w-full h-3"
    viewBox="0 0 180 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

// Popup wrapper
const PopupWrapper = ({ children, position }) => (
  <motion.div
    initial={{ x: position === "right" ? 64 : -64, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: position === "right" ? 70 : -70, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="max-w-xs w-full rounded-3xl shadow-xl bg-white flex flex-col px-6 py-4 select-none"
    style={{
      marginBottom: "18px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 8px 40px rgba(0,0,0,0.10)",
    }}
  >
    {children}
  </motion.div>
);

// Add to Cart popup
const AddToCartPopup = () => (
  <PopupWrapper position="right">
    <div className="flex items-center gap-3 mb-1">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 12, -12, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        className="flex items-center justify-center overflow-hidden"
      >
        <Heart size={28} className="fill-red-600 text-red-600" />
      </motion.div>
      <span className="font-extrabold text-black text-lg tracking-wide">
        Added to Cart!
      </span>
    </div>
    <WavyLine color="#FF0000" />
  </PopupWrapper>
);

// Favorites popup
const FavoritesPopup = ({ added }) => (
  <PopupWrapper position={added ? "right" : "left"}>
    <div className="flex items-center gap-3 mb-1">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, added ? -12 : 12, added ? 12 : -12, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        className="flex items-center justify-center"
      >
        <Heart
          size={28}
          className={
            added
              ? "fill-green-600 text-green-600"
              : "fill-red-600 text-red-600"
          }
        />
      </motion.div>
      <span className="font-extrabold text-black text-lg tracking-wide">
        {added ? "Added to Favorites!" : "Removed from Favorites!"}
      </span>
    </div>
    <WavyLine color={added ? "#22c55e" : "#ef4444"} />
  </PopupWrapper>
);

const PlantCard = ({ id, img, imgHover, name, price, rating = 5 }) => {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cartPopups, setCartPopups] = useState([]);
  const [favPopups, setFavPopups] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(favorites.some((p) => p.id === id));
  }, [id]);

  // Like/Unlike function with individual popup
  const handleLike = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const popupId = Date.now() + Math.random();

    if (liked) {
      favorites = favorites.filter((plant) => plant.id !== id);
      setLiked(false);
      setFavPopups((prev) => [...prev, { id: popupId, added: false }]);
    } else {
      favorites.push({ id, img, imgHover, name, price, rating });
      setLiked(true);
      setFavPopups((prev) => [...prev, { id: popupId, added: true }]);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));

    setTimeout(() => {
      setFavPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 4000);
  };

  const handleViewMore = () => navigate(`/product/${id}`);

  const handleAddToCart = () => {
    addToCart({ id, img, name, price }, 1);
    const popupId = Date.now() + Math.random();
    setCartPopups((prev) => [...prev, { id: popupId }]);
    setTimeout(
      () => setCartPopups((prev) => prev.filter((p) => p.id !== popupId)),
      4000
    );
  };

  return (
    <>
      {/* Popup containers */}
      <div
        className="fixed z-[99] flex flex-col items-end pointer-events-none"
        style={{
          top: "80px",
          right: "1.5rem",
          gap: "18px",
          maxWidth: "360px",
          width: "100%",
        }}
      >
        <AnimatePresence>
          {cartPopups.map((p) => (
            <AddToCartPopup key={p.id} />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {favPopups
            .filter((p) => p.added)
            .map((p) => (
              <FavoritesPopup key={p.id} added={p.added} />
            ))}
        </AnimatePresence>
      </div>

      <div
        className="fixed z-[99] flex flex-col items-start pointer-events-none"
        style={{
          top: "80px",
          left: "1.5rem",
          gap: "18px",
          maxWidth: "360px",
          width: "100%",
        }}
      >
        <AnimatePresence>
          {favPopups
            .filter((p) => !p.added)
            .map((p) => (
              <FavoritesPopup key={p.id} added={p.added} />
            ))}
        </AnimatePresence>
      </div>

      {/* Plant Card */}
      <motion.div
        className="relative flex flex-col mt-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 w-full max-w-sm mx-auto overflow-hidden"
        style={{ height: "550px" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Image Section */}
        {img && (
          <div
            className="relative w-full overflow-hidden rounded-t-2xl flex-shrink-0"
            style={{ height: "400px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.img
              src={isHovered && imgHover ? imgHover : img}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Card Content */}
        <div className="flex flex-col justify-between flex-grow p-3 text-center">
          <div>
            <h2 className="text-olive-600 text-lg font-bold mb-1 truncate">
              {name}
            </h2>
            <div className="flex justify-center space-x-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="text-yellow-400"
                />
              ))}
            </div>
            <p className="text-green-700 font-semibold mb-2 text-sm">
              ₹{price}
            </p>
          </div>
          <div className="flex justify-between gap-2 mt-auto">
            <motion.button
              className="flex-1 py-2 bg-green-600 text-white rounded-lg text-xs font-medium shadow hover:shadow-lg"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMore}
            >
              View More
            </motion.button>
            <motion.button
              className="flex-1 py-2 bg-yellow-500 text-black rounded-lg text-xs font-medium shadow hover:shadow-lg"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Like button */}
        <motion.button
          className={`absolute top-2 right-2 p-1 rounded-full bg-white shadow-md transition ${
            liked ? "opacity-100" : "opacity-80"
          }`}
          onClick={handleLike}
          whileTap={{ scale: 0.8 }}
          animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Heart
            size={20}
            className={`${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </motion.button>
      </motion.div>
    </>
  );
};

export default PlantCard;
