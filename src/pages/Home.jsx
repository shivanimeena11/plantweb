import React, { useRef, useEffect } from "react";
import img from "../assets/images/homebeauty.jpg";
import CategoriesRow from "../components/CategoriesRow";
import Footer from "../components/Footer";
import CareTips from "../components/CareTips";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Bestsale from "../components/bestsale";


const Home = () => {
  const categoriesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const NAVBAR_HEIGHT = 64; // Adjust if your navbar height is different

  // Scroll function for Shop Now button with offset
  const scrollToCategories = () => {
    if (categoriesRef.current) {
      const elementPosition = categoriesRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - NAVBAR_HEIGHT - 16; // extra 16px padding
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle category clicks from CategoriesRow
  const handleCategoryClick = (category) => {
    navigate(`/plants/${category}`);
  };

  // Scroll to categories if navigated from Cart page
  useEffect(() => {
    if (location.state?.scrollToCategories && categoriesRef.current) {
      const elementPosition = categoriesRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - NAVBAR_HEIGHT - 16;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <div className="relative w-full min-h-screen pt-16">
      <Navbar />

      {/* Banner section */}
      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(1.5px) brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-15" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
          <div className="mb-2 text-sm tracking-widest text-gray-200 uppercase">
            Welcome to the Plantfy Shop
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-serif font-extrabold tracking-tight max-w-2xl mx-auto">
            Let’s Bring the Spring to Your Home
          </h1>
          <button
            onClick={scrollToCategories}
            className="mt-6 px-8 py-3 bg-white bg-opacity-90 text-gray-900 rounded shadow-md font-semibold transition hover:bg-opacity-100"
          >
            Shop Now
          </button>
        </div>
      </div>
      {/* End Banner section */}

      {/* Categories section */}
      <div ref={categoriesRef} className="scroll-mt-24">
        <CategoriesRow onCategoryClick={handleCategoryClick} />
      </div>

      {/* Care tips section */}
      <CareTips />

      {/* Bestsellers section */}
      <Bestsale />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
