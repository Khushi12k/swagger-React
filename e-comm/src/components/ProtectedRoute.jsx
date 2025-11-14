
import instance from "../config/axiosConfig";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRoute({ children }) {
   const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);

  if (!isLoggedIn) <Navigate to="/login" />;
  else return children;
}
export default ProtectedRoute;
