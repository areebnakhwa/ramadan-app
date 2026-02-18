import React from "react";
import { Link } from "react-router-dom";

const Duas = () => {
  // 📝 DUA LIST (Clean Wording + Added Laylatul Qadr)
  const duasList = [
    {
      id: 1,
      title: "Sehri ki Dua (Intention for fasting) 🌌",
      arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      transliteration: "Wa bisawmi ghadin nawaytu min shahri ramadan.",
      meaning:
        "I intend to keep the fast for tomorrow in the month of Ramadan.",
    },
    {
      id: 2,
      title: "Iftar ki Dua (Breaking Fast) 🥣",
      arabic:
        "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      transliteration:
        "Allahumma inni laka sumtu wa bika aamantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu.",
      meaning:
        "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance.",
    },
    {
      id: 3,
      title: "Pahla Ashra (Rehmat) - Days 1-10 🤲",
      arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
      transliteration: "Rabbighfir warham wa anta khairur rahimin.",
      meaning:
        "O My Lord! Forgive and have Mercy and You are the Best of Merciful.",
    },
    {
      id: 4,
      title: "Dusra Ashra (Maghfirat) - Days 11-20 📿",
      arabic: "أَسْتَغْفِرُ اللهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfirullaha rabbi min kulli zambin wa atubu ilaih.",
      meaning:
        "I seek forgiveness from Allah, my Lord, from every sin and I turn to Him in repentance.",
    },
    {
      id: 5,
      title: "Teesra Ashra (Nijaat) - Days 21-30 🔥",
      arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
      transliteration: "Allahumma ajirni minan naar.",
      meaning: "O Allah, save me from the fire (Jahannam).",
    },
    {
      id: 6,
      title: "Laylatul Qadr ki Dua ✨", // 👈 Added this
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni.",
      meaning:
        "O Allah, You are Forgiving and love forgiveness, so forgive me.",
    },
  ];

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 md:p-12 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-islamic-primary">
            Ramadan Duas 🤲
          </h1>
          <p className="text-gray-400 text-sm">Daily Essential Prayers</p>
        </div>
        <Link
          to="/"
          className="text-gray-400 hover:text-white border border-gray-600 px-4 py-2 rounded-full transition text-sm"
        >
          ← Back Home
        </Link>
      </div>

      {/* 📜 TEXT BASED DUAS LIST (New Format) */}
      <div className="max-w-4xl mx-auto space-y-8">
        {duasList.map((dua) => (
          <div
            key={dua.id}
            className="bg-islamic-card p-6 md:p-8 rounded-2xl border border-gray-800 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-islamic-primary/30 transition duration-300"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-islamic-primary mb-6 border-b border-gray-700 pb-2">
              {dua.title}
            </h2>

            <div className="text-center space-y-5">
              {/* Arabic Text */}
              <p
                className="text-3xl md:text-4xl font-serif leading-loose text-white drop-shadow-md"
                dir="rtl"
              >
                {dua.arabic}
              </p>

              {/* Transliteration (Green & Italic) */}
              <p className="text-green-400 italic text-sm md:text-base font-medium">
                "{dua.transliteration}"
              </p>

              {/* Translation (In Box) */}
              <p className="text-gray-300 text-sm md:text-base bg-black/40 border border-gray-700 p-4 rounded-xl leading-relaxed">
                {dua.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📥 DOWNLOAD SECTION (Green Card) */}
      <div className="max-w-4xl mx-auto mt-16 pt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-islamic-primary/30 shadow-lg">
          <div>
            <h2 className="text-xl font-bold text-white">
              Full Dua Card Image 📜
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Includes Taraweeh & Complete Duas list.
            </p>
          </div>
          <a
            href="/images/dua_green.jpg"
            download="Ramadan_All_Duas.jpg"
            className="mt-4 md:mt-0 bg-islamic-primary text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition shadow-lg flex items-center gap-2"
          >
            <span>📥</span> Download Card
          </a>
        </div>

        {/* Image Preview */}
        <div className="bg-islamic-card p-2 rounded-2xl border border-gray-800 shadow-2xl max-w-xl mx-auto">
          <img
            src="/images/dua_green.jpg"
            alt="Full Ramadan Duas Card"
            className="w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Duas;
