import React, { useState } from "react";

const duasData = [
  // --- RAMADAN DUAS ---
  {
    id: 1,
    category: "Ramadan",
    title: "Sehri Dua (Intention for Fast)",
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Wa bisawmi ghadinn nawaiytu min shahri ramadan",
    translation:
      "I intend to keep the fast for tomorrow in the month of Ramadan.",
  },
  {
    id: 2,
    category: "Ramadan",
    title: "Iftar Dua (Breaking Fast)",
    arabic:
      "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ",
    transliteration:
      "Allahumma inni laka sumtu, wa bika aamantu, wa 'alayka tawakkaltu, wa 'ala rizqika aftartu",
    translation:
      "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance.",
  },

  // --- ASHRA DUAS (NAYE ADD KIYE HAIN) ---
  {
    id: 9,
    category: "1st Ashra",
    title: "1st Ashra Dua (Days 1-10: Mercy / Rehmat)",
    arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
    transliteration: "Rabbighfir warham wa anta khairur raahimeen",
    translation:
      "O My Lord! Forgive and have mercy, for You are the best of those who show mercy.",
  },
  {
    id: 10,
    category: "2nd Ashra",
    title: "2nd Ashra Dua (Days 11-20: Forgiveness / Maghfirat)",
    arabic: "أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha rabbi min kulli zambin wa atoobu ilaih",
    translation:
      "I seek forgiveness from Allah, my Lord, from every sin I committed, and I turn to Him in repentance.",
  },
  {
    id: 11,
    category: "3rd Ashra",
    title: "3rd Ashra Dua (Days 21-30: Safety from Hell / Nijaat)",
    arabic: "اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    transliteration: "Allahumma ajirni minan naar",
    translation: "O Allah! Save me from the fire of Hell.",
  },

  // --- AYATUL KURSI ---
  {
    id: 3,
    category: "Protection",
    title: "Ayatul Kursi",
    arabic:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration:
      "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-'ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnihi. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishay'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzhuhuma Wa Huwal 'Aliyyul-Azim.",
    translation:
      "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
  },

  // --- 4 QULS ---
  {
    id: 4,
    category: "4 Quls",
    title: "1. Surah Al-Ikhlas",
    arabic:
      "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration:
      "Qul Huwallahu Ahad. Allahus-Samad. Lam yalid walam yulad. Walam yakullahu kufuwan ahad.",
    translation:
      "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'",
  },
  {
    id: 5,
    category: "4 Quls",
    title: "2. Surah Al-Falaq",
    arabic:
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration:
      "Qul a'udhu bi-rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation:
      "Say, 'I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.'",
  },
  {
    id: 6,
    category: "4 Quls",
    title: "3. Surah An-Nas",
    arabic:
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration:
      "Qul a'udhu bi-rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation:
      "Say, 'I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind.'",
  },
  {
    id: 7,
    category: "4 Quls",
    title: "4. Surah Al-Kafirun",
    arabic:
      "قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ۝ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
    transliteration:
      "Qul ya ayyuhal-kafirun. La a'budu ma ta'budun. Wa la antum 'abiduna ma a'bud. Wa la ana 'abidum-ma 'abadtum. Wa la antum 'abiduna ma a'bud. Lakum dinukum wa liya din.",
    translation:
      "Say, 'O disbelievers, I do not worship what you worship. Nor are you worshippers of what I worship. Nor will I be a worshipper of what you worship. Nor will you be worshippers of what I worship. For you is your religion, and for me is my religion.'",
  },

  // --- DUROOD SHARIF ---
  {
    id: 8,
    category: "Durood",
    title: "Durood-e-Ibrahim",
    arabic:
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration:
      "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammadin, kama sallayta 'ala Ibrahima wa 'ala aali Ibrahima, innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammadin, kama barakta 'ala Ibrahima wa 'ala aali Ibrahima, innaka Hamidun Majid.",
    translation:
      "O Allah, let Your Blessings come upon Muhammad and the family of Muhammad, as You have blessed Ibrahim and his family. Truly, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You have blessed Ibrahim and his family. Truly, You are Praiseworthy and Glorious.",
  },
];

const Duas = () => {
  const [activeTab, setActiveTab] = useState("Ramadan");

  // Filter duas based on selected tab
  const filteredDuas = duasData.filter((dua) => dua.category === activeTab);

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 pb-24">
      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-bold text-islamic-primary mb-2">
          Islamic Duas 🤲
        </h1>
        <p className="text-gray-400">
          Supplications for daily guidance & protection
        </p>
      </div>

      {/* 👇 YAHAN NAYE TABS ADD HUE HAIN 👇 */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {[
          "Ramadan",
          "1st Ashra",
          "2nd Ashra",
          "3rd Ashra",
          "Protection",
          "4 Quls",
          "Durood",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
              activeTab === tab
                ? "bg-islamic-primary text-black shadow-lg shadow-yellow-500/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab === "Protection"
              ? "Ayatul Kursi"
              : tab === "Durood"
                ? "Durood Sharif"
                : tab}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredDuas.map((dua) => (
          <div
            key={dua.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-islamic-primary transition-colors"
          >
            <h2 className="text-xl font-bold text-islamic-primary mb-4 border-b border-gray-800 pb-2">
              {dua.title}
            </h2>

            <p className="text-2xl md:text-3xl font-arabic text-white mb-6 text-right leading-loose">
              {dua.arabic}
            </p>

            <div className="bg-black/40 rounded-xl p-4 mb-4 border border-gray-800">
              <span className="text-xs text-islamic-primary font-bold uppercase tracking-wider block mb-1">
                Read
              </span>
              <p className="text-gray-300 italic text-sm">
                {dua.transliteration}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-800">
              <span className="text-xs text-islamic-primary font-bold uppercase tracking-wider block mb-1">
                Meaning
              </span>
              <p className="text-gray-400 text-sm">{dua.translation}</p>
            </div>
          </div>
        ))}

        {/* --- FULL DUA CARD IMAGE SECTION (SIRF RAMADAN WALE TAB KE LIYE) --- */}
        {activeTab === "Ramadan" && (
          <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Full Dua Card Image 📜
            </h2>
            <p className="text-gray-400 mb-6">
              Includes Taraweeh & Complete Duas list.
            </p>

            <a
              href="/dua-card.jpeg"
              download="Ramadan_Duas.jpeg"
              className="inline-flex items-center gap-2 bg-islamic-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-all active:scale-95 mb-6"
            >
              📥 Download Card
            </a>

            <div className="rounded-xl overflow-hidden border border-gray-700 bg-black flex justify-center">
              <img
                src="/dua-card.jpeg"
                alt="Full Dua Card"
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Duas;
