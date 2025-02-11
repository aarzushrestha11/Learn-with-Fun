import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import "./Oppurtunityedit.css"

const EditOpportunity = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [opportunity, setOpportunity] = useState({
    title: "",
    description: "",
    type: "Hackathon",
    deadline: "",
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/opportunities/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpportunity({
            title: data.title,
            description: data.description,
            type: data.type,
            deadline: new Date(data.deadline).toISOString().split("T")[0],
          });
        } else {
          console.error("Failed to fetch opportunity details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOpportunity();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity((prevOpportunity) => ({
      ...prevOpportunity,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/opportunities/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(opportunity),
      });

      if (response.ok) {
        alert("Opportunity updated successfully");
        navigate("/view-opportunity");
      } else {
        console.error("Failed to update opportunity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (user?.role !== "Admin" && user?.role !== "Recruiter") {
    return <p className="text-red-600 text-center mt-10">Unauthorized Access</p>;
  }

  return (
    <div id="image7" className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2 mb-6">
          <FaEdit /> Edit Opportunity
        </h1>

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={opportunity.title}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={opportunity.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={opportunity.type}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="Hackathon">Hackathon</option>
            <option value="Quiz">Quiz</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={opportunity.deadline}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

      
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Update Opportunity
        </button>
      </form>
    </div>
  );
};

export default EditOpportunity;
