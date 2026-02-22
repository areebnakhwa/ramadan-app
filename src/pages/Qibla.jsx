import React, { useState, useEffect } from "react";

const Qibla = () => {
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  // Makkah (Kaaba) Coordinates
  const MECCA_LAT = 21.422487;
  const MECCA_LNG = 39.826206;

  // Qibla Direction Calculate karne ka formula
  const calculateQibla = (lat, lng) => {
    const PI = Math.PI;
    const latRad = lat * (PI / 180);
    const lngRad = lng * (PI / 180);
    const meccaLatRad = MECCA_LAT * (PI / 180);
    const meccaLngRad = MECCA_LNG * (PI / 180);

    const y = Math.sin(meccaLngRad - lngRad);
    const x =
      Math.cos(latRad) * Math.tan(meccaLatRad) -
      Math.sin(latRad) * Math.cos(meccaLngRad - lngRad);

    let angle = Math.atan2(y, x) * (180 / PI);
    return (angle + 360) % 360;
  };

  const startCompass = async () => {
    // 1. Location Maango
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const angle = calculateQibla(
            position.coords.latitude,
            position.coords.longitude,
          );
          setQiblaAngle(angle);
        },
        (err) =>
          setError("Location access is required to find Qibla direction."),
      );
    } else {
      setError("Your browser does not support Geolocation.");
    }

    // 2. Compass Sensor on karo (Mobiles ke liye iOS & Android)
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
          setError("Compass permission denied. Please allow in settings.");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Android ke liye Absolute event prefer karte hain
      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true,
      );
      // Fallback
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    setIsStarted(true);

    // 5 seconds baad warning hata do
    setTimeout(() => {
      setShowWarning(false);
    }, 8000);
  };

  const handleOrientation = (event) => {
    let compassHeading = null;

    // iOS Devices ke liye
    if (event.webkitCompassHeading) {
      compassHeading = event.webkitCompassHeading;
    }
    // Android Devices ke liye (absolute = true hona zaroori hai)
    else if (event.absolute || event.alpha !== null) {
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== null) {
      setHeading(compassHeading);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 flex flex-col items-center pt-16 pb-24">
      <h1 className="text-4xl font-bold text-islamic-primary mb-2 text-center">
        Qibla Finder 🧭
      </h1>
      <p className="text-gray-400 mb-8 text-center text-sm md:text-base px-4">
        Find the direction of the Kaaba accurately.
      </p>

      {error ? (
        <div className="bg-red-900/50 text-red-200 p-4 rounded-xl text-center border border-red-800 max-w-sm">
          {error}
        </div>
      ) : (
        <>
          {!isStarted ? (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl max-w-sm text-center shadow-lg">
                <h3 className="text-islamic-primary font-bold mb-3 text-lg">
                  ⚠️ Important Instructions
                </h3>
                <ul className="text-gray-400 text-sm space-y-3 text-left list-disc pl-5">
                  <li>
                    Turn on your phone's <b>Location (GPS)</b>.
                  </li>
                  <li>
                    Remove phone cases with <b>magnets</b>.
                  </li>
                  <li>
                    Move away from heavy <b>metal objects</b> or electronics.
                  </li>
                </ul>
              </div>

              <button
                onClick={startCompass}
                className="bg-islamic-primary text-black px-8 py-4 rounded-full font-bold text-xl hover:bg-yellow-500 transition shadow-lg shadow-yellow-500/20 active:scale-95"
              >
                Start Compass
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              {/* Calibration Warning */}
              {showWarning && (
                <div className="mb-8 bg-yellow-900/30 border border-yellow-700 p-4 rounded-xl text-center max-w-xs animate-pulse">
                  <p className="text-yellow-400 text-sm font-bold">
                    🔄 Calibrate your compass!
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    Move your phone in a "Figure 8" (infinity ♾️) motion in the
                    air.
                  </p>
                </div>
              )}

              {qiblaAngle !== null ? (
                <>
                  {/* Compass UI */}
                  <div className="relative w-72 h-72 border-[6px] border-gray-800 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden">
                    {/* Inner Rotating Dial */}
                    <div
                      className="absolute w-full h-full transition-transform duration-300 ease-out"
                      style={{ transform: `rotate(${-heading}deg)` }}
                    >
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-red-500 font-bold text-2xl drop-shadow-md">
                        N
                      </div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-500 font-bold text-xl">
                        S
                      </div>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">
                        W
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">
                        E
                      </div>

                      {/* Small tick marks around the compass */}
                      <div className="absolute inset-0 border-[15px] border-dashed border-gray-800 rounded-full opacity-30"></div>

                      {/* Kaaba Arrow */}
                      <div
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${qiblaAngle}deg)` }}
                      >
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[28px] border-b-islamic-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
                          <span className="text-islamic-primary font-bold text-xs mt-2 tracking-widest bg-black/50 px-2 py-1 rounded-md">
                            QIBLA
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center Point */}
                    <div className="absolute w-4 h-4 bg-islamic-primary rounded-full z-10 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                  </div>

                  <div className="mt-10 text-center bg-gray-900 p-6 rounded-2xl border border-gray-800 w-full max-w-xs shadow-xl">
                    <p className="text-gray-400 text-sm mb-2">
                      Direction to Kaaba
                    </p>
                    <p className="text-5xl font-bold text-islamic-primary font-mono tracking-tighter">
                      {Math.round(qiblaAngle)}°
                    </p>
                    <p className="text-gray-500 text-xs mt-3">
                      Rotate your phone until the golden arrow points straight
                      UP.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-gray-700 border-t-islamic-primary rounded-full animate-spin"></div>
                  <div className="text-islamic-primary font-bold">
                    Locating Kaaba... 📍
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Qibla;
