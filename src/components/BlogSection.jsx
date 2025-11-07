import React from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    image: "/blog1.jpg",
    title: "How To Pot Plants",
    description:
      "Learn the essential steps to pot your plants correctly, from choosing the right soil to ensuring proper drainage for healthy, thriving greenery.",
    link: "#",
  },
  {
    image: "/blog2.jpg",
    title: "How Much Sunlight Is Needed",
    description:
      "Discover how to give your plants the perfect amount of sunlight for optimal growth and vibrant health, whether indoors or outdoors.",
    link: "#",
  },
  {
    image: "/blog3.jpg",
    title: "Show Plants",
    description:
      "Learn creative ways to display your plants at home, making every corner lively and adding a touch of greenery to your decor.",
    link: "#",
  },
];

function BlogSection() {
  return (
    <section className="bg-[#faf8f1] mt-20 py-8">
      <div className="max-w-6xl mx-auto px-3">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="inline-block text-4xl md:text-5xl font-serif font-bold bg-clip-text text-olive-500 drop-shadow-lg tracking-wide">
            Care Tips & Guides
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-lime-400 via-green-500 to-green-800 mx-auto rounded-full mt-4" />
          <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
            Explore expert advice and practical guides to help your plants thrive, all in one place.
          </p>
        </div>

        {/* Blog Cards (Framer Motion Grid) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2, // Smooth sequential appearance
              },
            },
          }}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white w-full min-h-[500px] rounded-xl shadow-md flex flex-col overflow-hidden"
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
              {/* Image */}
              <div className="overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[290px] object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[22px] font-semibold mb-1">{post.title}</h3>
                <p className="text-sm text-gray-400">{post.date}</p>
                <p className="my-3 text-gray-700 text-[15px] flex-1 font-serif">
                  {post.description}
                </p>
                <a
                  href={post.link}
                  className="text-green-800 font-medium text-[18px] hover:underline mt-auto"
                >
                  Continue Reading &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BlogSection;
