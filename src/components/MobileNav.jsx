import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Yahan saare links define kiye hain
  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Schedule", path: "/schedule", icon: "📅" },
    { name: "99 Names", path: "/99names", icon: "✨" }, // 👈 Yeh naya add kiya hai
    { name: "Duas", path: "/duas", icon: "🤲" },
    { name: "Dashboard", path: "/dashboard", icon: "🌙" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 pb-safe pt-2 z-50">
      <div className="flex justify-around items-center px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPath === item.path
                ? "text-islamic-primary bg-gray-800/50"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-medium text-center leading-tight">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
