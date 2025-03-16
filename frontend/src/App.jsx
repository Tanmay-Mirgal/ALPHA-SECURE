import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

// Import Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Blog from "./pages/Blog/Blog";
import ROICalculator from "./pages/RoiCalculator/RoiCalculator";
import Lecture from "./pages/Lecture/Lecture";

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const StockPage = lazy(() => import("./pages/Stock/StockPage"));
const Insurance = lazy(() => import("./pages/Stock/Insurance"));
const Prediction = lazy(() => import("./pages/prediction/Prediction"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const EKYCForm = lazy(() => import("./pages/Profile/EKYC_form"));

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Toaster for Notifications */}
      <Toaster position="bottom-right" />
      <ToastContainer position="bottom-right" />

      {/* Routes with Lazy Loading & Suspense */}
      <Suspense fallback={<div className="text-center mt-10"><ClipLoader size={50} color={"#123abc"} loading={true} /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />

          {/* Protected Routes */}
          <Route
            path="/stock"
            element={
              <ProtectedRoute>
                <StockPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insurance"
            element={
              <ProtectedRoute>
                <Insurance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Prediction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e-kyc"
            element={
              <ProtectedRoute>
                <EKYCForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roi"
            element={
              <ProtectedRoute>
              <ROICalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e-learn"
            element={
              <ProtectedRoute>
              <Lecture />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
