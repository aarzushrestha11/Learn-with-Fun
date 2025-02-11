import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import Submission from '../../assets/Submission.svg';
import Events from '../../assets/Events.svg';


const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className=" bg-[url('/6.jpg')] bg-cover bg-center h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 ml-[18rem]">Admin Dashboard</h1>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            {user.role}
          </span>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="h-80 w-96"  src={Events} alt="Landing"/>
            
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img className="h-80 w-96"  src={Submission} alt="Landing"/>

            
          </div>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link
            to="/create-opportunity"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaPlusCircle className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">Create Opportunity</h2>
              <p className="text-sm opacity-80 mt-2">Add a new opportunity for users.</p>
            </div>
          </Link>

          <Link
            to="/view-opportunity"
            className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <div className="text-center">
              <FaEye className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold">View Opportunities</h2>
              <p className="text-sm opacity-80 mt-2">Browse all available opportunities.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
