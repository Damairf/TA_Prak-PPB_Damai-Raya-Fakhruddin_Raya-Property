import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import PortofolioPage from "./pages/PortofolioPage";
import PricePage from "./pages/PricePage";
import DetailPage from "./pages/DetailPage";
import DetailPricePage from "./pages/DetailPricePage";
import AdminPage from "./pages/AdminPage";
import AdminEditPage from "./pages/AdminEditPage";
import DetailAdminEditPage from "./pages/DetailAdminEditPage";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <ScrollToTop />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portofolio" element={<PortofolioPage />} />
          <Route path="/price" element={<PricePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/detail-price/:id" element={<DetailPricePage />} />
          <Route path="/admin/tambah" element={<AdminPage />} />
          <Route path="/admin" element={<AdminEditPage />} />
          <Route path="/admin/:id" element={<DetailAdminEditPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
