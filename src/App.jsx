import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import PortofolioPage from "./pages/PortofolioPage";
import PricePage from "./pages/PricePage";
import DetailPage from "./pages/DetailPage";
import DetailPricePage from "./pages/DetailPricePage";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <ScrollToTop />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portofolio" element={<PortofolioPage />} />
          <Route path="/price" element={<PricePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/detail-price/:id" element={<DetailPricePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
