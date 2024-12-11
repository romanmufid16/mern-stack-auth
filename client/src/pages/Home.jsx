import React, { useContext } from "react";
import axiosInstance from "../libs/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      axiosInstance.post("/users/logout");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mb-4">Hello, {user.name}</p>
      <button
        onClick={handleLogout}
        className="bg-cyan-500 px-3 py-2 rounded-md border border-black [box-shadow:5px_5px_0px_black]"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
