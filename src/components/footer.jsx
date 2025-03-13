import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import logo from '../assets/Monograme.png';
import Steam from '../assets/Steam.png';

function Footer() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 text-black px-4 md:px-16 lg:px-[200px] py-8 shadow-md">
      <div className="w-full h-[1px] bg-black mb-4"></div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <ScrollLink to="header" smooth={true} duration={500}>
            <img
              src={logo}
              alt="Logo"
              className="w-14 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </ScrollLink>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-8 text-base font-serif font-medium tracking-wide">
          <li>
            <ScrollLink
              to="header"
              smooth={true}
              duration={500}
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              MONOCHROMES
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="stories"
              smooth={true}
              duration={500}
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              LIVRE
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="vr"
              smooth={true}
              duration={500}
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              CARTE
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              SÉNIORS
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              VR
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          </li>
          <li>
            <Link
              to="/mentions"
              className="relative text-black cursor-pointer transition-colors duration-300 group"
            >
              MENTIONS LÉGALES
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        {/* Steam Link */}
        <div className="flex justify-center">
          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img src={Steam} alt="Steam" className="w-36" />
          </a>
        </div>
      </div>

      <div className="w-full h-[1px] bg-black mb-4"></div>

      <p className="text-center text-sm font-light text-black tracking-wide">
        © 2025 ANNE BACK
      </p>
    </section>
  );
}

export default Footer;