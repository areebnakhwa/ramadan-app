import React, { useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // 👇 YAHAN AAPKA WHATSAPP NUMBER SET HAI
  const PHONE_NUMBER = "919819370937";

  // 👇 FULL PRODUCTS LIST
  const products = [
    // --- 🟢 HOMEMADE ITEMS ---
    {
      id: 1,
      name: "Schezwan Chutney",
      price: "₹100",
      image: "/images/schezwan.jpg",
      type: "homemade",
      desc: "Aksa's spicy Schezwan. Homemade, no preservatives (250gm).",
    },
    {
      id: 2,
      name: "Kokam Chutney",
      price: "₹100",
      image: "/images/kokam.jpg",
      type: "homemade",
      desc: "Tangy authentic taste. 100% Natural & Preservative-Free (250gm).",
    },
    {
      id: 3,
      name: "Rose Syrup",
      price: "₹110",
      image: "/images/rose.jpg",
      type: "homemade",
      desc: "Classic Rose Sharbat. Homemade goodness, zero preservatives.",
    },
    {
      id: 4,
      name: "Rooh Afzaa Syrup",
      price: "₹110",
      image: "/images/rooh afzaa.jpg",
      type: "homemade",
      desc: "Rich Rose blend. Homemade, Natural & Preservative-free.",
    },
    {
      id: 5,
      name: "Khus Syrup",
      price: "₹110",
      image: "/images/khus.jpg",
      type: "homemade",
      desc: "Natural cooling Khus. Made at home with love.",
    },
    {
      id: 6,
      name: "Blue Fizz Syrup",
      price: "₹110",
      image: "/images/bluefizz.jpg",
      type: "homemade",
      desc: "Exotic Blue Mocktail. Freshly made, no harmful preservatives.",
    },
    {
      id: 7,
      name: "Mango Masti Syrup",
      price: "₹110",
      image: "/images/Mango.jpg",
      type: "homemade",
      desc: "Real Mango taste. 100% Homemade, No Preservatives added.",
    },
    {
      id: 8,
      name: "Pudina Punch syrup",
      price: "₹110",
      image: "/images/pudina.jpg",
      type: "homemade",
      desc: "Refreshing Mint. Homemade, fresh & preservative-free.",
    },
    {
      id: 9,
      name: "Pineapple Syrup",
      price: "₹110",
      image: "/images/pineapple.jpg",
      type: "homemade",
      desc: "Tropical Pineapple punch. Pure homemade quality.",
    },
    {
      id: 10,
      name: "Musk Melon Syrup",
      price: "₹110",
      image: "/images/muskmelon.jpg",
      type: "homemade",
      desc: "Sweet Musk Melon flavor. No preservatives, just taste.",
    },
    {
      id: 11,
      name: "Lemon Syrup",
      price: "₹110",
      image: "/images/lemon.jpg",
      type: "homemade",
      desc: "Zesty & Refreshing Lemon. Homemade with zero preservatives.",
    },
    {
      id: 12,
      name: "Butterscotch Syrup",
      price: "₹110",
      image: "/images/butterscotch.jpg",
      type: "homemade",
      desc: "Rich & Creamy Butterscotch. Pure homemade quality.",
    },
    {
      id: 13,
      name: "Jeera Syrup",
      price: "₹110",
      image: "/images/jeera.jpg",
      type: "homemade",
      desc: "Spicy Cumin (Jeera) refresher. Good for digestion, preservative-free.",
    },

    // --- 🔵 BAKE WIN ITEMS (Frozen & Ready to Cook) ---
    {
      id: 14,
      name: "Spring Roll Sheets (Small 500gm)",
      price: "₹80",
      image: "/images/roll_small.jpg",
      type: "brand",
      desc: "Bake Win 6x6 inch Sheets. Pack of 45 Sheets (Approx). Best for regular rolls.",
    },
    {
      id: 15,
      name: "Sring Roll Sheets (Large 500gm)",
      price: "₹80",
      image: "/images/roll_large.jpg",
      type: "brand",
      desc: "Bake Win 8x8 inch Sheets. Pack of 25 Sheets (Approx). Big size for jumbo rolls.",
    },
    {
      id: 16,
      name: "Samosa Patti (50 Pcs 500gm)",
      price: "₹80",
      image: "/images/samosa_50.jpg",
      type: "brand",
      desc: "Bake Win Samosa Dough Sheets (Square). Pack of 50 Sheets. Halal Certified.",
    },
    {
      id: 19,
      name: "Samosa Patti (25 Pcs 250gm)",
      price: "₹45",
      image: "/images/samosa_25.jpg",
      type: "brand",
      desc: "Bake Win Samosa Dough Sheets (Square). Pack of 25 Sheets. Perfect for small families.",
    },
    {
      id: 17,
      name: "Crispy Thread (500gm)",
      price: "₹80",
      image: "/images/crispy_thread.jpg",
      type: "brand",
      desc: "Bake Win Crispy Thread. 500g Pack. Ideal for Thread Chicken & crispy starters.",
    },
    {
      id: 18,
      name: "Samosa Patti (Long Strip)",
      price: "₹80",
      image: "/images/samosa_strip.jpg",
      type: "brand",
      desc: "Bake Win Samosa Strips (Small Patti). Thin & Crispy sheets for traditional samosas.",
    },
  ];

  // 🚀 WHATSAPP REDIRECT FUNCTION
  const buyOnWhatsApp = (productName, productPrice) => {
    const message = `As-salamu alaykum! I want to order *${productName}* (${productPrice}) from your Ramadan Store. Please let me know the details.`;
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 md:p-12 relative pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 max-w-6xl mx-auto">
        <div className="mb-4 md:mb-0 flex flex-col items-start">
          <h1 className="text-3xl font-bold text-islamic-primary mb-2">
            Ramadan Store 🛍️
          </h1>
          <p className="text-gray-400 mb-3 leading-relaxed">
            One-stop shop for{" "}
            <span className="text-green-400 font-bold">Homemade Syrups</span> &{" "}
            <span className="text-blue-400 font-bold">Iftar Essentials</span>.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-red-400 text-xs border border-red-400 px-3 py-1 rounded-full font-medium bg-red-900/10 flex items-center">
              🚫 No Preservatives (on Homemade items)
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="text-gray-400 hover:text-white border border-gray-600 px-4 py-2 rounded-full transition self-end md:self-auto mt-4 md:mt-0"
        >
          ← Back Home
        </Link>
      </div>

      {/* 📞 CONTACT BANNER */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-gray-900 to-black border border-islamic-primary/50 p-5 rounded-xl mb-10 text-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <p className="text-gray-300 text-base md:text-lg mb-2">
          📞 For more enquiry or bulk orders, contact:
        </p>
        <a
          href="tel:+919819370937"
          className="text-2xl md:text-3xl font-bold text-islamic-primary hover:text-white transition block"
        >
          +91 9819370937
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-islamic-card rounded-2xl border border-gray-800 shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300 relative"
          >
            <div
              className={`absolute top-3 left-3 z-10 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md ${product.type === "homemade" ? "bg-green-600" : "bg-blue-600"}`}
            >
              {product.type === "homemade" ? "100% HOMEMADE" : "PREMIUM BRAND"}
            </div>

            <div
              className="h-64 overflow-hidden bg-white flex items-center justify-center relative cursor-pointer"
              onClick={() => setSelectedImage(product.image)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover group-hover:opacity-90 transition"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x300?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
                <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                  Tap to View
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <span className="text-islamic-primary font-bold bg-islamic-primary/10 px-2 py-1 rounded">
                  {product.price}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {product.desc}
              </p>

              {/* 💬 UPDATED WHATSAPP BUTTON */}
              <button
                onClick={() => buyOnWhatsApp(product.name, product.price)}
                className={`w-full text-black py-3 rounded-xl hover:opacity-90 transition font-bold shadow-lg flex justify-center items-center gap-2 ${product.type === "homemade" ? "bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white" : "bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white"}`}
              >
                <span className="text-xl">💬</span> Order on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[85vh] rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] object-contain"
            />
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-islamic-primary font-bold"
              onClick={() => setSelectedImage(null)}
            >
              &times; Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
