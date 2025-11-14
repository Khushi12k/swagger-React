import { createContext, useContext, useEffect, useState } from "react";
import instance from "../config/axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  async function isUserLoggedIn() {
    try {
      const response = instance.get("/auth/authCheck", {
        withCredentials: true,
      });
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }

  return (
    <authContext.Provider value={{ isLoggedIn, isUserLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
