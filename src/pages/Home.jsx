import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-islamic-bg text-white p-4 pb-24">
      <div className="max-w-md mx-auto space-y-4 mt-4">
        {/* --- WAPAS AAYA HUA TOP SECTION (Date, Time, Hadith) --- */}

        {/* Card 1: Today's Date */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
          <p className="text-islamic-primary font-bold mb-2">Today's Date 🗓️</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Ramadan 3, 1447 AH
          </h2>
          <p className="text-gray-400 text-sm">Sat, Feb 21, 2026</p>
        </div>

        {/* Card 2: Mumbai Timings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
          <p className="text-islamic-primary font-bold mb-4">
            Mumbai Timings 🕌
          </p>
          <div className="flex justify-between items-center">
            <div className="flex-1 border-r border-gray-700">
              <p className="text-xs text-gray-400 tracking-wider mb-1">
                SEHRI ENDS
              </p>
              <p className="text-2xl font-bold text-white">5:40 AM</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 tracking-wider mb-1">
                IFTAR TIME
              </p>
              <p className="text-2xl font-bold text-white">6:44 PM</p>
            </div>
          </div>
        </div>

        {/* Card 3: Hadith of the Day */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg mb-8">
          <p className="text-islamic-primary font-bold mb-3">
            Hadith of the Day ✨
          </p>
          <p className="text-gray-300 italic mb-2 text-sm md:text-base">
            "Cleanliness is half of faith (Iman)."
          </p>
          <p className="text-xs text-gray-500">— Sahih Muslim</p>
        </div>

        {/* --- NAYA "APP MEIN KYA KHAAS HAI" SECTION --- */}

        {/* Divider / Heading */}
        <div className="flex items-center justify-center gap-4 my-8 mt-10">
          <div className="h-px bg-gray-800 flex-1"></div>
          <span className="text-xs text-islamic-primary font-bold tracking-widest uppercase">
            App Mein Kya Khaas Hai?
          </span>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        {/* Naye Features Cards (2 column grid format for mobile) */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl hover:border-islamic-primary transition-all shadow-lg text-center flex flex-col items-center justify-center group hover:-translate-y-1"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">
              Dashboard
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
              Login karo aur apna daily namaz & roza track karo.
            </p>
          </Link>

          {/* Shop */}
          <Link
            to="/shop"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl hover:border-islamic-primary transition-all shadow-lg text-center flex flex-col items-center justify-center group hover:-translate-y-1"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🛒
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">
              Iftar Shop
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
              100% pure Samosa Patti, Syrups order karo.
            </p>
          </Link>

          {/* Duas */}
          <Link
            to="/duas"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl hover:border-islamic-primary transition-all shadow-lg text-center flex flex-col items-center justify-center group hover:-translate-y-1"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🤲
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">
              Duas & Names
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
              Ramadan ki duayein padho aur HD cards save karo.
            </p>
          </Link>

          {/* Schedule */}
          <Link
            to="/schedule"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl hover:border-islamic-primary transition-all shadow-lg text-center flex flex-col items-center justify-center group hover:-translate-y-1"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🗓️
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1">
              Timetable
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
              Pure 30 din ka Sehri-Iftar time download karo.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
