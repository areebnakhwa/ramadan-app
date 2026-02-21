import React from "react";
import { Link } from "react-router-dom";

const Schedule = () => {
  // ✅ FULL 30 DAYS SCHEDULE DATA (Mumbai 2026 Estimate)
  const scheduleData = [
    // --- PEHLA ASHRA (Rehmat) ---
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

    // --- DUSRA ASHRA (Maghfirat) ---
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

    // --- TEESRA ASHRA (Nijaat) ---
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

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-4 md:p-12 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-islamic-primary">
          Ramadan Schedule 🗓️
        </h1>
        <Link
          to="/"
          className="text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded-full transition text-sm"
        >
          ← Back Home
        </Link>
      </div>

      {/* 📥 DOWNLOAD SECTION */}
      <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-gray-900 to-black border border-islamic-primary/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div>
          <h3 className="text-lg font-bold text-white">Save Timetable 💾</h3>
          <p className="text-gray-400 text-xs">
            Download the official card to your gallery.
          </p>
        </div>

        {/* 👇 YEH HAI FRESH 100% WORKING DOWNLOAD LINK 👇 */}
        <a
          href="/ramadan-timetable.jpg"
          download="Ramadan_Timetable.jpg"
          className="bg-islamic-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2"
        >
          <span>📥</span> Download Image
        </a>
      </div>

      {/* 📊 SCHEDULE TABLE */}
      <div className="max-w-4xl mx-auto bg-islamic-card rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        {/* Table Head */}
        <div className="grid grid-cols-4 bg-islamic-primary text-black font-bold p-3 text-center text-xs md:text-base sticky top-0 z-10">
          <div>Roza</div>
          <div>Date</div>
          <div>Sehri Ends</div>
          <div>Iftar Time</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-800">
          {scheduleData.map((day) => (
            <div
              key={day.roza}
              className="grid grid-cols-4 p-3 text-center hover:bg-white/5 transition text-xs md:text-sm"
            >
              <div className="font-bold text-islamic-primary">{day.roza}</div>
              <div className="text-gray-300">{day.date}</div>
              <div className="text-green-400 font-mono">{day.sehri}</div>
              <div className="text-yellow-400 font-mono">{day.iftar}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <p className="text-center text-gray-500 text-xs mt-6 max-w-4xl mx-auto">
        * Timings are based on Mumbai coordinates. Please add +/- 2 mins
        precaution.
      </p>
    </div>
  );
};

export default Schedule;
