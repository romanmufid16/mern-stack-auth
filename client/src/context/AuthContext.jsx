import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if(token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  },[]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
