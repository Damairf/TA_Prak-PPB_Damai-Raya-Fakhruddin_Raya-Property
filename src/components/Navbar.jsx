import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo_Riyon_Property.png";
import { IoHome, IoPerson, IoDocumentText, IoCash } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>

      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center cursor-pointer"
          >
            <img
              src={Logo}
              alt="Ryon Property Logo"
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          <ul className="hidden md:flex font-medium text-gray-900 space-x-10">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/portofolio"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Portofolio
              </Link>
            </li>

            <li>
              <Link
                to="/price"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Residence
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200">
        <div className="flex justify-around items-center py-3">

          <Link to="/" onClick={scrollToTop} className="flex flex-col items-center">
            <IoHome
              size={28}
              className={`${isActive("/") ? "text-blue-900" : "text-gray-500"}`}
            />
          </Link>

          <Link
            to="/portofolio"
            onClick={scrollToTop}
            className="flex flex-col items-center"
          >
            <IoDocumentText
              size={28}
              className={`${
                isActive("/portofolio") ? "text-blue-900" : "text-gray-500"
              }`}
            />
          </Link>

          <Link
            to="/price"
            onClick={scrollToTop}
            className="flex flex-col items-center"
          >
            <IoCash
              size={30}
              className={`${isActive("/price") ? "text-blue-900" : "text-gray-500"}`}
            />
          </Link>

          <Link
            to="/about"
            onClick={scrollToTop}
            className="flex flex-col items-center"
          >
            <IoPerson
              size={28}
              className={`${isActive("/about") ? "text-blue-900" : "text-gray-500"}`}
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
