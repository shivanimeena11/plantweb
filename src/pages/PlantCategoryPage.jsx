import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import plantsData from "../data/plants.json";

const categoryNames = {
  indoorplants: "Indoor Plants",
  outdoorplants: "Outdoor Plants",
  succulents: "Succulents",
  // Add other categories if needed
};

const PlantCategoryPage = () => {
  const { category } = useParams();
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredPlants = plantsData.filter(
      (plant) => plant.category.toLowerCase() === category.toLowerCase()
    );
    setPlants(filteredPlants);
  }, [category]);

  const heading = categoryNames[category.toLowerCase()] || category;

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 relative">
      <Navbar />

      {/* Fixed Top Heading with Responsive Back Button */}
      <div className="fixed top-16 left-0 w-full z-50 bg-amber-50 py-4 shadow-md flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 text-center tracking-wide animate-fade-in">
          {heading} Plants
        </h1>

       
      </div>

      {/* Spacer so content doesn't go under fixed heading */}
      <div className="h-32"></div>

      {/* Plants Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              id={plant.id}
              img={plant.img}
              imgHover={plant.imgHover}
              name={plant.name}
              price={plant.price}
              rating={plant.rating}
              onAddToCart={() => console.log("Add to cart", plant.name)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantCategoryPage;
