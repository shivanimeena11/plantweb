import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");
  const [showPopup, setShowPopup] = useState(!user);
  const navigate = useNavigate();

  if (user) {
    // User logged in: allow access
    return children;
  }

  // Function to navigate to login page
  const goToLogin = () => navigate("/login", { replace: true });
  // Function to close popup and redirect
  const closePopup = () => setShowPopup(false);

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundImage: "url('/popup.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay with semi-transparent dark layer */}
          <div className="absolute inset-0 bg-olive/50 backdrop-blur-sm flex items-center justify-center px-4">
            {/* Popup content */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl ring-2 ring-green-300">
              <h2 className="text-3xl font-extrabold mb-4 text-green-800 font-[Poppins]">
                Access Restricted
              </h2>
              <p className="mb-8 text-lg text-green-700 font-semibold font-sans">
                You must be logged in to view this page.
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={goToLogin}
                  className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
                >
                  Log In / Sign Up
                </button>
               
              </div>
            </div>
          </div>
        </div>
      )}
      {!showPopup && (
        // Redirect to home if popup closed without login
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
