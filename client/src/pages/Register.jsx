import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../libs/axiosInstance.js";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setError(error.response ? error.response.data.errors : error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen font-poppins flex">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="flex flex-col p-4 max-w-md w-full">
          <span className="mb-10 text-4xl font-semibold">Get Started Now</span>
          <form className="flex flex-col mb-5" onSubmit={handleSubmit}>
            <div className="mb-5 *:w-full">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-5 *:w-full">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-5 *:w-full">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your Password"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-5">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#3A5B22] p-2 rounded-lg text-white font-semibold"
            >
              {loading ? "Loading.." : "Signup"}
            </button>
          </form>
          <span className="text-center">
            Have an account?
            <Link to="/login" className="text-sky-600 hover:underline">
              {" "}
              Sign In
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 rounded-l-[50px] overflow-hidden">
        <img src="bg-daun.png" alt="background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
