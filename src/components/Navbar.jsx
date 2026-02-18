import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Make sure path is correct

const Navbar = () => {
  const navigate = useNavigate();

  // Logout Function (Optional, agar navbar mein logout chahiye)
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 👇 LOGO CHANGE: Ramadan Kareem */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-islamic-primary tracking-wide hover:opacity-80 transition flex items-center gap-2"
        >
          Ramadan Kareem 🌙
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <li className="hover:text-islamic-primary cursor-pointer transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-islamic-primary cursor-pointer transition">
            <Link to="/schedule">Schedule</Link>
          </li>
          <li className="hover:text-islamic-primary cursor-pointer transition">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:text-islamic-primary cursor-pointer transition">
            <Link to="/duas">Duas</Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="bg-islamic-primary text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Dashboard Icon (Agar Mobile Nav hai toh ye optional hai, par rakh sakte hain) */}
        <Link to="/dashboard" className="md:hidden text-islamic-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
