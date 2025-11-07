import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animation variants
const tabVariants = {
  active: { x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
  inactive: { x: "100%" },
};

const formVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subHeadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } },
};

const LoginSignUp = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProtectedModal, setShowProtectedModal] = useState(false);

  // Form states
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  const isValidName = (n) => /^[A-Za-z\s]+$/.test(n);
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPassword = (p) => p.length >= 6;

  const resetForms = () => {
    setLoginName("");
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirm("");
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    setIsLoggedIn(!!loggedInUser);
    resetForms();
  }, []);

  useEffect(() => {
    resetForms();
  }, [tab]);

  useEffect(() => {
    if (!isLoggedIn && location.state?.protected) {
      setShowProtectedModal(true);
    }
  }, [location, isLoggedIn]);

  const closeProtectedModal = () => {
    setShowProtectedModal(false);
    navigate("/login", { replace: true, state: { protected: false } });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isValidName(loginName)) return toast.error("Invalid name!");
    if (!isValidEmail(loginEmail)) return toast.error("Invalid email!");
    if (!isValidPassword(loginPassword)) return toast.error("Password must be at least 6 characters!");
    sessionStorage.setItem("user", JSON.stringify({ name: loginName, email: loginEmail }));
    toast.success("Login successful!");
    setIsLoggedIn(true);
    if (onLogin) onLogin();
    resetForms();
    setTimeout(() => navigate("/", { replace: true }), 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isValidName(signupName)) return toast.error("Invalid name!");
    if (!isValidEmail(signupEmail)) return toast.error("Invalid email!");
    if (!isValidPassword(signupPassword)) return toast.error("Password must be at least 6 characters!");
    if (signupPassword !== signupConfirm) return toast.error("Passwords do not match!");
    sessionStorage.setItem("user", JSON.stringify({ name: signupName, email: signupEmail }));
    toast.success("Sign up successful!");
    setIsLoggedIn(true);
    resetForms();
    setTimeout(() => navigate("/", { replace: true }), 1500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.info("Logged out successfully!");
    resetForms();
  };

  const inputFocus = "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 rounded-md transition duration-200";

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md"
          >
            <h2 className="text-3xl font-bold text-green-700 mb-3">You’re Already Logged In 🌿</h2>
            <p className="text-gray-600 mb-6">Welcome back, your plant world is ready!</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-green-700 rounded-full text-white font-semibold hover:bg-green-800 transition"
            >
              Go to Shop
            </button>
            <button
              onClick={handleLogout}
              className="block mx-auto mt-5 text-sm text-green-700 underline hover:text-green-800"
            >
              Logout
            </button>
          </motion.div>
        </main>
        <Footer />
        <ToastContainer theme="colored" position="top-center" autoClose={2500} hideProgressBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 flex flex-col relative">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        {/* Animated Heading */}
        <motion.div
          className="text-center mb-10 px-4"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          <motion.h1
            className="text-4xl mt-5 md:text-5xl font-extrabold mb-3 tracking-wide"
            style={{ color: "#556B2F", fontFamily: "'Poppins', sans-serif" }}
          >
            🌿 Welcome to Your Plant World!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-800"
            variants={subHeadingVariants}
          >
            Please{" "}
            <motion.span
              whileHover={{ scale: 1.1, color: "#9ACD32" }}
              className="font-semibold underline text-green-800 cursor-pointer"
              onClick={() => setTab("login")}
            >
              log in
            </motion.span>{" "}
            or{" "}
            <motion.span
              whileHover={{ scale: 1.1, color: "#9ACD32" }}
              className="font-semibold underline text-green-800 cursor-pointer"
              onClick={() => setTab("signup")}
            >
              sign up
            </motion.span>{" "}
            to access the site.
          </motion.p>
        </motion.div>

        {/* Login/Signup Forms */}
        <section className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          {/* Tabs */}
          <div className="flex relative mb-10 bg-green-100 rounded-full p-1 text-gray-600 font-semibold select-none">
            <button
              onClick={() => setTab("login")}
              className={`relative z-10 flex-1 py-2 rounded-full text-center ${tab === "login" ? "text-white" : "hover:text-green-900"}`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`relative z-10 flex-1 py-2 rounded-full text-center ${tab === "signup" ? "text-white" : "hover:text-green-900"}`}
            >
              Sign Up
            </button>
            <motion.span
              layout
              className="absolute top-1 bottom-1 left-1 bg-green-600 rounded-full shadow-lg"
              initial={false}
              animate={tab === "login" ? "active" : "inactive"}
              variants={tabVariants}
              style={{ width: "50%" }}
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {tab === "login" && (
              <motion.form
                key="login"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariant}
                onSubmit={handleLogin}
                autoComplete="off"
                noValidate
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className={`block w-full p-3 mb-5 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={`block w-full p-3 mb-5 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`block w-full p-3 mb-6 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 rounded-lg text-white font-extrabold shadow-md text-xl hover:bg-green-800 transition"
                >
                  Log In
                </button>
              </motion.form>
            )}

            {tab === "signup" && (
              <motion.form
                key="signup"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariant}
                onSubmit={handleSignup}
                autoComplete="off"
                noValidate
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className={`block w-full p-3 mb-5 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={`block w-full p-3 mb-5 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={`block w-full p-3 mb-5 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  className={`block w-full p-3 mb-6 border border-green-300 rounded-md text-lg ${inputFocus}`}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 rounded-lg text-white font-extrabold shadow-md text-xl hover:bg-green-800 transition"
                >
                  Sign Up
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </main>

      <ProtectedPopup show={showProtectedModal} onClose={closeProtectedModal} />

      <Footer />
      <ToastContainer theme="colored" position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

function ProtectedPopup({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center min-w-[320px]">
        <h2 className="text-2xl font-extrabold mb-2 text-green-700">Access Denied</h2>
        <p className="mb-6 text-gray-600">
          You cannot enter this website without logging in or signing up! Please log in or sign up to continue.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition"
        >
          OK, Log In or Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginSignUp;
