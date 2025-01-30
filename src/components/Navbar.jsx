import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full flex items-center bg-white border-b border-gray-300 py-4 shadow-md fixed top-0 z-50">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="ml-8">
          <img src="fintech.jpg" alt="Fintech Logo" width={"50px"} height={"50px"} />
        </div>

        <div className="hidden md:flex items-center space-x-10 mr-8">
          <ul className="flex flex-row gap-10">
            <li>
              <NavLink to="/" className="font-semibold text-blue-700 text-xl">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allocation" className="font-semibold text-blue-700 text-xl">
                Allocation
              </NavLink>
            </li>
            <li>
              <NavLink to="/growth" className="font-semibold text-blue-700 text-xl">
                Growth Chart
              </NavLink>
            </li>
            <li>
              <NavLink to="/metrics" className="font-semibold text-blue-700 text-xl">
                Metrics
              </NavLink>
            </li>
            <li>
              <NavLink to="/report" className="font-semibold text-blue-700 text-xl">
                Report
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 shadow-md`}
      >
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li>
            <NavLink to="/" className="font-semibold text-blue-700 text-xl" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allocation" className="font-semibold text-blue-700 text-xl" onClick={toggleMenu}>
              Allocation
            </NavLink>
          </li>
          <li>
            <NavLink to="/growth" className="font-semibold text-blue-700 text-xl" onClick={toggleMenu}>
              Growth Chart
            </NavLink>
          </li>
          <li>
            <NavLink to="/metrics" className="font-semibold text-blue-700 text-xl" onClick={toggleMenu}>
              Metrics
            </NavLink>
          </li>
          <li>
            <NavLink to="/report" className="font-semibold text-blue-700 text-xl" onClick={toggleMenu}>
              Report
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
