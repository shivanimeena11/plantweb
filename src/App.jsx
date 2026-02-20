import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import LoginSignUp from "./pages/LoginSignUp";
import PlantCategoryPage from "./pages/PlantCategoryPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/login" element={<LoginSignUp />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/:category"
          element={
            <ProtectedRoute>
              <PlantCategoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default App;
