/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bookHeroImage from "../assets/banner.webp";
import { FaSearch } from "react-icons/fa";
import { useBooks } from "../context/BookContext";

const Hero = () => {
  const { books, filters, updateFilters } = useBooks();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim(), page: 1 });
  };
  return (
    <div className="bg-gray-900 min-h-[600px] relative overflow-hidden">
      <div className="container mx-auto px-4 py-36 flex flex-col lg:flex-row gap-6 md:gap-10 items-center justify-between'">
        <div className="w-full lg:w-1/2 text-white z-10">
          <h1 className="text-2xl md:text-5xl font-bold mb-5 md:mb-10">
            <span className="text-yellow-400">
              {" "}
              Welcome to our <br /> book{" "}
            </span>
            haven for book lovers
          </h1>
          {/* Search bar */}
          <form onSubmit={handleSubmit} className="mt-8 relative max-w-xl">
            <div className="relative md:w-[70%] w-full">
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                type="text"
                placeholder="Enter title"
                className="w-full px-6 py-4 pl-12 rounded-full bg-gray-800 text-white border 
                         border-gray-700 focus:outline-none focus:border-amber-500 pr-32"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 
                         text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-400 
                         transition-colors disabled:opacity-50 disabled:hover:bg-amber-500 
                         disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={bookHeroImage}
            alt="Hero_image"
            className="w-full h-fit object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
