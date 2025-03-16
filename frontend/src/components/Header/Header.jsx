import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, LogOut, User, BarChart2, Shield, LineChart, Calculator } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "../../components/ui/sheet";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";
import LanguageSelector from "../LanguageSelector"; // Ensure this component exists

function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "STOCKS", href: "/stock", icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { name: "INSURANCE", href: "/insurance", icon: <Shield className="h-4 w-4 mr-2" /> },
    { name: "PREDICT STOCKS", href: "/predict", icon: <LineChart className="h-4 w-4 mr-2" /> },
    { name : "ROI Calculator", href: "/roi", icon: <Calculator className="h-4 w-4 mr-2" /> }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875V20.25C1.5 21.285 2.339 22.125 3.375 22.125H20.625C21.661 22.125 22.5 21.285 22.5 20.25V4.875C22.5 3.84 21.661 3 20.625 3H3.375zM9 14.25H6.75v1.5H9v-1.5zm0-3H6.75v1.5H9v-1.5zM9 8.25H6.75v1.5H9v-1.5zm9.75 6H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">Bachat</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium flex items-center px-3 py-2 rounded-md transition-all",
                location.pathname === item.href ? "text-white bg-gray-800" : "text-gray-300 hover:text-green-400 hover:bg-gray-800/50"
              )}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: User Authentication & Language Selector */}
        <div className="hidden md:flex flex-row-reverse items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border border-gray-700">
                    <AvatarImage src="/placeholder.svg" alt={user.fullName.firstName} />
                    <AvatarFallback className="bg-gray-800 text-green-500">{user.fullName.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-gray-300">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium text-white">{user.fullName.firstName} {user.fullName.lastName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <Link to="/dashboard">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-500 hover:text-red-400 hover:bg-gray-800"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800 hover:text-white">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-white hover:bg-gray-800 transition">
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 text-white py-4 px-6 absolute top-16 left-0 w-full shadow-lg">
          {navigation.map((item) => (
            <NavLink key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
              {item.name}
            </NavLink>
          ))}
          <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
            PROFILE
          </NavLink>
          <div className="mt-4">
            <LanguageSelector />
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
