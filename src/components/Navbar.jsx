import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Ensure path is correct
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="bg-black/90 text-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-islamic-primary flex items-center gap-2"
          >
            🌙 Ramadan Kareem
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`${isActive("/") ? "text-islamic-primary" : "hover:text-islamic-primary"} transition`}
            >
              Home
            </Link>
            <Link
              to="/schedule"
              className={`${isActive("/schedule") ? "text-islamic-primary" : "hover:text-islamic-primary"} transition`}
            >
              Schedule
            </Link>

            {/* 99 Names Link (Correctly placed) */}
            <Link
              to="/99names"
              className={`${isActive("/99names") ? "text-islamic-primary" : "hover:text-islamic-primary"} transition`}
            >
              99 Names
            </Link>

            <Link
              to="/duas"
              className={`${isActive("/duas") ? "text-islamic-primary" : "hover:text-islamic-primary"} transition`}
            >
              Duas
            </Link>
            <Link
              to="/shop"
              className={`${isActive("/shop") ? "text-islamic-primary" : "hover:text-islamic-primary"} transition`}
            >
              Shop
            </Link>

            {/* Dashboard Button */}
            <Link
              to="/dashboard"
              className="bg-islamic-primary text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-500/20"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-islamic-primary focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <Link
            to="/"
            className="block py-3 px-4 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/schedule"
            className="block py-3 px-4 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Schedule
          </Link>
          <Link
            to="/99names"
            className="block py-3 px-4 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            99 Names
          </Link>
          <Link
            to="/duas"
            className="block py-3 px-4 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Duas
          </Link>
          <Link
            to="/shop"
            className="block py-3 px-4 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/dashboard"
            className="block py-3 px-4 text-islamic-primary font-bold hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
