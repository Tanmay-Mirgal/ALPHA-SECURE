import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Correct import
import { Menu, LogOut, User, BarChart2, Shield, LineChart } from "lucide-react";
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

function Header() {
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  const navigation = [
    { name: "STOCKS", href: "/stock", icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { name: "INSURANCE", href: "/insurance", icon: <Shield className="h-4 w-4 mr-2" /> },
    { name: "PREDICT STOCKS", href: "/predict", icon: <LineChart className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-2 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-white"
            >
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875V20.25C1.5 21.285 2.339 22.125 3.375 22.125H20.625C21.661 22.125 22.5 21.285 22.5 20.25V4.875C22.5 3.84 21.661 3 20.625 3H3.375zM9 14.25H6.75v1.5H9v-1.5zm0-3H6.75v1.5H9v-1.5zM9 8.25H6.75v1.5H9v-1.5zm9.75 6H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">Bachat</span>
        </Link>

        {/* Desktop Navigation (without Profile) */}
        <nav className="hidden md:flex space-x-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md flex items-center transition-all duration-200",
                location.pathname === item.href
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
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
                  <DropdownMenuSeparator className="bg-gray-800" />
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
            </>
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
        </div>

        {/* Mobile Menu (Sheet) with Profile Link Added */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="h-5 w-5 text-gray-300" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-gray-900 border-gray-800 text-gray-300">
            <SheetHeader className="p-6 border-b border-gray-800">
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <nav className="flex flex-col space-y-1 px-2">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link to={item.href} className="px-3 py-3 text-sm font-medium rounded-md hover:bg-gray-800">
                      {item.icon}
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                {/* Added Profile Link in Sheet */}
                <SheetClose asChild>
                  <Link to="/profile" className="px-3 py-3 text-sm font-medium rounded-md flex items-center hover:bg-gray-800">
                    <User className="h-4 w-4 mr-2" />
                    PROFILE
                  </Link>
                </SheetClose>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
