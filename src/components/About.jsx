import React from "react";
import waIcon from "../assets/wa.png";
import mailIcon from "../assets/mail.png";
import igIcon from "../assets/ig.png";
import FotoProfile from "../assets/foto_profile.jpg";

const About = () => {
  return (
    <div className="bg-blue-900 text-white py-16 px-6 md:px-20 md:pt-36 pt-10 md:pb-12 pb-24">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-16">

        <div className="w-[180px] md:w-[220px] aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
          <img
            src={FotoProfile}
            alt="Foto Profil"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Biodata</h2>

          <p className="text-lg md:text-xl mb-2">
            <span className="font-bold">Nama:</span> Damai Raya Fakhruddin
          </p>

          <p className="text-lg md:text-xl mb-2">
            <span className="font-bold">NIM:</span> 21120123130096
          </p>

          <p className="text-lg md:text-xl">
            <span className="font-bold">Praktikum:</span> Pemrograman Perangkat Bergerak
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        <div>
          <h3 className="text-xl font-bold mb-3">Alamat</h3>
          <iframe
            title="Google Maps Boja Heritage"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6362150434093!2d110.4408916!3d-7.051962499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c02787187c9%3A0x29bcf60b2c20aec!2sUniversitas%20Diponegoro%20(UNDIP)!5e0!3m2!1sid!2sid!4v1764067313217!5m2!1sid!2sid"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>

          <p className="mt-4 text-sm text-white text-center">
            Jl. Prof. Soedarto, Tembalang, Kota Semarang, Jawa Tengah 50275
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Kontak</h3>

          <div className="space-y-4">
            <a
              href="https://wa.me/6282314997110"
              target="_blank"
              rel="noreferrer"
              className="relative flex flex-col justify-center bg-white text-blue-800 px-4 py-3 rounded-lg overflow-hidden shadow-md min-h-[70px]"
            >
              <img
                src={waIcon}
                alt="WhatsApp Icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 object-contain pointer-events-none"
              />

              <span className="text-lg text-blue-900 font-bold relative z-10">
                No. Telp
              </span>
              <span className="font-medium text-sm relative z-10">
                +62 823 1499 7110
              </span>
            </a>

            <a
              href="mailto:damairaya33@gmail.com"
              className="relative flex flex-col justify-center bg-white text-blue-800 px-4 py-3 rounded-lg overflow-hidden shadow-md min-h-[70px]"
            >
              <img
                src={mailIcon}
                alt="Email Icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 object-contain pointer-events-none"
              />

              <span className="text-lg text-blue-900 font-bold relative z-10">
                Email
              </span>
              <span className="font-medium text-sm relative z-10">
                damairaya33@gmail.com
              </span>
            </a>

            <a
              href="https://www.instagram.com/damairf?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-white text-blue-800 px-4 py-3 rounded-xl shadow-md"
            >
              <div>
                <p className="text-lg font-bold">Instagram</p>
                <p className="text-sm font-medium">damairf</p>
              </div>
              <img src={igIcon} alt="Instagram Icon" className="w-8 h-8" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
