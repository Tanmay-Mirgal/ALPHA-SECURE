import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StockPage from "./pages/Stock/StockPage";
import Insurance from "./pages/Stock/Insurance";
import Prediction from "./pages/prediction/Prediction";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import EKYCForm from "./pages/Profile/EKYC_form";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/stock"
          element={<ProtectedRoute><StockPage /></ProtectedRoute>}
        />
        <Route
          path="/insurance"
          element={<ProtectedRoute><Insurance /></ProtectedRoute>}
        />
        <Route
          path="/predict"
          element={<ProtectedRoute><Prediction /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/e-kyc"
          element={<ProtectedRoute><EKYCForm /></ProtectedRoute>}
        />


      </Routes>
<Footer/>
      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
