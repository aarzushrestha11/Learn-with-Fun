import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/submissions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }

        const data = await response.json();
        console.log(data)
        setSubmissions(data.submissions);
      } catch (error) {
        setStatus('Error fetching submissions');
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Reviewed':
        return 'bg-blue-500 text-white';
      case 'Approved':
        return 'bg-green-500 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6  hover:shadow-2xl transition duration-300 ">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">All Submissions</h1>

      {status && (
        <div className="mb-6 text-center text-lg font-semibold text-red-600">
          {status}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {submissions.map((submission) => (
          <div
            key={submission._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 "
          >
            <p className="  text-gray-600 mb-2  ">
            <strong>opportunity-id:</strong> {submission._id || 'Anonymous'}
            </p>

            <p className="text-gray-600">
              <strong>User:</strong> {submission.userId?.name || 'Anonymous'}
            </p>

            <p className="text-gray-600">
              <strong>Email:</strong> {submission.userId?.email || 'N/A'}
            </p>

            <div className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(submission.status)}`}>
              {submission.status}
            </div>

            <p className="mt-4 text-gray-600">
              <strong>Feedback:</strong> {submission.feedback || 'No feedback yet'}
            </p>

            <button
              onClick={()=>{navigate(`/submissions/edit/${submission._id}`)}}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Submission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
