// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-[hsla(240,4.9%,83.9%,0.5)] backdrop-blur bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50">
//       <div className="container max-w-[1500px] mx-auto h-16 px-4 flex justify-evenly items-center">
//         <div className="flex items-center"> 
//         {/* Logo */}
//         <Link to="/">
//           <h2 className="text-white text-2xl">Bachat</h2>
//         </Link>
//       </div>
//       <div>
//                 {/* Navigation */}
//                 <nav className="flex items-center space-x-6">
//           <NavLink to="/about" className="py-2 text-base duration-200">
//            Stock
//           </NavLink>
//           <NavLink to="/services" className="py-2 text-base duration-200">
//           Insurance
//           </NavLink>
//           <NavLink to="/contact" className="py-2 text-base duration-200">
//            Profile
//           </NavLink>
//           <NavLink to="/contact" className="py-2 text-base duration-200">
//             Predict Stocks!
//           </NavLink>
//         </nav>
//       </div>
//       <div className="flex items-center gap-4 justify-center">
//         {/* Login Button */}
//         <Link to="/login">
//           <button className="px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600  hover:underline">
//             Login 
//           </button> 
//         </Link>
//         <Link to="/signup">
//           <button className="px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 hover:underline">
//            Sign Up
//           </button> 
//         </Link>
//       </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875V20.25C1.5 21.285 2.339 22.125 3.375 22.125H20.625C21.661 22.125 22.5 21.285 22.5 20.25V4.875C22.5 3.84 21.661 3 20.625 3H3.375zM9 14.25H6.75v1.5H9v-1.5zm0-3H6.75v1.5H9v-1.5zM9 8.25H6.75v1.5H9v-1.5zm9.75 6H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">Bachat</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/stock" className="text-sm text-gray-300 hover:text-white transition-colors">
           STOCKS
          </NavLink>
          <NavLink to="/insurance" className="text-sm text-gray-300 hover:text-white transition-colors">
            INSURANCE
          </NavLink>
          <NavLink to="/profile" className="text-sm text-gray-300 hover:text-white transition-colors">
            PROFILE
          </NavLink>
          <NavLink to="/predict" className="text-sm text-gray-300 hover:text-white transition-colors">
            PREDICT STOCKS
          </NavLink>
        </nav>
        
        {/* Login Button */}
        <div className="flex items-center gap-6">
          <Link to="/login">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors">
              Sign UP
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;