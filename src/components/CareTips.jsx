import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTint, FaSun, FaBoxOpen } from "react-icons/fa";
import img1 from "../assets/images/caretips.jpg";

const tips = [
  {
    icon: <FaBoxOpen className="text-green-600" />,
    text: "Open the box 📦 as soon as possible after receiving plants.",
  },
  {
    icon: <FaSun className="text-yellow-500" />,
    text: "Air dry the plants for 2–3 hours in fresh air.",
  },
  {
    icon: <FaLeaf className="text-green-700" />,
    text: "Use well-drained soil (30% sand + 30% soil + 20% compost + 20% perlite).",
  },
  {
    icon: <FaTint className="text-blue-500" />,
    text: "Water plants after 2–3 days and avoid direct sunlight for 10 days.",
  },
];

const CareTips = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-24 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1.2,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={img1}
            alt="Plant care"
            className="rounded-3xl shadow-2xl w-[600px] sm:w-[700px] md:w-[800px] lg:w-[900px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover transform transition-transform duration-700 hover:scale-110 hover:shadow-green-400/50"
          />

        </motion.div>

        {/* Tips Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            ease: [0.25, 0.1, 0.25, 1],
            duration: 1,
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-5xl font-extrabold text-green-800 mb-10">
            Plant Care Tips 🌱
          </h2>

          <motion.ul
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            {tips.map((tip, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-green-200 transition"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 60,
                      damping: 18,
                    },
                  },
                }}
              >
                <span className="text-3xl">{tip.icon}</span>
                <p className="text-lg text-gray-800">{tip.text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className="mt-10 text-lg text-gray-800 bg-green-50 p-5 rounded-2xl border-l-4 border-green-600 shadow-lg hover:shadow-green-300 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <span className="font-bold">Note:</span> Always water succulents when the top layer of soil feels dry — water the roots, not the leaves.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareTips;
