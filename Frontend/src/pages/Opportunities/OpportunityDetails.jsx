import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCalendarAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const OpportunityDetails = () => {
  const [opportunities, setOpportunities] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/opportunities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpportunities(data);
        } else {
          console.error("Failed to fetch opportunities");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (!opportunities) return <p className="text-center text-lg text-gray-600">No opportunities available.</p>;

  // Function to determine badge color based on opportunity type
  const getBadgeColor = (type) => {
    switch (type) {
      case "Hackathon":
        return "bg-blue-100 text-blue-800";
      case "Quiz":
        return "bg-purple-100 text-purple-800";
      case "Job":
        return "bg-green-100 text-green-800";
      case "Internship":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <div
          key={opportunity._id}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold text-blue-600">{opportunity.title}</h1>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${getBadgeColor(opportunity.type)}`}
            >
              {opportunity.type}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{opportunity.description}</p>
          <div className="flex items-center mb-4">
            <FaBriefcase className="text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">
              <strong>Type:</strong> {opportunity.type}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">
              <strong>Deadline:</strong>{" "}
              {new Date(opportunity.deadline).toLocaleDateString()}
            </span>
          </div>

          {user?.role === "Participant" && (
            <button
              onClick={() => {
                navigate(`/submission/${opportunity._id}`);
              }}
              className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
            >
              Submit <FaArrowRight />
            </button>
          )}

          {(user?.role === "Admin" || user?.role === "Recruiter") && (
            <button
              onClick={() => {
                navigate(`/opportunity/${opportunity._id}/edit`);
              }}
              className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 mt-4"
            >
              Edit <FaUserEdit />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OpportunityDetails;
