import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // --- STATE VARIABLES ---
  const [quran, setQuran] = useState({
    para: "",
    page: "",
    ruku: "",
    sajdah: 0,
  });
  const [roza, setRoza] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 📿 TASBEEH STATES
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [tasbeehLabel, setTasbeehLabel] = useState("SubhanAllah");
  const [isCustom, setIsCustom] = useState(false);
  const [tasbeehHistory, setTasbeehHistory] = useState([]);

  // 💰 ZAKAT STATES
  const [zakatData, setZakatData] = useState({
    gold: 0,
    silver: 0,
    cash: 0,
    goldRate: 7200,
    silverRate: 90,
  });
  const [calculatedZakat, setCalculatedZakat] = useState(null);

  // 🗓️ AUTOMATIC RAMADAN DAY (New!)
  const [currentRamadanDay, setCurrentRamadanDay] = useState(0);

  // 🌍 API States & Timer
  const [city, setCity] = useState("Mumbai");
  const [country, setCountry] = useState("India");
  const [displayLocation, setDisplayLocation] = useState("Mumbai, India");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({
    name: "-",
    timeLeft: "--:--:--",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [school, setSchool] = useState(1);
  const [method, setMethod] = useState(4);

  // 🔔 REMINDER & TABS
  const [showReminder, setShowReminder] = useState(true);
  const [activeTab, setActiveTab] = useState("prayer");

  // --- HELPER: Date & Time ---
  const formatTime = (time24) => {
    if (!time24) return "--:--";
    const [hours, minutes] = time24.split(":");
    let h = parseInt(hours, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${suffix}`;
  };

  // --- 🔥 LOGIC: Calculate Ramadan Day Automatically ---
  useEffect(() => {
    const calculateRamadanDay = () => {
      const today = new Date();
      // 👇 RAMADAN START DATE: 19 Feb 2026
      const startDate = new Date("2026-02-19T00:00:00");

      // Reset time to midnight for accurate day calculation
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);

      // Difference in milliseconds
      const diffTime = today - startDate;
      // Convert to days (1000ms * 60s * 60m * 24h)
      const dayDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Day 1 starts on 19th, so we add 1 to the difference
      // If today is 19th: diff is 0 => Day 1
      // If today is 20th: diff is 1 => Day 2
      setCurrentRamadanDay(dayDiff + 1);
    };

    calculateRamadanDay();
    // Update every minute (taaki raat 12 baje turant change ho jaye)
    const interval = setInterval(calculateRamadanDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- DATA LOADING ---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.quran) setQuran((prev) => ({ ...prev, ...data.quran }));
          if (data.roza) setRoza(data.roza);
          if (data.taskList) setTaskList(data.taskList);
          if (data.tasbeehHistory) setTasbeehHistory(data.tasbeehHistory);
          if (data.location) {
            setCity(data.location.city);
            setCountry(data.location.country);
            if (data.location.school !== undefined)
              setSchool(data.location.school);
            if (data.location.method !== undefined)
              setMethod(data.location.method);
            getPrayerTimes(
              data.location.city,
              data.location.country,
              data.location.school,
              data.location.method,
              false,
            );
          } else {
            getPrayerTimes("Mumbai", "India", 1, 4, false);
          }
        } else {
          getPrayerTimes("Mumbai", "India", 1, 4, false);
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // --- ⏱️ TIMER LOGIC ---
  useEffect(() => {
    if (!prayerTimes) return;
    const interval = setInterval(() => {
      const now = new Date();
      const timeNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let upcoming = null;
      let upcomingName = "";
      for (let name of timeNames) {
        const [h, m] = prayerTimes[name].split(":");
        const pTime = new Date();
        pTime.setHours(h, m, 0);
        if (pTime > now) {
          upcoming = pTime;
          upcomingName = name;
          break;
        }
      }
      if (!upcoming) {
        upcomingName = "Fajr (Tomorrow)";
        const [h, m] = prayerTimes["Fajr"].split(":");
        upcoming = new Date();
        upcoming.setDate(upcoming.getDate() + 1);
        upcoming.setHours(h, m, 0);
      }
      const diff = upcoming - now;
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setNextPrayer({
        name: upcomingName,
        timeLeft: `${hours}h ${minutes}m ${seconds}s`,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const getPrayerTimes = async (
    cityInput,
    countryInput,
    schoolInput,
    methodInput,
    showAlert = true,
  ) => {
    if (!cityInput || !countryInput) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityInput}&country=${countryInput}&method=${methodInput}&school=${schoolInput}`,
      );
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setDisplayLocation(`${cityInput}, ${countryInput}`);
        if (showAlert) alert(`Time updated for ${cityInput}! ✅`);
        if (user)
          await setDoc(
            doc(db, "users", user.uid),
            {
              location: {
                city: cityInput,
                country: countryInput,
                school: schoolInput,
                method: methodInput,
              },
            },
            { merge: true },
          );
      } else {
        if (showAlert) alert("City not found!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSearching(false);
  };

  const handleSaveQuran = async () => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), { quran: quran }, { merge: true });
    alert("Updated!");
  };
  const handleUpdateRoza = async () => {
    if (!user) return;
    const newCount = roza + 1;
    setRoza(newCount);
    await setDoc(
      doc(db, "users", user.uid),
      { roza: newCount },
      { merge: true },
    );
  };
  const handleUndoRoza = async () => {
    if (!user) return;
    if (roza <= 0) return;
    const newCount = roza - 1;
    setRoza(newCount);
    await setDoc(
      doc(db, "users", user.uid),
      { roza: newCount },
      { merge: true },
    );
  };
  const addTask = async () => {
    if (!newTask.trim() || !user) return;
    const updatedList = [
      ...taskList,
      { id: Date.now(), text: newTask, done: false },
    ];
    setTaskList(updatedList);
    setNewTask("");
    await setDoc(
      doc(db, "users", user.uid),
      { taskList: updatedList },
      { merge: true },
    );
  };
  const deleteTask = async (id) => {
    if (!user) return;
    const updatedList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedList);
    await setDoc(
      doc(db, "users", user.uid),
      { taskList: updatedList },
      { merge: true },
    );
  };
  const toggleTask = async (id) => {
    if (!user) return;
    const updatedList = taskList.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
    setTaskList(updatedList);
    await setDoc(
      doc(db, "users", user.uid),
      { taskList: updatedList },
      { merge: true },
    );
  };
  const handleTasbeehClick = () => {
    setTasbeehCount(tasbeehCount + 1);
    if (navigator.vibrate) navigator.vibrate(50);
  };
  const resetTasbeeh = () => {
    if (window.confirm("Reset counter?")) {
      setTasbeehCount(0);
      if (isCustom) setTasbeehLabel("");
    }
  };
  const saveTasbeehSession = async () => {
    if (tasbeehCount === 0) return alert("Read something first!");
    if (!user) return;
    const newSession = {
      id: Date.now(),
      name: tasbeehLabel || "Custom Zikr",
      count: tasbeehCount,
      date: new Date().toLocaleDateString(),
    };
    const updatedHistory = [newSession, ...tasbeehHistory];
    setTasbeehHistory(updatedHistory);
    await setDoc(
      doc(db, "users", user.uid),
      { tasbeehHistory: updatedHistory },
      { merge: true },
    );
    setTasbeehCount(0);
    if (isCustom) setTasbeehLabel("");
    alert("Saved! 💾");
  };
  const deleteHistoryItem = async (id) => {
    const updatedHistory = tasbeehHistory.filter((item) => item.id !== id);
    setTasbeehHistory(updatedHistory);
    await setDoc(
      doc(db, "users", user.uid),
      { tasbeehHistory: updatedHistory },
      { merge: true },
    );
  };
  const calculateZakat = () => {
    const total =
      zakatData.gold * zakatData.goldRate +
      zakatData.silver * zakatData.silverRate +
      Number(zakatData.cash);
    setCalculatedZakat(Math.floor(total * 0.025));
  };
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const progressPercent = (roza / 30) * 100;

  // 🌙 Helper for Popup Text
  const getRamadanDayText = () => {
    if (currentRamadanDay < 1) return "Ramadan Starts Soon! 🌙";
    if (currentRamadanDay > 30) return "Eid Mubarak! 🌙";
    return `Ramadan Day ${currentRamadanDay} 🌙`;
  };

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 md:p-12 relative pb-24">
      {/* 🔔 REMINDER POPUP (Updated Logic) */}
      {showReminder && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-islamic-card border border-islamic-primary/50 p-6 md:p-8 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.2)] max-w-lg w-full text-center relative">
            <button
              onClick={() => setShowReminder(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            {/* 👇 DYNAMIC DATE DISPLAY HERE */}
            <h2 className="text-3xl font-bold text-islamic-primary mb-2">
              {getRamadanDayText()}
            </h2>

            <p className="text-gray-300 italic mb-6">
              "Keep patience & gratitude today."
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
                <p className="text-2xl">🍽️</p>
                <p className="font-semibold text-sm mt-1 text-white">Fasting</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
                <p className="text-2xl">🕌</p>
                <p className="font-semibold text-sm mt-1 text-white">Namaz</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
                <p className="text-2xl">💰</p>
                <p className="font-semibold text-sm mt-1 text-white">Zakat</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
                <p className="text-2xl">📝</p>
                <p className="font-semibold text-sm mt-1 text-white">Notes</p>
              </div>
            </div>
            <button
              onClick={() => setShowReminder(false)}
              className="w-full bg-islamic-primary text-black font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Bismillah, I'm Ready! ✅
            </button>
          </div>
        </div>
      )}

      {/* --- DASHBOARD HEADER --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-islamic-primary">
            My Dashboard 🌙
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Welcome, {user?.email?.split("@")[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-900/30 text-red-400 border border-red-900 px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-red-900/50 transition text-sm"
        >
          Logout
        </button>
      </div>

      {/* --- 🔘 TAB BUTTONS --- */}
      <div className="overflow-x-auto pb-2 mb-4 md:mb-8 no-scrollbar">
        <div className="flex gap-2 md:gap-4 bg-gray-900/50 p-2 rounded-xl border border-gray-800 min-w-max md:w-full md:max-w-xl">
          <button
            onClick={() => setActiveTab("prayer")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "prayer" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>🕌</span> Prayer
          </button>
          <button
            onClick={() => setActiveTab("roza")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "roza" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>🍽️</span> Fasting
          </button>
          <button
            onClick={() => setActiveTab("quran")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "quran" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>📖</span> Quran
          </button>
          <button
            onClick={() => setActiveTab("zakat")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "zakat" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>💰</span> Zakat
          </button>
          <button
            onClick={() => setActiveTab("tasbeeh")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "tasbeeh" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>📿</span> Tasbeeh
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === "notes" ? "bg-islamic-primary text-black" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <span>📝</span> Notes
          </button>
        </div>
      </div>

      {/* --- DYNAMIC CONTENT --- */}
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* 1. PRAYER TIMES */}
        {activeTab === "prayer" && (
          <div className="bg-islamic-card p-6 rounded-2xl border border-gray-800 shadow-lg">
            <div className="bg-gradient-to-r from-gray-900 to-black border border-islamic-primary/30 p-4 rounded-xl mb-6 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                Next Prayer
              </p>
              <h3 className="text-2xl font-bold text-islamic-primary">
                {nextPrayer.name}
              </h3>
              <p className="text-3xl md:text-4xl font-mono text-white mt-1 font-bold animate-pulse">
                {nextPrayer.timeLeft}
              </p>
            </div>
            {/* --- PRAYER TIMES HEADER & QIBLA BUTTON --- */}
            <div className="border-b border-gray-700 pb-4 mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-islamic-primary">
                  Prayer Times 🕌
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  in{" "}
                  <span className="text-white font-bold uppercase">
                    {displayLocation}
                  </span>
                </p>
              </div>

              {/* 🧭 Qibla Button */}
              <Link
                to="/qibla"
                className="bg-gray-800 border border-gray-700 text-islamic-primary px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-black/50 hover:bg-gray-700 hover:text-yellow-400 transition-all active:scale-95"
              >
                <span className="text-xl">🧭</span> Qibla
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <select
                value={school}
                onChange={(e) => setSchool(Number(e.target.value))}
                className="bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded p-2 outline-none"
              >
                <option value={1}>Fiqh: Hanafi</option>
                <option value={0}>Fiqh: Standard</option>
              </select>
              <select
                value={method}
                onChange={(e) => setMethod(Number(e.target.value))}
                className="bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded p-2 outline-none"
              >
                <option value={2}>Method: ISNA</option>
                <option value={4}>Method: Makkah</option>
                <option value={1}>Method: MWL</option>
              </select>
            </div>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-1/2 bg-black border border-gray-700 rounded p-2 text-white text-sm outline-none"
                placeholder="City"
              />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-1/3 bg-black border border-gray-700 rounded p-2 text-white text-sm outline-none"
                placeholder="Country"
              />
              <button
                onClick={() =>
                  getPrayerTimes(city, country, school, method, true)
                }
                className="bg-islamic-primary text-black font-bold px-3 rounded hover:opacity-80 flex items-center justify-center min-w-[40px]"
              >
                {isSearching ? "..." : "🔎"}
              </button>
            </div>
            {prayerTimes ? (
              <ul className="space-y-3">
                {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((time) => (
                  <li
                    key={time}
                    className={`flex justify-between items-center p-4 rounded-lg border transition ${nextPrayer.name === time ? "bg-islamic-primary/20 border-islamic-primary" : "bg-black/40 border-gray-700/50"}`}
                  >
                    <span
                      className={
                        nextPrayer.name === time
                          ? "text-islamic-primary font-bold"
                          : "text-gray-300"
                      }
                    >
                      {time}
                    </span>
                    <span className="font-mono text-islamic-primary font-bold">
                      {formatTime(prayerTimes[time])}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 animate-pulse mt-4">
                Loading times...
              </p>
            )}
          </div>
        )}

        {/* 2. ROZA */}
        {activeTab === "roza" && (
          <div className="bg-islamic-card p-8 rounded-2xl border border-gray-800 shadow-lg flex flex-col justify-center text-center h-[400px]">
            <h2 className="text-2xl font-semibold text-islamic-primary mb-6">
              Fasting Tracker 🍽️
            </h2>
            <div className="w-full bg-gray-800 rounded-full h-6 mb-6 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-islamic-primary to-yellow-600 h-6 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-white text-5xl font-bold mb-2">
              {roza}{" "}
              <span className="text-xl font-normal text-gray-400">/ 30</span>
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={handleUndoRoza}
                className="bg-gray-800 text-white font-bold w-12 h-12 rounded-full hover:bg-red-600 transition flex items-center justify-center text-xl border border-gray-700"
              >
                {" "}
                -{" "}
              </button>
              <button
                onClick={handleUpdateRoza}
                className="flex-1 bg-islamic-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition"
              >
                Mark Today Complete ✅
              </button>
            </div>
          </div>
        )}

        {/* 3. QURAN */}
        {activeTab === "quran" && (
          <div className="bg-islamic-card p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-islamic-primary mb-6 border-b border-gray-700 pb-2">
              Quran Tracker 📖
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Para (Juz)</label>
                <input
                  type="number"
                  value={quran.para}
                  onChange={(e) => setQuran({ ...quran, para: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white mt-1 outline-none"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Page Number</label>
                <input
                  type="number"
                  value={quran.page}
                  onChange={(e) => setQuran({ ...quran, page: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white mt-1 outline-none"
                  placeholder="20"
                />
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-gray-700 mt-4 flex justify-between items-center">
                <span className="text-gray-300">Sajdahs:</span>
                <div className="flex items-center gap-4 bg-gray-900 rounded-lg px-2 py-1 border border-gray-700">
                  <button
                    onClick={() =>
                      quran.sajdah > 0 &&
                      setQuran({ ...quran, sajdah: quran.sajdah - 1 })
                    }
                    className="text-gray-400 hover:text-white text-xl px-2"
                  >
                    -
                  </button>
                  <span className="font-mono text-lg font-bold text-islamic-primary w-6 text-center">
                    {quran.sajdah}
                  </span>
                  <button
                    onClick={() =>
                      quran.sajdah < 14 &&
                      setQuran({ ...quran, sajdah: quran.sajdah + 1 })
                    }
                    className="text-islamic-primary font-bold text-xl px-2"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleSaveQuran}
                className="w-full bg-transparent border border-islamic-primary text-islamic-primary py-3 rounded-xl hover:bg-islamic-primary hover:text-black transition mt-4 font-bold"
              >
                Update Progress 💾
              </button>
            </div>
          </div>
        )}

        {/* 4. ZAKAT */}
        {activeTab === "zakat" && (
          <div className="bg-islamic-card p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-islamic-primary mb-2">
              Zakat Calculator 💰
            </h2>
            <p className="text-gray-400 text-sm mb-6 border-b border-gray-700 pb-4">
              Check how much Zakat is due on your assets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-bold flex justify-between">
                  <span>Gold (in Grams)</span>
                  <span className="text-xs text-islamic-primary">
                    Rate: ₹{zakatData.goldRate}/g
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Weight (g)"
                    value={zakatData.gold}
                    onChange={(e) =>
                      setZakatData({ ...zakatData, gold: e.target.value })
                    }
                    className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-islamic-primary"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={zakatData.goldRate}
                    onChange={(e) =>
                      setZakatData({ ...zakatData, goldRate: e.target.value })
                    }
                    className="w-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-400 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-bold flex justify-between">
                  <span>Silver (in Grams)</span>
                  <span className="text-xs text-islamic-primary">
                    Rate: ₹{zakatData.silverRate}/g
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Weight (g)"
                    value={zakatData.silver}
                    onChange={(e) =>
                      setZakatData({ ...zakatData, silver: e.target.value })
                    }
                    className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-islamic-primary"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={zakatData.silverRate}
                    onChange={(e) =>
                      setZakatData({ ...zakatData, silverRate: e.target.value })
                    }
                    className="w-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-400 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 text-sm font-bold">
                  Cash / Bank Balance / Savings
                </label>
                <input
                  type="number"
                  placeholder="Amount in ₹"
                  value={zakatData.cash}
                  onChange={(e) =>
                    setZakatData({ ...zakatData, cash: e.target.value })
                  }
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-islamic-primary"
                />
              </div>
            </div>
            <button
              onClick={calculateZakat}
              className="w-full bg-gradient-to-r from-islamic-primary to-yellow-600 text-black font-bold py-3 rounded-xl hover:opacity-90 transition mt-6 shadow-lg"
            >
              Calculate Zakat 🧮
            </button>
            {calculatedZakat !== null && (
              <div className="mt-6 bg-green-900/20 border border-green-600 p-4 rounded-xl text-center animate-fade-in">
                <p className="text-gray-300 text-sm">Payable Zakat Amount</p>
                <h3 className="text-4xl font-bold text-green-400 mt-1">
                  ₹ {calculatedZakat.toLocaleString()}
                </h3>
                <p className="text-xs text-gray-400 mt-2 italic">
                  (2.5% of Total Wealth)
                </p>
              </div>
            )}
          </div>
        )}

        {/* 5. TASBEEH */}
        {activeTab === "tasbeeh" && (
          <div className="bg-islamic-card p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-semibold text-islamic-primary mb-4">
              Digital Tasbeeh 📿
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-900 p-2 rounded-lg max-w-sm">
              {["SubhanAllah", "Alhamdulillah", "Allahu Akbar"].map((zikr) => (
                <button
                  key={zikr}
                  onClick={() => {
                    setTasbeehLabel(zikr);
                    setIsCustom(false);
                    setTasbeehCount(0);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${tasbeehLabel === zikr && !isCustom ? "bg-islamic-primary text-black" : "text-gray-400 hover:text-white"}`}
                >
                  {zikr}
                </button>
              ))}
              <button
                onClick={() => {
                  setTasbeehLabel("");
                  setIsCustom(true);
                  setTasbeehCount(0);
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition ${isCustom ? "bg-islamic-primary text-black" : "text-gray-400 hover:text-white"}`}
              >
                Custom ✏️
              </button>
            </div>
            <button
              onClick={handleTasbeehClick}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-islamic-primary shadow-[0_0_30px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center active:scale-95 transition-transform duration-100 group"
            >
              <span className="text-5xl font-mono font-bold text-white group-hover:text-islamic-primary transition">
                {tasbeehCount}
              </span>
              <span className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
                Count
              </span>
            </button>
            {isCustom ? (
              <input
                type="text"
                placeholder="Type your Zikr here..."
                value={tasbeehLabel}
                onChange={(e) => setTasbeehLabel(e.target.value)}
                className="mt-8 bg-transparent border-b border-gray-600 text-center text-xl text-islamic-primary outline-none focus:border-islamic-primary w-2/3"
              />
            ) : (
              <p className="mt-8 text-xl text-islamic-primary font-serif italic">
                "{tasbeehLabel}"
              </p>
            )}
            <div className="flex gap-4 mt-8 w-full max-w-xs">
              <button
                onClick={resetTasbeeh}
                className="flex-1 border border-red-500/50 text-red-400 hover:bg-red-900/20 py-2 rounded-lg transition text-sm font-bold"
              >
                Reset 🔄
              </button>
              <button
                onClick={saveTasbeehSession}
                className="flex-1 bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg transition text-sm font-bold shadow-lg"
              >
                Save 💾
              </button>
            </div>
            {tasbeehHistory.length > 0 && (
              <div className="w-full mt-8 border-t border-gray-800 pt-4">
                <h3 className="text-gray-400 text-sm font-bold mb-3 text-left">
                  My Zikr History 📜
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {tasbeehHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-gray-800"
                    >
                      <div>
                        <p className="text-islamic-primary font-semibold text-sm">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-xs">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-white font-bold">
                          {item.count}
                        </span>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="text-red-500 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. NOTES */}
        {activeTab === "notes" && (
          <div className="bg-islamic-card p-6 rounded-2xl border border-gray-800 shadow-lg min-h-[400px]">
            <h2 className="text-xl font-semibold text-islamic-primary mb-2">
              My Ramadan Tasks 📝
            </h2>
            <p className="text-gray-400 text-sm italic mb-6 border-b border-gray-700 pb-4">
              "Allah aapke nek kaam aur ibadaat ko qubool karein. Ameen." 🤲
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-islamic-primary placeholder-gray-600"
                placeholder="Ex: Buy fruits, Read Surah Yasin..."
              />
              <button
                onClick={addTask}
                className="bg-islamic-primary text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Add ➕
              </button>
            </div>
            <div className="space-y-3">
              {taskList.length === 0 ? (
                <p className="text-center text-gray-500 mt-10 italic">
                  No tasks yet. Plan your day! 🌙
                </p>
              ) : (
                taskList.map((task) => (
                  <div
                    key={task.id}
                    className={`flex justify-between items-center p-3 rounded-xl border ${task.done ? "bg-green-900/20 border-green-800 opacity-60" : "bg-black/40 border-gray-700"}`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${task.done ? "bg-green-500 border-green-500" : "border-gray-500"}`}
                      >
                        {task.done && (
                          <span className="text-black text-xs">✓</span>
                        )}
                      </div>
                      <span
                        className={`${task.done ? "line-through text-gray-500" : "text-gray-200"}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-200 p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
