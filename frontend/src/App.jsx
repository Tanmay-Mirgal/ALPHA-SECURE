
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
// import ProfilePage from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StockPage from "./pages/Stock/StockPage";
import Insurance from "./pages/Stock/Insurance";
import Prediction from "./pages/prediction/Prediction";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

function App() {
  
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={ <Login /> }
        />
        <Route
          path="/signup"
          element={<Signup /> }
        />
        <Route
          path="/stock"
          element={<StockPage /> }
        />
        <Route
          path="/insurance"
          element={<Insurance /> }
        />
         <Route
          path="/predict"
          element={<Prediction /> }
        />
        <Route
          path="/dashboard"
          element={<Dashboard /> }
        />
        <Route
          path="/profile"
          element={<Profile/> }
        />
        
        <Route path="*" element={<Error />} />
      </Routes>
        {/* <Footer /> */}
        <ToastContainer />
      {/* <Toaster position="bottom-right" /> */}
    </>
  );
}

export default App;