/* import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow px-5">
      <div className="w-[10%] h-full flex items-center">
        <h1 className="font-bold text-zinc-800">bSTORE</h1>
      </div>
      <div className="w-[50%] h-full">
        <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-medium">
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer">CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
 */

import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-100 shadow-md px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-zinc-800 tracking-wide">
          bSTORE
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
          <li className="hover:text-blue-600 transition cursor-pointer">
            HOME
          </li>
          <li className="hover:text-blue-600 transition cursor-pointer">
            ABOUT
          </li>
          <li className="hover:text-blue-600 transition cursor-pointer">
            CONTACT
          </li>
        </ul>

        {/* Mobile Menu (optional for future) */}
        <div className="md:hidden text-gray-700">
          {/* For future mobile nav toggle */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
