import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Landing from '../assets/Landing.svg';
import DateTime from './Opportunities/Date'

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div 
  
      className="relative  flex flex-col items-center justify-center " 
      style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}
    >
      <div className="m-5">
      <DateTime />
      </div>
      
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">EDULearner</h1>
      <p className="mb-8 text-xl text-black text-center ">
        Where Education Meets Innovation 🚀
      </p>
     <img className="h-96 w-96"  src={Landing} alt="Landing"/>
      {user ? (
        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center">
          <p className="text-xl font-semibold text-gray-700">
            Welcome Back, <span className="animate-bounce">{user.name}</span>! 🎉
          </p>
          
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md">
            Login
          </Link>
          <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-md">
            Register
          </Link>
        </div>
      )}

      <div className="mt-16 mb-5 pb-5 ">
        <div className="grid gap-4 grid-cols-2 grid-rows-2">
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-700">Hackathons</h3>
            <p className="text-sm text-gray-500">Join thrilling coding competitions and show off your skills 👩‍💻👨‍💻.</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-700">Quizzes</h3>
            <p className="text-sm text-gray-500">Test your knowledge and win rewards in engaging quizzes 🧠🏅.</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-700">Internships</h3>
            <p className="text-sm text-gray-500">Kickstart your career with top internships 🌟🏢.</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-700">Job Openings</h3>
            <p className="text-sm text-gray-500">Explore exciting job openings and find your dream job 💼✨.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
