import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 👇 Yahan SHOP add kar diya hai
  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "🌙" },
    { name: "99 Names", path: "/99names", icon: "✨" },
    { name: "Duas", path: "/duas", icon: "🤲" },
    { name: "Shop", path: "/shop", icon: "🛒" }, // 👈 Yeh raha Shop Button
    { name: "Schedule", path: "/schedule", icon: "📅" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 pb-safe pt-2 z-50">
      {/* overflow-x-auto aur min-w add kiya hai taaki buttons daba-daba na lage */}
      <div className="flex justify-between items-center px-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[60px] ${
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
