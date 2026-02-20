import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "../context/cartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  const handleLogoutClick = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
    setMobileMenu(false);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/favorites", label: "Favorites", icon: <Heart size={18} /> },
    { to: "/cart", label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}`, icon: <ShoppingCart size={18} /> },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#14532d] text-white  fixed top-0 left-0 w-full z-40 shadow-lg">

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between px-4 py-4 md:hidden relative">
        <div className="text-3xl font-extrabold tracking-wide text-center w-full absolute left-0 text-yellow-300">
          🌱 Plantify
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors z-50 relative"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden flex flex-col gap-4 bg-green-700 px-6 py-6 text-lg font-medium rounded-b-xl shadow-lg"
          >
            {links.map(({ to, label, icon }) => (
              <li key={to} className="relative">
                <NavLink
                  to={to}
                  onClick={() => setMobileMenu(false)}
                  className="block text-white hover:text-yellow-300 transition-colors flex items-center gap-2 relative font-semibold"
                >
                  {icon} {label}
                  {location.pathname === to && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 bottom-0 h-0.5 bg-yellow-300 rounded"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              </li>
            ))}

            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-green-900 bg-yellow-400 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-green-900 bg-yellow-400 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition block text-center"
                >
                  Login
                </NavLink>
              )}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-14 py-4">
        <div className="text-3xl font-extrabold tracking-wide flex items-center gap-2 text-yellow-300">
          🌱 <NavLink to="/">Plantify</NavLink>
        </div>

        <ul className="flex gap-10 text-lg items-center font-medium relative">
          {links.map(({ to, label, icon }) => (
            <li key={to} className="relative flex items-center gap-2 text-white">
              {icon}
              <NavLink
                to={to}
                className="text-white hover:text-yellow-300 transition-colors font-semibold"
              >
                {label}
              </NavLink>
              {location.pathname === to && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 h-0.5 bg-yellow-300 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}

          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogoutClick}
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-green-900 bg-yellow-400 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
