import React, { createContext, useState, useEffect } from "react";


// Create the context
export const AuthContext = createContext();

// Create the provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store the authenticated user
  const [loading, setLoading] = useState(true); // Loading state during initial app load
   
 const fetchUser = async (token) => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);
          setUser({
            token,
            name: data.name, 
            email: data.email, 
            role: data.role,
            
          });
          

        } else {
          localStorage.removeItem("token");
          setUser(null)
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
      
    };

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
    
      if (token ) {
        
        fetchUser(token);
      } else {
        setLoading(false);
      }
      
    };
    

   

    checkUser();
  }, []);

  const login = (token,role,name,email) => {
    
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setUser({ token, role, name, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
