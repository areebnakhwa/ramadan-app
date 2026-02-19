import React from "react";
import { motion } from "framer-motion";

const namesData = [
  {
    id: 1,
    arabic: "ٱلرَّحْمَٰنُ",
    transliteration: "Ar-Rahman",
    meaning: "The Most Gracious",
  },
  {
    id: 2,
    arabic: "ٱلرَّحِيمُ",
    transliteration: "Ar-Raheem",
    meaning: "The Most Merciful",
  },
  {
    id: 3,
    arabic: "ٱلْمَلِكُ",
    transliteration: "Al-Malik",
    meaning: "The King",
  },
  {
    id: 4,
    arabic: "ٱلْقُدُّوسُ",
    transliteration: "Al-Quddus",
    meaning: "The Most Holy",
  },
  {
    id: 5,
    arabic: "ٱلسَّلَامُ",
    transliteration: "As-Salam",
    meaning: "The Source of Peace",
  },
  {
    id: 6,
    arabic: "ٱلْمُؤْمِنُ",
    transliteration: "Al-Mu'min",
    meaning: "The Guardian of Faith",
  },
  {
    id: 7,
    arabic: "ٱلْمُهَيْمِنُ",
    transliteration: "Al-Muhaymin",
    meaning: "The Protector",
  },
  {
    id: 8,
    arabic: "ٱلْعَزِيزُ",
    transliteration: "Al-Aziz",
    meaning: "The Almighty",
  },
  {
    id: 9,
    arabic: "ٱلْجَبَّارُ",
    transliteration: "Al-Jabbar",
    meaning: "The Compeller",
  },
  {
    id: 10,
    arabic: "ٱلْمُتَكَبِّرُ",
    transliteration: "Al-Mutakabbir",
    meaning: "The Majestic",
  },
  {
    id: 11,
    arabic: "ٱلْخَالِقُ",
    transliteration: "Al-Khaliq",
    meaning: "The Creator",
  },
  {
    id: 12,
    arabic: "ٱلْبَارِئُ",
    transliteration: "Al-Bari",
    meaning: "The Evolver",
  },
  {
    id: 13,
    arabic: "ٱلْمُصَوِّرُ",
    transliteration: "Al-Musawwir",
    meaning: "The Fashioner",
  },
  {
    id: 14,
    arabic: "ٱلْغَفَّارُ",
    transliteration: "Al-Ghaffar",
    meaning: "The Constant Forgiver",
  },
  {
    id: 15,
    arabic: "ٱلْقَهَّارُ",
    transliteration: "Al-Qahar",
    meaning: "The All-Dominating",
  },
  {
    id: 16,
    arabic: "ٱلْوَهَّابُ",
    transliteration: "Al-Wahhab",
    meaning: "The Bestower",
  },
  {
    id: 17,
    arabic: "ٱلرَّزَّاقُ",
    transliteration: "Ar-Razzaq",
    meaning: "The Provider",
  },
  {
    id: 18,
    arabic: "ٱلْفَتَّاحُ",
    transliteration: "Al-Fattah",
    meaning: "The Opener",
  },
  {
    id: 19,
    arabic: "ٱلْعَلِيمُ",
    transliteration: "Al-'Alim",
    meaning: "The All-Knowing",
  },
  {
    id: 20,
    arabic: "ٱلْقَابِضُ",
    transliteration: "Al-Qabid",
    meaning: "The Withholder",
  },
  {
    id: 21,
    arabic: "ٱلْبَاسِطُ",
    transliteration: "Al-Basit",
    meaning: "The Extender",
  },
  {
    id: 22,
    arabic: "ٱلْخَافِضُ",
    transliteration: "Al-Khafid",
    meaning: "The Reducer",
  },
  {
    id: 23,
    arabic: "ٱلرَّافِعُ",
    transliteration: "Ar-Rafi",
    meaning: "The Exalter",
  },
  {
    id: 24,
    arabic: "ٱلْمُعِزُّ",
    transliteration: "Al-Mu'izz",
    meaning: "The Honorer",
  },
  {
    id: 25,
    arabic: "ٱلْمُذِلُّ",
    transliteration: "Al-Mudhill",
    meaning: "The Humiliator",
  },
  {
    id: 26,
    arabic: "ٱلسَّمِيعُ",
    transliteration: "As-Sami",
    meaning: "The All-Hearing",
  },
  {
    id: 27,
    arabic: "ٱلْبَصِيرُ",
    transliteration: "Al-Basir",
    meaning: "The All-Seeing",
  },
  {
    id: 28,
    arabic: "ٱلْحَكَمُ",
    transliteration: "Al-Hakam",
    meaning: "The Judge",
  },
  {
    id: 29,
    arabic: "ٱلْعَدْلُ",
    transliteration: "Al-'Adl",
    meaning: "The Just",
  },
  {
    id: 30,
    arabic: "ٱللَّطِيفُ",
    transliteration: "Al-Latif",
    meaning: "The Subtle One",
  },
  {
    id: 31,
    arabic: "ٱلْخَبِيرُ",
    transliteration: "Al-Khabir",
    meaning: "The All-Aware",
  },
  {
    id: 32,
    arabic: "ٱلْحَلِيمُ",
    transliteration: "Al-Halim",
    meaning: "The Forbearing",
  },
  {
    id: 33,
    arabic: "ٱلْعَظِيمُ",
    transliteration: "Al-'Azim",
    meaning: "The Magnificent",
  },
  {
    id: 34,
    arabic: "ٱلْغَفُورُ",
    transliteration: "Al-Ghafoor",
    meaning: "The Forgiver",
  },
  {
    id: 35,
    arabic: "ٱلشَّكُورُ",
    transliteration: "Ash-Shakur",
    meaning: "The Appreciative",
  },
  {
    id: 36,
    arabic: "ٱلْعَلِيُّ",
    transliteration: "Al-'Ali",
    meaning: "The Highest",
  },
  {
    id: 37,
    arabic: "ٱلْكَبِيرُ",
    transliteration: "Al-Kabir",
    meaning: "The Greatest",
  },
  {
    id: 38,
    arabic: "ٱلْحَفِيظُ",
    transliteration: "Al-Hafiz",
    meaning: "The Preserver",
  },
  {
    id: 39,
    arabic: "ٱلْمُقِيتُ",
    transliteration: "Al-Muqit",
    meaning: "The Nourisher",
  },
  {
    id: 40,
    arabic: "ٱلْحَسِيبُ",
    transliteration: "Al-Hasib",
    meaning: "The Reckoner",
  },
  {
    id: 41,
    arabic: "ٱلْجَلِيلُ",
    transliteration: "Al-Jalil",
    meaning: "The Majestic",
  },
  {
    id: 42,
    arabic: "ٱلْكَرِيمُ",
    transliteration: "Al-Karim",
    meaning: "The Generous",
  },
  {
    id: 43,
    arabic: "ٱلرَّقِيبُ",
    transliteration: "Ar-Raqib",
    meaning: "The Watchful",
  },
  {
    id: 44,
    arabic: "ٱلْمُجِيبُ",
    transliteration: "Al-Mujib",
    meaning: "The Responsive",
  },
  {
    id: 45,
    arabic: "ٱلْوَاسِعُ",
    transliteration: "Al-Wasi",
    meaning: "The All-Encompassing",
  },
  {
    id: 46,
    arabic: "ٱلْحَكِيمُ",
    transliteration: "Al-Hakim",
    meaning: "The Wise",
  },
  {
    id: 47,
    arabic: "ٱلْوَدُودُ",
    transliteration: "Al-Wadud",
    meaning: "The Loving",
  },
  {
    id: 48,
    arabic: "ٱلْمَجِيدُ",
    transliteration: "Al-Majid",
    meaning: "The Glorious",
  },
  {
    id: 49,
    arabic: "ٱلْبَاعِثُ",
    transliteration: "Al-Ba'ith",
    meaning: "The Resurrector",
  },
  {
    id: 50,
    arabic: "ٱلشَّهِيدُ",
    transliteration: "Ash-Shahid",
    meaning: "The Witness",
  },
  {
    id: 51,
    arabic: "ٱلْحَقُّ",
    transliteration: "Al-Haqq",
    meaning: "The Truth",
  },
  {
    id: 52,
    arabic: "ٱلْوَكِيلُ",
    transliteration: "Al-Wakil",
    meaning: "The Trustee",
  },
  {
    id: 53,
    arabic: "ٱلْقَوِيُّ",
    transliteration: "Al-Qawiyy",
    meaning: "The Strong",
  },
  {
    id: 54,
    arabic: "ٱلْمَتِينُ",
    transliteration: "Al-Matin",
    meaning: "The Firm",
  },
  {
    id: 55,
    arabic: "ٱلْوَلِيُّ",
    transliteration: "Al-Wali",
    meaning: "The Friend",
  },
  {
    id: 56,
    arabic: "ٱلْحَمِيدُ",
    transliteration: "Al-Hamid",
    meaning: "The Praiseworthy",
  },
  {
    id: 57,
    arabic: "ٱلْمُحْصِيُ",
    transliteration: "Al-Muhsi",
    meaning: "The Counter",
  },
  {
    id: 58,
    arabic: "ٱلْمُبْدِئُ",
    transliteration: "Al-Mubdi",
    meaning: "The Originator",
  },
  {
    id: 59,
    arabic: "ٱلْمُعِيدُ",
    transliteration: "Al-Mu'id",
    meaning: "The Restorer",
  },
  {
    id: 60,
    arabic: "ٱلْمُحْيِي",
    transliteration: "Al-Muhyi",
    meaning: "The Giver of Life",
  },
  {
    id: 61,
    arabic: "ٱلْمُمِيتُ",
    transliteration: "Al-Mumit",
    meaning: "The Taker of Life",
  },
  {
    id: 62,
    arabic: "ٱلْحَيُّ",
    transliteration: "Al-Hayy",
    meaning: "The Ever-Living",
  },
  {
    id: 63,
    arabic: "ٱلْقَيُّومُ",
    transliteration: "Al-Qayyum",
    meaning: "The Self-Subsisting",
  },
  {
    id: 64,
    arabic: "ٱلْوَاجِدُ",
    transliteration: "Al-Wajid",
    meaning: "The Finder",
  },
  {
    id: 65,
    arabic: "ٱلْمَاجِدُ",
    transliteration: "Al-Majid",
    meaning: "The Noble",
  },
  {
    id: 66,
    arabic: "ٱلْوَاحِدُ",
    transliteration: "Al-Wahid",
    meaning: "The One",
  },
  {
    id: 67,
    arabic: "ٱلْأَحَد",
    transliteration: "Al-Ahad",
    meaning: "The Absolute One",
  },
  {
    id: 68,
    arabic: "ٱلصَّمَدُ",
    transliteration: "As-Samad",
    meaning: "The Eternal",
  },
  {
    id: 69,
    arabic: "ٱلْقَادِرُ",
    transliteration: "Al-Qadir",
    meaning: "The Capable",
  },
  {
    id: 70,
    arabic: "ٱلْمُقْتَدِرُ",
    transliteration: "Al-Muqtadir",
    meaning: "The Powerful",
  },
  {
    id: 71,
    arabic: "ٱلْمُقَدِّمُ",
    transliteration: "Al-Muqaddim",
    meaning: "The Expediter",
  },
  {
    id: 72,
    arabic: "ٱلْمُؤَخِّرُ",
    transliteration: "Al-Mu'akhkhir",
    meaning: "The Delayer",
  },
  {
    id: 73,
    arabic: "ٱلْأَوَّلُ",
    transliteration: "Al-Awwal",
    meaning: "The First",
  },
  {
    id: 74,
    arabic: "ٱلْآخِرُ",
    transliteration: "Al-Akhir",
    meaning: "The Last",
  },
  {
    id: 75,
    arabic: "ٱلظَّاهِرُ",
    transliteration: "Az-Zahir",
    meaning: "The Manifest",
  },
  {
    id: 76,
    arabic: "ٱلْبَاطِنُ",
    transliteration: "Al-Batin",
    meaning: "The Hidden",
  },
  {
    id: 77,
    arabic: "ٱلْوَالِي",
    transliteration: "Al-Wali",
    meaning: "The Governor",
  },
  {
    id: 78,
    arabic: "ٱلْمُتَعَالِي",
    transliteration: "Al-Muta'ali",
    meaning: "The Most Exalted",
  },
  {
    id: 79,
    arabic: "ٱلْبَرُّ",
    transliteration: "Al-Barr",
    meaning: "The Source of Goodness",
  },
  {
    id: 80,
    arabic: "ٱلتَّوَّابُ",
    transliteration: "At-Tawwab",
    meaning: "The Acceptor of Repentance",
  },
  {
    id: 81,
    arabic: "ٱلْمُنْتَقِمُ",
    transliteration: "Al-Muntaqim",
    meaning: "The Avenger",
  },
  {
    id: 82,
    arabic: "ٱلْعَفُوُّ",
    transliteration: "Al-'Afuww",
    meaning: "The Pardoner",
  },
  {
    id: 83,
    arabic: "ٱلرَّءُوفُ",
    transliteration: "Ar-Ra'uf",
    meaning: "The Compassionate",
  },
  {
    id: 84,
    arabic: "مَالِكُ ٱلْمُلْكِ",
    transliteration: "Malik-ul-Mulk",
    meaning: "Master of Sovereignty",
  },
  {
    id: 85,
    arabic: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ",
    transliteration: "Dhul-Jalal wal-Ikram",
    meaning: "Lord of Majesty and Generosity",
  },
  {
    id: 86,
    arabic: "ٱلْمُقْسِطُ",
    transliteration: "Al-Muqsit",
    meaning: "The Equitable",
  },
  {
    id: 87,
    arabic: "ٱلْجَامِعُ",
    transliteration: "Al-Jami",
    meaning: "The Gatherer",
  },
  {
    id: 88,
    arabic: "ٱلْغَنِيُّ",
    transliteration: "Al-Ghaniyy",
    meaning: "The Self-Sufficient",
  },
  {
    id: 89,
    arabic: "ٱلْمُغْنِيُّ",
    transliteration: "Al-Mughni",
    meaning: "The Enricher",
  },
  {
    id: 90,
    arabic: "ٱلْمَانِعُ",
    transliteration: "Al-Mani",
    meaning: "The Withholder",
  },
  {
    id: 91,
    arabic: "ٱلضَّارُّ",
    transliteration: "Ad-Darr",
    meaning: "The Distresser",
  },
  {
    id: 92,
    arabic: "ٱلنَّافِعُ",
    transliteration: "An-Nafi",
    meaning: "The Benefactor",
  },
  {
    id: 93,
    arabic: "ٱلنُّورُ",
    transliteration: "An-Nur",
    meaning: "The Light",
  },
  {
    id: 94,
    arabic: "ٱلْهَادِي",
    transliteration: "Al-Hadi",
    meaning: "The Guide",
  },
  {
    id: 95,
    arabic: "ٱلْبَدِيعُ",
    transliteration: "Al-Badi",
    meaning: "The Incomparable",
  },
  {
    id: 96,
    arabic: "ٱلْبَاقِي",
    transliteration: "Al-Baqi",
    meaning: "The Everlasting",
  },
  {
    id: 97,
    arabic: "ٱلْوَارِثُ",
    transliteration: "Al-Warith",
    meaning: "The Inheritor",
  },
  {
    id: 98,
    arabic: "ٱلرَّشِيدُ",
    transliteration: "Ar-Rashid",
    meaning: "The Guide to the Right Path",
  },
  {
    id: 99,
    arabic: "ٱلصَّبُورُ",
    transliteration: "As-Sabur",
    meaning: "The Patient",
  },
];

