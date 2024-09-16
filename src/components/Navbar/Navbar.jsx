import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const isActive1 = () => {
    window.scrollY > 50 ? setActive1(true) : setActive1(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    window.addEventListener("scroll", isActive1);
    return () => {
      window.removeEventListener("scroll", isActive);
      window.removeEventListener("scroll", isActive1);
    };
  }, []);

  const current_user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [input, setInput] = useState("");
  const handleSubmit = () => {
    navigate(`gigs?search=${input}`);
  };

  return (
    <div
      className={`${
        active || pathname !== "/"
          ? "bg-white text-black shadow-md"
          : "bg-black text-white"
      } transition-all duration-500 sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-5 max-w-7xl">
        {/* Logo */}
        <div className="text-3xl font-bold" data-aos="zoom-in">
          <Link to="/" className="flex items-center space-x-1">
            <span className={`${active ? "text-black" : "text-white"}`}>
              GigVerse
            </span>
            <span className="text-green-500">.</span>
          </Link>
        </div>

        {/* Search Bar */}
        {active && (
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="What service are you looking for today?"
              aria-label="Search for services"
              className="border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 rounded-l-md px-4 py-2 w-72 text-sm outline-none transition-all duration-300"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              aria-label="Search"
              className="bg-black hover:bg-green-600 focus:bg-green-500 text-white px-4 py-2 rounded-r-md flex items-center justify-center transition-all duration-300"
            >
              <img src="/images/search.png" alt="Search" className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <Link to="/login" className="hover:scale-110 duration-300">
            Sign In
          </Link>

          {!current_user && (
            <button
              onClick={() => navigate(`/register`)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:scale-110 duration-300"
            >
              Sign up
            </button>
          )}

          {current_user && (
            <div
              className="relative cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src="\images\man.png"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />

              <span>{current_user?.username}</span>
              {open && (
                <div className="absolute right-0 top-10 bg-white shadow-lg rounded z-10 p-4 flex flex-col space-y-2 text-gray-700">
                  {current_user.isSeller && (
                    <>
                      <Link to="/mygigs" className="hover:text-green-500">
                        Gigs
                      </Link>
                      <Link to="/add" className="hover:text-green-500">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="hover:text-green-500">
                    Orders
                  </Link>
                  <Link to="/messages" className="hover:text-green-500">
                    Messages
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Responsive Menu */}
      {(active1 || pathname !== "/") && (
        <>
          <hr className="border-gray-200" />
          <div className="container mx-auto py-2 px-5 flex justify-between max-w-7xl">
            <Link
              key={9983}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Web development
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={9883}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Content Writing
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={9988}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Logo Design
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={9981}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Video Editing
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={9982}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Education and Training
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={9903}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Music & Audio
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={99883}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Programming & Tech
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={19988}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Business
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              key={99981}
              className="relative menulink group transition-all duration-500 ease-in-out"
              to="/"
            >
              Lifestyle
              <span className="absolute left-0 -bottom-0.5 h-[3px] rounded w-0 bg-[#1dbf73] opacity-75 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
          </div>
          <hr className="border-gray-200" />
        </>
      )}
    </div>
  );
};

export default Navbar;
