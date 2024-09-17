import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim()) {
      navigate(`gigs?search=${input}`);
    }
  };

  return (
    <div
      className={`featured h-[600px] flex items-center justify-center text-black overflow-hidden bg-cover bg-center bg-[url('hero2.webp')]`}
    >
      <div className="container w-full max-w-[1400px] flex flex-col items-center justify-center gap-8 text-center absolute">
        <h1 className="text-[50px] font-bold">
          Discover <span className="italic font-light">top freelance</span>{" "}
          <br />
          <span className="italic font-light">services</span> tailored for your business
        </h1>

        <div className="search bg-white rounded-lg flex items-center justify-between w-full max-w-[700px] overflow-hidden border border-gray-400">
          <div className="searchInput flex items-center gap-2 px-3 border-gray-400">
            <img src="/images/search.png" alt="search" className="w-5 h-5" />
            <input
              type="text"
              placeholder='Try "building mobile app"'
              onChange={(e) => setInput(e.target.value)}
              className="border-none outline-none placeholder-gray-500 text-sm w-full"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#1dbf73] text-white font-medium text-sm sm:text-base md:text-lg px-4 py-2 md:px-6 md:py-3"
          >
            Search
          </button>
        </div>

        <div className="popular flex flex-wrap items-center justify-center gap-4 text-base font-medium">
          <span className="text-gray-700">Popular:</span>
          {["Web Design", "WordPress", "Logo Design", "AI Services"].map(
            (item) => (
              <button
                key={item}
                onClick={() => navigate(`gigs?search=${item}`)}
                className="border border-gray-800 py-1 px-3 rounded-full hover:text-black"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Featured;
