import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const scheduleData = [
  { roza: 1, date: "19 Feb (Thu)", sehri: "05:41 AM", iftar: "06:43 PM" },
  { roza: 2, date: "20 Feb (Fri)", sehri: "05:40 AM", iftar: "06:44 PM" },
  { roza: 3, date: "21 Feb (Sat)", sehri: "05:40 AM", iftar: "06:44 PM" },
  { roza: 4, date: "22 Feb (Sun)", sehri: "05:39 AM", iftar: "06:44 PM" },
  { roza: 5, date: "23 Feb (Mon)", sehri: "05:39 AM", iftar: "06:45 PM" },
  { roza: 6, date: "24 Feb (Tue)", sehri: "05:38 AM", iftar: "06:45 PM" },
  { roza: 7, date: "25 Feb (Wed)", sehri: "05:37 AM", iftar: "06:45 PM" },
  { roza: 8, date: "26 Feb (Thu)", sehri: "05:37 AM", iftar: "06:46 PM" },
  { roza: 9, date: "27 Feb (Fri)", sehri: "05:36 AM", iftar: "06:46 PM" },
  { roza: 10, date: "28 Feb (Sat)", sehri: "05:36 AM", iftar: "06:46 PM" },
  { roza: 11, date: "01 Mar (Sun)", sehri: "05:35 AM", iftar: "06:47 PM" },
  { roza: 12, date: "02 Mar (Mon)", sehri: "05:34 AM", iftar: "06:47 PM" },
  { roza: 13, date: "03 Mar (Tue)", sehri: "05:33 AM", iftar: "06:47 PM" },
  { roza: 14, date: "04 Mar (Wed)", sehri: "05:33 AM", iftar: "06:48 PM" },
  { roza: 15, date: "05 Mar (Thu)", sehri: "05:32 AM", iftar: "06:48 PM" },
  { roza: 16, date: "06 Mar (Fri)", sehri: "05:31 AM", iftar: "06:48 PM" },
  { roza: 17, date: "07 Mar (Sat)", sehri: "05:30 AM", iftar: "06:49 PM" },
  { roza: 18, date: "08 Mar (Sun)", sehri: "05:30 AM", iftar: "06:49 PM" },
  { roza: 19, date: "09 Mar (Mon)", sehri: "05:29 AM", iftar: "06:49 PM" },
  { roza: 20, date: "10 Mar (Tue)", sehri: "05:28 AM", iftar: "06:50 PM" },
  { roza: 21, date: "11 Mar (Wed)", sehri: "05:27 AM", iftar: "06:50 PM" },
  { roza: 22, date: "12 Mar (Thu)", sehri: "05:26 AM", iftar: "06:50 PM" },
  { roza: 23, date: "13 Mar (Fri)", sehri: "05:25 AM", iftar: "06:51 PM" },
  { roza: 24, date: "14 Mar (Sat)", sehri: "05:25 AM", iftar: "06:51 PM" },
  { roza: 25, date: "15 Mar (Sun)", sehri: "05:24 AM", iftar: "06:51 PM" },
  { roza: 26, date: "16 Mar (Mon)", sehri: "05:23 AM", iftar: "06:52 PM" },
  { roza: 27, date: "17 Mar (Tue)", sehri: "05:22 AM", iftar: "06:52 PM" },
  { roza: 28, date: "18 Mar (Wed)", sehri: "05:21 AM", iftar: "06:52 PM" },
  { roza: 29, date: "19 Mar (Thu)", sehri: "05:20 AM", iftar: "06:53 PM" },
  { roza: 30, date: "20 Mar (Fri)", sehri: "05:19 AM", iftar: "06:53 PM" },
];

