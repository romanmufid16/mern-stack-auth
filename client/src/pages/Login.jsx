import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="h-screen font-poppins flex">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="flex flex-col p-4 max-w-md w-full">
          <span className="mb-2 text-4xl font-semibold">Welcome Back</span>
          <span className="mb-10 text-md font-semibold">Enter your credentials to access your account</span>
          <form className="flex flex-col mb-5">
            <div className="mb-5 *:w-full">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-5 *:w-full">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3A5B22] p-2 rounded-lg text-white font-semibold"
            >
              Login
            </button>
          </form>
          <span className="text-center">
            Dont have an account?
            <Link to="/register" className="text-sky-600 hover:underline"> Sign Up</Link>
          </span>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 rounded-l-[50px] overflow-hidden">
        <img src="bg-daun.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