const Names = () => {
  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 pb-24">
      {/* Header */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-bold text-islamic-primary mb-2">
          99 Names of Allah
        </h1>
        <p className="text-gray-400">
          Asma-ul-Husna (The Most Beautiful Names)
        </p>
      </div>

      {/* 👇 YAHAN SE PASTE KARNA SHURU KARO 👇 */}
      <div className="my-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">
          Full 99 Names Card 📜
        </h2>
        <p className="text-gray-400 mb-5 text-sm">
          Download the complete Asma-ul-Husna to your phone.
        </p>

        <a
          href="/99-names.jpg"
          download="99_Names_of_Allah.jpg"
          className="inline-flex items-center gap-2 bg-islamic-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-all active:scale-95"
        >
          📥 Download Image
        </a>

        {/* Chhota sa Image Preview */}
        <div className="mt-5 rounded-xl overflow-hidden border border-gray-700 bg-black flex justify-center">
          <img
            src="/99-names.jpg"
            alt="99 Names Card"
            className="w-full h-auto max-h-32 object-cover opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {namesData.map((name, index) => (
          <motion.div
            key={name.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-islamic-primary transition-all shadow-lg group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-800 text-islamic-primary flex items-center justify-center font-bold mb-3 group-hover:bg-islamic-primary group-hover:text-black transition-colors">
              {name.id}
            </div>
            <h2 className="text-3xl font-arabic text-white mb-2">
              {name.arabic}
            </h2>
            <h3 className="text-lg font-bold text-islamic-primary">
              {name.transliteration}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{name.meaning}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>Wallahu A'lam (Allah knows best).</p>
      </div>
    </div>
  );
};

export default Names;
