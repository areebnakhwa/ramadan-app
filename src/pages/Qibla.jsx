import React, { useState, useEffect } from "react";

const Qibla = () => {
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState("");
  const [isStarted, setIsStarted] = useState(false);

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

    // 2. Compass Sensor on karo (Mobiles ke liye)
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          window.addEventListener(
            "deviceorientationabsolute",
            handleOrientation,
            true,
          );
          window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
          setError("Compass permission denied.");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true,
      );
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    setIsStarted(true);
  };

  const handleOrientation = (event) => {
    let compassHeading =
      event.webkitCompassHeading || Math.abs(event.alpha - 360);
    if (compassHeading) {
      setHeading(compassHeading);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-bg text-white p-6 flex flex-col items-center pt-20 pb-24">
      <h1 className="text-4xl font-bold text-islamic-primary mb-2">
        Qibla Finder 🧭
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Find the direction of the Kaaba accurately.
      </p>

      {error ? (
        <div className="bg-red-900/50 text-red-200 p-4 rounded-xl text-center border border-red-800">
          {error}
        </div>
      ) : (
        <>
          {!isStarted ? (
            <button
              onClick={startCompass}
              className="bg-islamic-primary text-black px-8 py-4 rounded-full font-bold text-xl hover:bg-yellow-500 transition shadow-lg shadow-yellow-500/20"
            >
              Start Compass
            </button>
          ) : (
            <div className="flex flex-col items-center">
              {qiblaAngle !== null ? (
                <>
                  {/* Compass UI */}
                  <div className="relative w-72 h-72 border-4 border-gray-800 rounded-full flex items-center justify-center bg-gray-900 shadow-2xl overflow-hidden">
                    <div
                      className="absolute w-full h-full transition-transform duration-200 ease-out"
                      style={{ transform: `rotate(${-heading}deg)` }}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl">
                        N
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-500 font-bold">
                        S
                      </div>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                        W
                      </div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                        E
                      </div>

                      {/* Kaaba Arrow */}
                      <div
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${qiblaAngle}deg)` }}
                      >
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-islamic-primary"></div>
                          <span className="text-islamic-primary font-bold text-sm mt-2">
                            KAABA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center bg-gray-900 p-6 rounded-xl border border-gray-800 w-full max-w-xs shadow-lg">
                    <p className="text-gray-400 text-sm">
                      Rotate your phone until
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      Kaaba arrow points UP
                    </p>
                    <p className="text-4xl font-bold text-islamic-primary">
                      {Math.round(qiblaAngle)}°
                    </p>
                  </div>
                </>
              ) : (
                <div className="animate-pulse text-islamic-primary text-xl">
                  Getting Location... 📍
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
