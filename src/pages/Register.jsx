import React, { useState } from "react";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      const response = await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      console.log("Registration successful:", response.data);
      navigate("/");
    } catch (error) {
      console.log(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center p-8 lg:p-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex gap-8 lg:gap-16"
      >
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-gray-500 text-2xl mb-4">Create a new account</h1>
          <label className="text-gray-500 text-lg">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          />
          <label className="text-gray-500 text-lg">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          />
          <label className="text-gray-500 text-lg">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          />
          <label className="text-gray-500 text-lg">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-4 border border-gray-300 rounded"
          />
          <label className="text-gray-500 text-lg">Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-[#1dbf73] text-white py-3 font-semibold text-lg rounded border-none cursor-pointer"
          >
            Register
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-gray-500 text-2xl mb-4">
            I want to become a seller
          </h1>
          <div className="flex items-center gap-4">
            <label className="text-gray-500 text-lg">
              Activate the seller account
            </label>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                onChange={handleSeller}
                className="absolute opacity-0 w-0 h-0"
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label className="text-gray-500 text-lg">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          />
          <label className="text-gray-500 text-lg">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded"
          ></textarea>
        </div>
      </form>
    </div>
  );
};
export default Register;
