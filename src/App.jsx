import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // 👈 1. YAHAN IMPORT ADD KIYA
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Shop from "./pages/Shop";
import Duas from "./pages/Duas";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-islamic-bg text-white font-sans flex flex-col pb-16 md:pb-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* 👈 2. YAHAN ROUTE ADD KIYA */}
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/duas" element={<Duas />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;
