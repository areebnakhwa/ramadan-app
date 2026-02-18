import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 📧 Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ya password galat hai.");
    }
  };

  // 🔵 Google Login Logic (New Feature)
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check karo user pehle se hai ya naya hai
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Naya user hai toh data save karo
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          roza: 0,
          quran: { para: "", page: "", ruku: "", sajdah: 0 },
        });
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Google Login fail ho gaya. Phir se try karein.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-islamic-primary mb-2 text-center">
          Welcome Back 🌙
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to continue your journey
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-900/20 p-2 rounded border border-red-500/50">
            {error}
          </p>
        )}

        {/* 📧 Email Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs ml-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white outline-none focus:border-islamic-primary mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white outline-none focus:border-islamic-primary mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-islamic-primary text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg mt-2"
          >
            Login
          </button>
        </form>

        {/* ─── OR DIVIDER ─── */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-xs uppercase">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* 🔵 GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-md"
        >
          {/* Google Icon SVG */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Login with Google
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-islamic-primary hover:underline font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
