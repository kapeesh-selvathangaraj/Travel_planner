/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/images/profile.png";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center">
      {/* Logo Section with Original Style */}
      <div className="relative">
        <h1
          className="text-4xl font-bold"
          style={{
            color: "transparent",
            WebkitTextStroke: "0.7px",
            WebkitTextStrokeColor: "#4f46e5", // Indigo color for stroke
          }}
        >
          Come
          <span
            className="text-indigo-800 text-2xl absolute left-1 top-[-10px]"
            style={{
              WebkitTextStroke: "0",
              color: "#334155", // Slate color for inner text
            }}
          >
            Dream Tours
          </span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex items-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="group relative hover:text-indigo-600 transition-colors duration-200"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="group relative hover:text-indigo-600 transition-colors duration-200"
            >
              Packages
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="group relative hover:text-indigo-600 transition-colors duration-200"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            {currentUser ? (
              <Link
                to={`/profile/${currentUser.user_role === 1 ? "admin" : "user"}`}
                aria-label="Profile"
              >
                <img
                  src={currentUser.avatar || defaultProfileImg}
                  alt={currentUser.username}
                  className="w-9 h-9 rounded-full border-2 border-indigo-600 hover:opacity-90 transition-opacity duration-200"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-indigo-600 hover:underline hover:text-indigo-800 transition-all duration-200"
              >
                <FaUserCircle className="text-2xl" /> Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
