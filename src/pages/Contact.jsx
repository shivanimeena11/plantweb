import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Leaf, Sun, Droplets, Flower2, Sparkles } from "lucide-react";
import img from "/login.png";

const ContactPage = () => {
  // 🌿 Journey Section Data
  const stages = [
    {
      icon: <Leaf className="w-10 h-10 text-green-700" />,
      title: "Seed Stage 🌱",
      desc: "Every dream begins as a small seed. With patience and hope, it starts to grow.",
      color: "from-red-100 to-red-300",
    },
    {
      icon: <Droplets className="w-10 h-10 text-blue-600" />,
      title: "Watering & Care 💧",
      desc: "Nurturing your growth with love, learning, and consistency.",
      color: "from-blue-100 to-blue-300",
    },
    {
      icon: <Sun className="w-10 h-10 text-yellow-500" />,
      title: "Sunlight of Knowledge ☀️",
      desc: "Growth blooms under the light of knowledge and experience.",
      color: "from-yellow-100 to-yellow-300",
    },
    {
      icon: <Flower2 className="w-10 h-10 text-pink-600" />,
      title: "Bloom & Shine 🌸",
      desc: "Finally, you blossom into something beautiful and inspiring!",
      color: "from-pink-100 to-pink-300",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-200 overflow-x-hidden">
      <Navbar />

      {/* 🌿 Contact Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center md:h-[50rem] w-full px-6 py-10 gap-10">
        <div className="absolute inset-0">
          <img
            src={img}
            alt="Contact Banner"
            className="w-full h-full object-cover brightness-75"
            style={{ objectPosition: "center left" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/70 to-transparent"></div>
        </div>

        {/* Left Content */}
        <motion.div
          className="relative z-10 text-white md:w-1/2 flex flex-col gap-6 p-6 md:p-10"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl  mt-5 font-extrabold tracking-tight text-white-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact Us
          </h2>

          <p className="text-lg md:text-xl text-white-900 leading-relaxed mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Have a question or want to share your thoughts? We’d love to hear from you! Our team is here to assist with your orders, plant care, or any queries 🌿
          </p>

        </motion.div>

        {/* Form */}
        <motion.form
          className="relative z-10 bg-gradient-to-br from-white/30 via-green-100/10 to-green-200/10
                 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-6
                 w-full md:w-3/6 mx-auto border border-green-200 min-h-[28rem] transition-all"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white text-center mb-1 tracking-tight">
            Contact
          </h3>

          <p className="text-center text-white text-base md:text-lg mb-4 font-sans">
            We'd love to hear from you! Message us and we’ll respond soon 🌿
          </p>

          {/* Input Fields */}
          <input
            type="email"
            required
            placeholder="Your Email Address"
            className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-white/80 via-green-100/40 to-white/70
               text-black-700 placeholder-gery-300 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            pattern="^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
          />

          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-white/70 via-green-100/40 to-white/70
                 text-black-700 placeholder-gery-300 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <textarea
            rows={4}
            required
            placeholder="Your Message..."
            className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-white/70 via-green-100/40 to-white/70
                     text-black-700 placeholder-gery-300 font-medium shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            minLength={6}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-40 md:w-48 mx-auto py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700
                   text-white font-extrabold rounded-full text-lg md:text-xl tracking-wide shadow-xl hover:shadow-2xl transition-all"
          >
            Send
          </motion.button>
        </motion.form>



      </section>


      {/* 🌿 Journey Section (Animated Grid with Smooth Flow) */}
      <section className="relative py-16 bg-gradient-to-b from-olive to-olive-500 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl md:text-5xl font-extrabold text-green-900 mb-4"
          >
            The Journey of Growth 🌱
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center text-green-700 max-w-2xl mx-auto mb-12 text-base md:text-lg"
          >
            Every step makes you stronger — grow, learn, and bloom beautifully.
          </motion.p>

          {/* Animated Grid Cards (Bottom → Top Smoothly) */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2, // smooth sequential flow
                },
              },
            }}
          >
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-tr ${stage.color} rounded-3xl shadow-xl p-6 flex flex-col items-center text-center`}
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? -1 : 1,
                  boxShadow: "0 10px 25px rgba(34,197,94,0.25)",
                }}
              >
                <div className="mb-3">{stage.icon}</div>
                <h3 className="text-xl font-bold text-green-900 mb-2">{stage.title}</h3>
                <p className="text-green-800 text-sm leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center mt-16"
          >
            <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-800">
              Keep Growing. Keep Glowing. 💚
            </h3>
          </motion.div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default ContactPage;
