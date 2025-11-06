import { useEffect, useState } from "react";
import instance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  async function isUserLoggedIn() {
    const response = await instance.get("/auth/authCheck", {
      withCredentials: true,
    });
    console.log(response);
  }

  //   if (!isUserLoggedIn) navigate("/login");
  //   else return { children };
}

export default ProtectedRoute;
