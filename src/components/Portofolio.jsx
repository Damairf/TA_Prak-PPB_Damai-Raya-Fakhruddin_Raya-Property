import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Slider1 from "../assets/slider1.jpg";
import Slider2 from "../assets/slider2.jpg";
import Slider3 from "../assets/slider3.jpg";
import Slider4 from "../assets/slider4.jpg";
import Slider5 from "../assets/slider5.jpg";
import dalam1 from "../assets/dalam1.jpg";
import dalam2 from "../assets/dalam2.jpg";
import dalam3 from "../assets/dalam3.jpg";
import dalam4 from "../assets/dalam4.jpg";

const Portfolio = () => {
  const navigate = useNavigate();
  const images = [Slider1, Slider2, Slider3, Slider4, Slider5];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="bg-transparent py-8 px-6 flex flex-col items-center md:pt-36 pt-10 md:pb-8 pb-16">

      <div className="bg-blue-900 rounded-[25px] p-6 md:p-10 shadow-lg w-full max-w-6xl">

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
          Raya Property
        </h2>

        <p className="text-white/90 text-center max-w-3xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
          Hunian modern yang menghadirkan kenyamanan dan kemewahan dalam satu
          tempat. Dirancang dengan desain elegan, lokasi strategis, serta
          fasilitas lengkap untuk mendukung gaya hidup Anda.
        </p>

        <div className="relative w-full">
          <div className="bg-blue-900 rounded-[20px] overflow-hidden shadow-lg w-full">
            <div className="w-full h-64 sm:h-80 md:h-[400px] relative">
              <AnimatePresence custom={direction} initial={false}>
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`Slider ${current + 1}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="absolute w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <button
              onClick={prevSlide}
              aria-label="previous"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#1f2937"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              aria-label="next"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#1f2937"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? "bg-white scale-110" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 relative pb-6">
        {[
          { id: 1, img: dalam1, title: "Keamanan Komplek" },
          { id: 2, img: dalam2, title: "Lingkungan Komplek" },
          { id: 3, img: dalam3, title: "Ruang Tamu" },
          { id: 4, img: dalam4, title: "Kamar Tidur" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/detail/${item.id}`)}
            className="bg-blue-900 rounded-2xl shadow-xl overflow-hidden cursor-pointer 
           transition-transform duration-300 hover:scale-105 active:scale-95"
          >

            <div className="w-full aspect-video max-h-[180px] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-center text-white py-3 text-sm font-semibold">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
