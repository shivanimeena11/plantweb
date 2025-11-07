import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlantCard from "../components/PlantCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites initially
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Listen to custom "favoritesUpdated" event for live updates
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
  }, []);

  // Clear all favorites instantly
  const handleClearAll = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="px-6 py-10 flex-1">
        {/* Heading + Clear All Button */}
        <div className="flex items-center justify-between mb-10 mt-10">
          {/* Heading centered */}
          <h1
            className="flex-1 flex items-center justify-center text-4xl md:text-5xl font-extrabold gap-4"
            style={{
              color: "#15803D", // Dark green
              textShadow: "1px 1px 3px rgba(0,0,0,0.22)",
              letterSpacing: "1px",
            }}
          >
            {/* Hands-heart SVG Icon */}
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M15 24C13 26 8 28 8 33C8 35.2 15 42 24 42C33 42 40 35.2 40 33C40 28 35 26 33 24"
                  stroke="#15803D"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M24 16C24 16 20 11 16 13C13.2 14.8 13.4 18.4 16 20.2C17.2 21.1 20 23 24 26C28 23 30.8 21.1 32 20.2C34.6 18.4 34.8 14.8 32 13C28 11 24 16 24 16Z"
                  fill="#15803D"
                />
              </svg>
            </span>
            <span>Your Favorites</span>
          </h1>

          {/* Clear All Button */}
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-300 flex-shrink-0"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No favorites added yet!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {favorites.map((plant) => (
              <PlantCard
                key={plant.id}
                {...plant}
                onAddToCart={() => alert(`${plant.name} clicked!`)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
