import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import Events from '../../assets/Events.svg';
import Submission from '../../assets/Submission.svg';
const ParticipantDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
   
    return <div>Loading...</div>;
  }

  if (!user) {
   
    return <Navigate to="/login" />;
  }

  if (user.role !== "Participant") {
   
    return <Navigate to="/" />;
  }
  return (
    <div className=" bg-[url('/6.jpg')] bg-cover bg-center h-screen p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 ml-[18rem]">Participant Dashboard</h1>
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
                        to="/view-opportunity"
                        className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                      >
                        <div className="flex items-center justify-center flex-col">
                          <FaPlusCircle className="text-4xl mb-4 text-center" />
                          <h2 className="text-2xl font-semibold"> Opportunities</h2>
                          <p className="text-sm opacity-80 mt-2">View All opportunity for users 🙌</p>
                        </div>
                      </Link>
            
                      <Link
                        to="/submission/676db6fe7714e847be2ec0a4"
                        className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                      >
                        <div className=" flex items-center justify-center flex-col">
                          <FaEye className="text-4xl mb-4 text-center" />
                          <h2 className="text-2xl font-semibold">Submissions </h2>
                          <p className="text-sm opacity-80 mt-2">Make Submissions 🙌</p>
                        </div>
                      </Link>
                    </div>
                  </div>
     </div>
      );
    };
    
  

export default ParticipantDashboard;
