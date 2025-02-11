import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/Background.jpg";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Participant", profile: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          profile: form.profile,
        }),
      });

      if (response.ok) {
        alert("Success");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div 
      id="image1" 
      className="min-h-screen flex items-center justify-center bg-cover bg-center" 
style={{ 
        backgroundImage: `url(${BackgroundImage})`,
        height: "100vh", 
        width: "100vw", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
        imageRendering: "auto" 
      }}    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Join the ever-growing platform</h2>
         
        </div>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded bg-gray-50 focus:ring focus:ring-blue-300"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded bg-gray-50 focus:ring focus:ring-blue-300"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded bg-gray-50 focus:ring focus:ring-blue-300"
              placeholder="Your Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 text-gray-600 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="w-1/2 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500 px-2">or continue with</p>
          <div className="w-1/2 h-px bg-gray-300"></div>
        </div>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
