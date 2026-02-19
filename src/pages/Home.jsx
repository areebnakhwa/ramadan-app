import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [sehriTime, setSehriTime] = useState("--:--");
  const [iftarTime, setIftarTime] = useState("--:--");
  const [todaysHadith, setTodaysHadith] = useState({ text: "", source: "" });

  // ✨ HADITH COLLECTION (Jo Roz Badlegi)
  const hadithCollection = [
    {
      text: "When Ramadan enters, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "The best among you is the one who learns the Quran and teaches it.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "Fasting is a shield; it protects from the fire of Hell like a shield protects you in battle.",
      source: "Sunan An-Nasa'i",
    },
    {
      text: "Actions are judged by intentions, so each man will have what he intended.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "Smiling in the face of your brother is an act of charity.",
      source: "Jami` at-Tirmidhi",
    },
    {
      text: "He who is not grateful to people is not grateful to Allah.",
      source: "Sunan Abi Dawud",
    },
    { text: "Cleanliness is half of faith (Iman).", source: "Sahih Muslim" },
    {
      text: "The strong man is not the one who can overpower others, but the one who controls himself when angry.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "Exchange gifts, as that will lead to increasing your love for one another.",
      source: "Al-Adab Al-Mufrad",
    },
    { text: "Allah is Beautiful and He loves beauty.", source: "Sahih Muslim" },
    {
      text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
      source: "Sahih Al-Bukhari",
    },
    {
      text: "Do not get angry, and Paradise will be yours.",
      source: "Tabarani",
    },
    { text: "A good word is a form of charity.", source: "Sahih Al-Bukhari" },
    {
      text: "Feed the hungry, visit the sick, and set free the captives.",
      source: "Sahih Al-Bukhari",
    },
  ];

  // --- 🛠️ HELPER: Time Adjuster (For Local Calendar Match) ---
  const adjustTime = (timeStr, minutesOffset) => {
    if (!timeStr) return timeStr;
    const cleanTime = timeStr.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + minutesOffset);
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");
    return `${newHours}:${newMinutes}`;
  };

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    // 1. Gregorian Date
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    setGregorianDate(today.toLocaleDateString("en-US", options));

    // 2. Hijri Date Logic (India Fix)
    if (year === 2026 && month === 1) {
      if (day === 17) setHijriDate("Sha'ban 28, 1447 AH");
      else if (day === 18) setHijriDate("Sha'ban 29, 1447 AH");
      else if (day >= 19) {
        const ramadanDay = day - 18;
        setHijriDate(`Ramadan ${ramadanDay}, 1447 AH`);
      } else {
        setHijriDate("Sha'ban, 1447 AH");
      }
    } else {
      setHijriDate(
        new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(Date.now()),
      );
    }

    // 3. Hadith Logic
    const index = day % hadithCollection.length;
    setTodaysHadith(hadithCollection[index]);

    // 4. Timings API
    const getTimings = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=Mumbai&country=India&method=1&school=1`,
        );
        const data = await response.json();

        // 🚨 YAHAN LOCAL CALENDAR KA OFFSET LAGA HAI 🚨
        const adjustedSehri = adjustTime(data.data.timings.Fajr, -10); // Sehri 10 min pehle band
        const adjustedIftar = adjustTime(data.data.timings.Maghrib, 3); // Iftar 3 min baad

        setSehriTime(adjustedSehri);
        setIftarTime(adjustedIftar);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getTimings();
  }, []);

  const formatTime = (time24) => {
    if (time24 === "--:--") return "--:--";
    const [hours, minutes] = time24.split(":");
    let h = parseInt(hours, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${suffix}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">
      {/* 1. Date Card */}
      <div className="bg-islamic-card border border-gray-800 p-6 rounded-2xl text-center shadow-lg">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h2 className="text-islamic-primary font-bold text-lg">
            Today's Date
          </h2>
          <span className="text-2xl">🗓️</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          {hijriDate}
        </h1>
        <p className="text-gray-400 font-mono">{gregorianDate}</p>
      </div>

      {/* 2. Timings Card */}
      <div className="bg-islamic-card border border-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-center items-center gap-2 mb-4">
          <h2 className="text-islamic-primary font-bold text-lg">
            Mumbai Timings
          </h2>
          <span className="text-2xl">🕌</span>
        </div>
        <div className="flex justify-between items-center px-4 md:px-10">
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Sehri Ends
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {formatTime(sehriTime)}
            </p>
          </div>
          <div className="h-10 w-[1px] bg-gray-700"></div>
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Iftar Time
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {formatTime(iftarTime)}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Hadith Card (Dynamic) */}
      <div className="bg-islamic-card border border-gray-800 p-6 rounded-2xl text-center shadow-lg transform hover:scale-[1.02] transition duration-300">
        <div className="flex justify-center items-center gap-2 mb-3">
          <h2 className="text-islamic-primary font-bold text-lg">
            Hadith of the Day
          </h2>
          <span className="text-lg">✨</span>
        </div>
        <p className="text-gray-300 italic text-lg leading-relaxed">
          "{todaysHadith.text}" <br />
          <span className="text-gray-500 text-sm mt-3 block font-semibold text-islamic-primary">
            — {todaysHadith.source}
          </span>
        </p>
      </div>

      {/* --- EXPLORE MORE FEATURES SECTION --- */}
      <div className="mt-8 mb-4 animate-fade-in-up">
        {/* Divider & Title */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-[1px] bg-gray-800 flex-1"></div>
          <h3 className="text-xs font-bold text-islamic-primary uppercase tracking-widest">
            Explore Features
          </h3>
          <div className="h-[1px] bg-gray-800 flex-1"></div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/dashboard"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:border-islamic-primary transition-all active:scale-95 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🌙
            </span>
            <span className="text-sm font-bold text-white mb-1">Dashboard</span>
            <span className="text-[10px] text-gray-400">
              Track Fast & Namaz
            </span>
          </Link>

          <Link
            to="/99names"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:border-islamic-primary transition-all active:scale-95 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              ✨
            </span>
            <span className="text-sm font-bold text-white mb-1">99 Names</span>
            <span className="text-[10px] text-gray-400">Asma-ul-Husna</span>
          </Link>

          <Link
            to="/duas"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:border-islamic-primary transition-all active:scale-95 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🤲
            </span>
            <span className="text-sm font-bold text-white mb-1">
              Daily Duas
            </span>
            <span className="text-[10px] text-gray-400">
              Ayatul Kursi & more
            </span>
          </Link>

          <Link
            to="/schedule"
            className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:border-islamic-primary transition-all active:scale-95 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              📅
            </span>
            <span className="text-sm font-bold text-white mb-1">Schedule</span>
            <span className="text-[10px] text-gray-400">
              Full Month Timetable
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
