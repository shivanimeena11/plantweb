import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../assets/images/Indoor-Plant-Icon.jpg";
import img2 from "../assets/images/succulent-plant.jpg";
import img3 from "../assets/images/cactus.jpg";
import img4 from "../assets/images/air-purifing-plant.jpg";
import img5 from "../assets/images/outdoor.jpg";
import img6 from "../assets/images/flower-balbs.jpg";
import img7 from "../assets/images/adniumas.jpg";
import img8 from "../assets/images/post-plantears.jpg";
import img9 from "../assets/images/seeds.jpg";
import img10 from "../assets/images/gardening.jpg";

const categories = [
  { name: "Indoor ", img: img1, category: "indoorplants" },
  { name: "Succulents", img: img2, category: "succulents" },
  { name: "Cactus", img: img3, category: "cactusplants" },
  { name: "Air-Purifying Plants", img: img4, category: "airpurifying" },
  { name: "Outdoor Plants", img: img5, category: "outdoorplant" },
  { name: "Flower Bulbs", img: img6, category: "flowerbulbs" },
  { name: "Adeniums", img: img7, category: "adeniums" },
  { name: "Pots & Planters", img: img8, category: "potsandplanters" },
  { name: "Seeds", img: img9, category: "seeds" },
  { name: "Gardening Essentials", img: img10, category: "gardeningessentials" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      ease: "easeInOut",
    },
  },
};

const CategoriesRow = ({ onCategoryClick }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <motion.div
      className="mt-32 mb-6 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <h2 className="text-3xl md:text-6xl font-extrabold text-center mb-20 mt-20 text-black drop-shadow-lg select-none uppercase font-serif">
        Shop by Categories
      </h2>

      {/* gap-x-0 for closest possible cards */}
      <div className="flex flex-wrap justify-center items-center gap-x-0 gap-y-2">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-1/2 md:w-1/5 max-w-xs"
            variants={itemVariants}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <div className="flex flex-col items-center">
              <div
                onClick={() => handleClick(cat.category)}
                className="cursor-pointer relative flex items-center justify-center mb-4"
                style={{ height: 144 }}
              >
                <div className="w-36 h-36 rounded-full bg-white  flex items-center justify-center shadow-lg z-0">
                  <motion.img
                    src={cat.img}
                    alt={cat.name}
                    className="w-32 h-32 rounded-full object-cover z-10 border-4 border-green-500"
                    style={{
                      boxShadow: "0 0 0 6px rgba(34,197,94,0.15)",
                    }}
                    whileHover={{
                      scale: 1.13,
                      boxShadow: "0 0 0 8px rgba(34,197,94,0.22)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                </div>
              </div>
              <div
                className="font-bold text-[18px] md:text-[22px] text-green-800 text-center mb-5 tracking-wide"
                style={{ fontFamily: "sans-serif", letterSpacing: "0.04em" }}
              >
                {cat.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoriesRow;
