import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-eventureMainBg text-white">
      <div className="container mx-auto px-4 py-7">
        <h3 className="mb-4 text-center text-xl font-bold">Contact Us</h3>

        <div className="flex flex-col items-center justify-center md:flex-row md:gap-28">
          <div className="text-center md:text-left">
            <p>Eventure Corporation</p>
            <p>South Jakarta, Jakarta, Indonesia</p>
            <p>admin@eventure.com</p>
            <p>+62 21 25501</p>
          </div>
          <div className="mt-4 flex items-center md:mt-0">
            <a href="#" className="mr-4">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-eventureMainBg2 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Eventure Corporation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
