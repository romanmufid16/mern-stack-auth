import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../libs/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const token = response.data.token;

      const decoded = jwtDecode(response.data.token);
      sessionStorage.setItem("user", JSON.stringify(decoded));
      sessionStorage.setItem("token", token);

      setLoading(false);
      setIsAuthenticated(true);

      toast.success("Login success", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.errors : error.message);
      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };
  return (
    <div className="h-screen font-poppins flex">
      <ToastContainer />
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="flex flex-col p-4 max-w-md w-full">
          <span className="mb-2 text-4xl font-semibold">Welcome Back</span>
          <span className="mb-10 text-md font-semibold">
            Enter your credentials to access your account
          </span>
          <form className="flex flex-col mb-5" onSubmit={handleSubmit}>
            <div className="mb-5 *:w-full">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block rounded-lg px-3 py-2 text-sm border-2 border-[#D9D9D9] focus:outline-none"
                placeholder="Enter your email"
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
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-5">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#3A5B22] p-2 rounded-lg text-white font-semibold"
            >
              {loading ? "Loading.." : "Login"}
            </button>
          </form>
          <span className="text-center">
            Dont have an account?
            <Link to="/register" className="text-sky-600 hover:underline">
              {" "}
              Sign Up
            </Link>
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
