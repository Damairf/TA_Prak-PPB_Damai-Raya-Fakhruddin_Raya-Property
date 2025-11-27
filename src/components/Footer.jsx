import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-blue-950 text-center text-white py-4 text-sm">
      © Praktikum PPB Damai Raya Fakhruddin | {year}
    </footer>
  );
};

export default Footer;
