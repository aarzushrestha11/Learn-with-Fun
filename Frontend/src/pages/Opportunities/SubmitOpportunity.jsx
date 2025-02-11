import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SubmitOpportunity = () => {
  const { _id } = useParams();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('opportunityId', _id);

    try {
      const response = await fetch('http://localhost:5000/api/submissions/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file.');
      }

      const data = await response.json();
      console.log(data);
      setStatus('Submission successful!');
    } catch (error) {
      setStatus('Error uploading file.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/6.jpg')] bg-cover bg-center ">
      <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Submit Your File
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Opportunity ID */}
          <div>
            <label
              htmlFor="opportunityId"
              className="block text-lg font-medium text-gray-700"
            >
              Opportunity ID:
            </label>
            <input
              type="text"
              id="opportunityId"
              value={_id}
              readOnly
              className="w-full mt-2 rounded-lg border-gray-300 bg-gray-100 p-3 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700"
            >
              Choose File:
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full mt-2 rounded-lg border border-gray-300 p-3 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-6 text-center text-lg font-medium ${
              status.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitOpportunity;
