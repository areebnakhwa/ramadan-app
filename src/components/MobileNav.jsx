import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-gray-800 flex justify-around items-center py-3 z-50 pb-safe">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center ${isActive("/") ? "text-islamic-primary" : "text-gray-500"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="text-[10px] mt-1 font-medium">Home</span>
      </Link>

      {/* Dashboard */}
      <Link
        to="/dashboard"
        className={`flex flex-col items-center ${isActive("/dashboard") ? "text-islamic-primary" : "text-gray-500"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span className="text-[10px] mt-1 font-medium">Dash</span>
      </Link>

      {/* Duas */}
      <Link
        to="/duas"
        className={`flex flex-col items-center ${isActive("/duas") ? "text-islamic-primary" : "text-gray-500"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
        <span className="text-[10px] mt-1 font-medium">Duas</span>
      </Link>

      {/* Shop */}
      <Link
        to="/shop"
        className={`flex flex-col items-center ${isActive("/shop") ? "text-islamic-primary" : "text-gray-500"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span className="text-[10px] mt-1 font-medium">Shop</span>
      </Link>

      {/* Schedule */}
      <Link
        to="/schedule"
        className={`flex flex-col items-center ${isActive("/schedule") ? "text-islamic-primary" : "text-gray-500"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[10px] mt-1 font-medium">Dates</span>
      </Link>
    </div>
  );
};

export default MobileNav;
