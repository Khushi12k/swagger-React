import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRoute({ children }) {
  const { state } = useAuth();     
  const { isLoggedIn } = state;    

  console.log("Auth status:", isLoggedIn);


  if (isLoggedIn === null) return null;


  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
