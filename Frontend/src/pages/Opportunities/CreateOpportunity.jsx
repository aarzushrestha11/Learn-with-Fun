import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import"./CreateOpportunity.css"

const CreateOpportunity = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Hackathon",
    deadline: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let response = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const responseData = await response.json();

      if (response.ok) {
        alert("Opportunity created");
        navigate("/dashboard/admin");
      } else {
        console.error("Failed to create opportunity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="image5" className="min-h-screen p-6  flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Opportunity
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the opportunity title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a brief description"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Hackathon">Hackathon</option>
            <option value="Quiz">Quiz</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Create Opportunity
        </button>
      </form>
    </div>
  );
};

export default CreateOpportunity;
