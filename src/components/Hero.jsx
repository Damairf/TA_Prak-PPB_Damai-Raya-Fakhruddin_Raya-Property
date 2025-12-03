import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Price from "../components/Price";
import Banner from "../assets/Banner_Ryon_Property.png";
import Background1 from "../assets/Background1.png";
import Background2 from "../assets/Background2.png";
import Background3 from "../assets/Background3.png";

const Hero = () => {
  const backgrounds = [Background1, Background2, Background3];
  const [topHouses, setTopHouses] = useState([]);
  const [ratingMap, setRatingMap] = useState({});
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

  useEffect(() => {
    const fetchTopRated = async () => {
      const { data: houses, error: err1 } = await supabase
        .from("detail_price")
        .select("*");

      if (err1) {
        console.error("Error fetching houses:", err1);
        return;
      }

      const { data: reviews, error: err2 } = await supabase
        .from("review")
        .select("detail_id, rating");

      if (err2) {
        console.error("Error fetching ratings:", err2);
        return;
      }

      const temp = {};
      reviews.forEach((r) => {
        if (!temp[r.detail_id]) temp[r.detail_id] = [];
        temp[r.detail_id].push(r.rating);
      });

      const avgMap = {};
      Object.keys(temp).forEach((id) => {
        const arr = temp[id];
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        avgMap[id] = avg.toFixed(1);
      });

      setRatingMap(avgMap);

      const sorted = [...houses].sort((a, b) => {
        const ratingA = parseFloat(avgMap[a.id] || 0);
        const ratingB = parseFloat(avgMap[b.id] || 0);
        return ratingB - ratingA;
      });

      setTopHouses(sorted.slice(0, 3));
    };

    fetchTopRated();
  }, []);

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
              /* --- MOBILE --- */
              w-96
              xs:w-96 
              sm:w-[420px]
              translate-y-0

              /* --- DESKTOP --- */
              md:w-[1127px]
              md:translate-y-10

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
      <div className="px-6 mt-16 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">
          Hunian Rating Tertinggi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-10 place-items-center">
          {topHouses.length > 0 ? (
            topHouses.map((house) => (
              <Price
                key={house.id}
                id={house.id}
                title={house.nama}
                image_url={house.image_url}
                price={house.harga}
                deskripsi={house.deskripsi}
                maxFeatures={9}
                features={house.fasilitas || []}
                averageRating={ratingMap[house.id] || 0}
                fromHome={true}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center mt-5">
              Belum ada data rating.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
