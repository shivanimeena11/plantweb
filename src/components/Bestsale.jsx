import React, { useState } from "react";
import { motion } from "framer-motion";

const plants = [
  {
    name: "Graptosedum Plant ",
    image: "img1.jpg",
    price: 79,
    rating: 5,
    reviews: 1,
    description:
      "Detailed info about Graptosedum Plant. This plant is unique due to its succulent leaves, perfect for low maintenance indoor gardening.",
  },
  {
    name: "Champa Plant",
    image: "champaPlant.jpg",
    price: 79,
    rating: 5,
    reviews: 11,
    description:
      "Details of Champa Plant. Known for its beautiful flowers and strong fragrance, a beautiful addition to any garden.",
  },
  {
    name: "Golden Mony Plant",
    image: "goldenMonyPlant.jpg",
    price: 59,
    rating: 5,
    reviews: 5,
    description:
      "Details about Golden Mony Plant. A popular indoor plant, believed to bring good luck and prosperity.",
  },
  {
    name: "Oxalis Pink Bulbs Plant",
    image: "OxalisPinkBulbs.jpg",
    price: 89,
    rating: 4,
    reviews: 2,
    description:
      "Description for Oxalis Pink Bulbs Plant. Known for its vibrant pink flowers, adds a splash of color to your home.",
  },
];

const StarFilledLarge = () => (
  <svg
    fill="#F59E0B"
    stroke="#F59E0B"
    strokeWidth="0"
    viewBox="0 0 24 24"
    className="inline w-4 h-4 mr-0.5"
  >
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.091 4.664 24 6 15.595 0 9.748l8.332-1.73z" />
  </svg>
);

const StarFilledSmall = ({ size = 6 }) => (
  <svg
    fill="#F59E0B"
    stroke="#F59E0B"
    strokeWidth="0"
    viewBox="0 0 24 24"
    className={`inline w-${size} h-${size} mr-0.5`}
  >
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.091 4.664 24 6 15.595 0 9.748l8.332-1.73z" />
  </svg>
);

// 🔥 Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2, // ek ek karke delay
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  }),
};

const SimplePlantCard = ({ plant, index, onLearnMore }) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer"
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
  >
    <div className="rounded-xl overflow-hidden shadow-lg mb-2">
      <img
        src={plant.image}
        alt={plant.name}
        className="w-[220px] h-[220px] object-cover bg-white rounded-xl"
      />
    </div>
    <h3 className="text-[20px] italic font-serif text-purple-700 text-center max-w-[220px] leading-tight mb-2 drop-shadow-sm">
      {plant.name}
    </h3>
    <div className="mb-1 flex items-center justify-center gap-1">
      {[...Array(plant.rating)].map((_, i) => (
        <StarFilledLarge key={i} />
      ))}
      <span className="ml-2 text-gray-600 text-xs font-normal">
        ({plant.reviews} Reviews)
      </span>
    </div>
    <div className="text-[16px] font-semibold text-gray-900 mb-2 mt-1">
      From Rs. {plant.price}.00
    </div>
    <button
      className="w-[120px] text-[15px] border border-gray-400 rounded-lg py-[6px] bg-white text-gray-900 font-semibold hover:bg-purple-100 transition mb-5"
      onClick={() => onLearnMore(plant)}
    >
      Learn more
    </button>
  </motion.div>
);

const Modal = ({ plant, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-3xl w-full shadow-lg overflow-y-auto max-h-[90vh] relative p-8"
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-3xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full md:w-1/2 h-auto rounded-lg shadow-md object-cover"
          />
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4 text-green-800 tracking-wide">
              {plant.name}
            </h2>
            <div className="flex mb-4 items-center">
              {[...Array(plant.rating)].map((_, i) => (
                <StarFilledSmall key={i} size={3} />
              ))}
              <span className="ml-3 text-gray-600 text-sm font-semibold">
                ({plant.reviews} Reviews)
              </span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {plant.description}
            </p>
            <p className="text-2xl font-extrabold text-green-900">
              Price: Rs. {plant.price}.00
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Bestsale = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleLearnMore = (plant) => {
    setSelectedPlant(plant);
  };

  const handleClose = () => {
    setSelectedPlant(null);
  };

  return (
    <section className="bg-[#f7f9ef] py-10 px-4">
      <motion.h2
        className="text-5xl font-extrabold text-center mb-14 tracking-wide font-mono text-green-900"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        Best Sales Plant
      </motion.h2>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-center px-4">
        {plants.map((plant, i) => (
          <SimplePlantCard
            key={i}
            plant={plant}
            index={i}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>

      {selectedPlant && <Modal plant={selectedPlant} onClose={handleClose} />}
    </section>
  );
};

export default Bestsale;
