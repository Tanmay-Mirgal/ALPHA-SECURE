import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import StockPage from "./pages/Stock/StockPage";
import Insurance from "./pages/Stock/Insurance";
import Prediction from "./pages/prediction/Prediction";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import EKYCForm from "./pages/Profile/EKYC_form";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LanguageSelector from "./components/LanguageSelector"; // Language Selector Import
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Toaster for Notifications */}
      <Toaster />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ekyc-form" element={<EKYCForm />} />
      </Routes>
    </>
  );
}

export default App;
