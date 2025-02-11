import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <Link
          to="/"
          className=" text-black p-4 rounded hover:underline-offset-4"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
