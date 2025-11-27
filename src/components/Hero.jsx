import React, { useState, useEffect } from "react";
import Banner from "../assets/Banner_Ryon_Property.png";
import Background1 from "../assets/Background1.png";
import Background2 from "../assets/Background2.png";
import Background3 from "../assets/Background3.png";

const Hero = () => {
  const backgrounds = [Background1, Background2, Background3];
  const [currentBg, setCurrentBg] = useState(0);
  const [nextBg, setNextBg] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);

      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        setNextBg((prev) => (prev + 1) % backgrounds.length);
        setIsSliding(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <>

      <div
        id="home"
        className="
    relative overflow-hidden 
    h-[260px] xs:h-[300px] sm:h-[360px] 
    md:h-[700px]
  "
      >

        <div
          className={`absolute inset-0 ${
            isSliding ? "transition-transform duration-1000 ease-in-out" : ""
          } ${isSliding ? "-translate-x-full" : "translate-x-0"}`}
          style={{
            backgroundImage: `url(${backgrounds[currentBg]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className={`absolute inset-0 ${
            isSliding ? "transition-transform duration-1000 ease-in-out" : ""
          } ${isSliding ? "translate-x-0" : "translate-x-full"}`}
          style={{
            backgroundImage: `url(${backgrounds[nextBg]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-black/10 z-[5]" />

        <div
          className="
      absolute inset-0 
      flex items-center justify-center 
      z-10
    "
        >
          <img
            src={Banner}
            alt="Banner Ryon Property"
            className="
              /* --- MOBILE (lebih besar) --- */
              w-96              /* default mobile */
              xs:w-96 
              sm:w-[420px]      /* besar tetapi tidak keteteran */
              translate-y-0     /* mobile tetap center */

              /* --- DESKTOP --- */
              md:w-[1127px]
              md:translate-y-10 /* sesuai posisi lama */

              /* General */
              max-w-[90%]
              object-contain
              drop-shadow-lg
              rounded-[10px] md:rounded-[20px]
            "
          />
        </div>
      </div>

      <div className="text-center px-6 mt-10 md:mt-14 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">
          RAYA PROPERTY
        </h1>

        <p className="mt-4 text-gray-700 text-sm md:text-lg leading-relaxed">
          Raya Property adalah hunian modern yang dirancang untuk menghadirkan
          kenyamanan, keamanan, dan kemewahan bagi keluarga Anda. Dengan
          lingkungan asri, fasilitas lengkap, serta desain rumah yang elegan,
          Raya Property menjadi pilihan ideal untuk gaya hidup modern.
        </p>
      </div>

      <div className="px-6 mt-12 md:mt-16 mb-20">
        <div className="max-w-6xl mx-auto bg-blue-900 text-white p-8 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
            Visi dan Misi
          </h2>

          <div className="space-y-6 md:space-y-8 text-center text-white/90 text-base md:text-xl leading-relaxed">
            <p>
              Kami selalu berkomitmen untuk memberikan pelayanan terbaik untuk
              setiap konsumen.
            </p>
            <hr className="border-white/40" />
            <p>
              Kami selalu mengutamakan keamanan dalam transaksi dari hal
              pembayaran dan legalitas.
            </p>
            <hr className="border-white/40" />
            <p>
              Berupaya meningkatkan pelayanan kami untuk memberikan konsumen
              pengalaman yang terbaik.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
