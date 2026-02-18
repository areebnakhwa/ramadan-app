import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-white py-10 mt-auto mb-16 md:mb-0">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
        {/* Left Side: Logo & Slogan */}
        <div className="md:w-1/2">
          {/* 👇 Title Updated */}
          <h2 className="text-3xl font-bold text-islamic-primary mb-4 tracking-wide">
            Ramzan Mubarak to All 🌙
          </h2>

          {/* 👇 New Hinglish Quotes Updated */}
          <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed italic">
            “Is Ramzan apni galtiyon se tauba, <br />
            aur Allah ki rehmat par poora yaqeen rakho.”
            <br />
            <br />
            “Ramzan humein sikhata hai <br />
            sabr, shukar aur insaniyat ka asli matlab.”
          </p>
        </div>

        {/* Right Side: Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white border-b-2 border-islamic-primary inline-block mb-1 pb-1">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-400 hover:text-white hover:translate-x-1 transition duration-300"
            >
              🏠 Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-400 hover:text-white hover:translate-x-1 transition duration-300"
            >
              🛍️ Shop
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-white hover:translate-x-1 transition duration-300"
            >
              🌙 Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-gray-900 mt-10 pt-6 text-center text-gray-500 text-xs md:text-sm">
        © 2026 Ramzan Mubarak. Built with ❤️ by{" "}
        <span className="text-islamic-primary font-bold">Areeb Nakhwa</span>.
      </div>
    </footer>
  );
};

export default Footer;
