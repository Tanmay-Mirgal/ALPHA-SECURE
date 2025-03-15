
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
// import ProfilePage from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        
        <Route path="*" element={<Error />} />
      </Routes>
        {/* <Footer /> */}
        <ToastContainer />
      {/* <Toaster position="bottom-right" /> */}
    </>
  );
}

export default App;