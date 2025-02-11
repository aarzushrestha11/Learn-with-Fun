import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {  
    return <div>Loading...</div>;
  }
  console.log("ProtectedRoute user:", user);
  console.log("Allowed roles:", roles);
  if (!user) {
    return <Navigate to="/login" />;
  }

    
    if (roles && !roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase())) {
      console.warn("Unauthorized access attempt by role:", user.role);
      return <Navigate to="/" />;
    }
     
      
     
    
  
  return children;
};

export default ProtectedRoute;