const Home = () => {
  const [todayData, setTodayData] = useState(null);
  const [displayDate, setDisplayDate] = useState("");

  // Eid Special States
  const [isEid, setIsEid] = useState(false);
  const [showEidPopup, setShowEidPopup] = useState(false);

  useEffect(() => {
    // Asli Date nikalne ke liye
    let today = new Date();

    // 🛑 EID TEST KARNE KE LIYE:
    // Agar aaj hi popup dekhna hai, toh is line ke aage se '//' hata do! 👇
    // today = new Date('2026-03-21T10:00:00');

    const dateOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    setDisplayDate(today.toLocaleDateString("en-US", dateOptions));

    const day = String(today.getDate()).padStart(2, "0");
    const month = today.toLocaleString("en-US", { month: "short" });
    const searchString = `${day} ${month}`;

    const foundDay = scheduleData.find((item) =>
      item.date.includes(searchString),
    );
    if (foundDay) {
      setTodayData(foundDay);
    }

    // --- EID LOGIC ---
    // Agar date 21 March se 25 March 2026 ke beech ki hai, toh Eid mode ON kardo
    const eidStart = new Date("2026-03-21T00:00:00");
    const eidEnd = new Date("2026-03-25T23:59:59");

    if (today >= eidStart && today <= eidEnd) {
      setIsEid(true);
      setShowEidPopup(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-4 pb-24 relative">
      {/* 🎆 EID SPECIAL POP-UP MODAL 🎆 */}
      {showEidPopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-2xl p-8 text-center max-w-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-[wiggle_1s_ease-in-out]">
            <div className="text-6xl mb-4 animate-bounce">🕌✨</div>
            <h2 className="text-3xl font-bold text-islamic-primary mb-3">
              Eid Mubarak!
            </h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              May Allah (SWT) accept all your Roze, Duas, and Ibadat from this
              blessed month. Wishing you and your family a joyous Eid! 🌙
            </p>
            <button
              onClick={() => setShowEidPopup(false)}
              className="bg-islamic-primary text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition active:scale-95 shadow-lg w-full"
            >
              Ameen ❤️
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto space-y-4 mt-4">
        {/* Agar Eid hai toh Normal Time Table chhupa kar Eid ka Card dikhao */}
        {isEid ? (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/50 rounded-2xl p-8 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-8">
            <h2 className="text-4xl font-bold text-islamic-primary mb-2 mt-2">
              Eid Mubarak! 🌙
            </h2>
            <p className="text-gray-300 text-sm mt-4 font-bold">
              Taqabbal Allahu Minna Wa Minkum
            </p>
            <p className="text-gray-500 text-xs mt-1">
              (May Allah accept it from you and us)
            </p>
          </div>
        ) : (
          <>
            {/* NORMAL RAMADAN CARDS (Today's Date & Timings) */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <p className="text-islamic-primary font-bold mb-2">
                Today's Date 🗓️
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {todayData
                  ? `Ramadan ${todayData.roza}, 1447 AH`
                  : "Ramadan 1447 AH"}
              </h2>
              <p className="text-gray-400 text-sm">{displayDate}</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <p className="text-islamic-primary font-bold mb-4">
                Mumbai Timings 🕌
              </p>
              <div className="flex justify-between items-center">
                <div className="flex-1 border-r border-gray-700">
                  <p className="text-xs text-gray-400 tracking-wider mb-1">
                    SEHRI ENDS
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {todayData ? todayData.sehri : "--:-- AM"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 tracking-wider mb-1">
                    IFTAR TIME
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {todayData ? todayData.iftar : "--:-- PM"}
                  </p>
                </div>
              </div>
              {!todayData && (
                <p className="text-xs text-yellow-500 mt-4">
                  Ramadan has not started or is over.
                </p>
              )}
            </div>
          </>
        )}

        {/* Card 3: Hadith of the Day (Hamesha dikhega) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg mb-8">
          <p className="text-islamic-primary font-bold mb-3">
            Hadith of the Day ✨
          </p>
          <p className="text-gray-300 italic mb-2 text-sm md:text-base">
            "Cleanliness is half of faith (Iman)."
          </p>
          <p className="text-xs text-gray-500">— Sahih Muslim</p>
        </div>

        {/* --- "APP MEIN KYA KHAAS HAI" SECTION --- */}
        <div className="flex items-center justify-center gap-4 my-8 mt-10">
          <div className="h-px bg-gray-800 flex-1"></div>
          <span className="text-xs text-islamic-primary font-bold tracking-widest uppercase">
            App Mein Kya Khaas Hai?
          </span>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
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
