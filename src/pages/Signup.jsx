import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 📧 Email Signup Logic
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        roza: 0,
        quran: { para: "", page: "", ruku: "", sajdah: 0 },
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔵 Google Signup Logic
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          roza: 0,
          quran: { para: "", page: "", ruku: "", sajdah: 0 },
        });
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Google Signup fail ho gaya.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-islamic-primary mb-2 text-center">
          Create Account 🌙
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Join us for a spiritual journey
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-900/20 p-2 rounded border border-red-500/50">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
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
              placeholder="Create a password"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white outline-none focus:border-islamic-primary mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-islamic-primary text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-xs uppercase">
            Or sign up with
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up with Google
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-islamic-primary hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
