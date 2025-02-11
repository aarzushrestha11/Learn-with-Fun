import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-green-400 transition duration-300 ml-9">
          EDULearner
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-green-400 transition duration-300">
              Home
            </Link>
          </li>
          {user ? (
            <>
              {user.role === "Admin" && (
                <>
                  <li>
                    <Link to="/dashboard/admin" className="hover:text-blue-400 transition duration-300">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="hover:text-yellow-400 transition duration-300">
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/submissions" className="hover:text-yellow-400 transition duration-300">
                      View Submissions
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition duration-300">
                      Manage Opportunities
                    </Link>
                  </li>
                </>
              )}
              {user.role === "Recruiter" && (
                <>
                  <li>
                    <Link to="/dashboard/recruiter" className="hover:text-gray-300 transition duration-300">
                      Recruiter Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="hover:text-gray-300 transition duration-300">
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition duration-300">
                      Manage Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/submissions" className="hover:text-gray-300 transition duration-300">
                      View Submissions
                    </Link>
                  </li>
                </>
              )}
              {user.role === "Participant" && (
                <>
                  <li>
                    <Link to="/dashboard/participant" className="hover:text-gray-300 transition duration-300">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition duration-300">
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/notifications" className="hover:text-green-400 transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bell-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="hover:text-gray-300 transition duration-300">
                      <img className="h-10 w-10 rounded-full" src="https://sketchok.com/images/articles/06-anime/002-one-piece/26/16.jpg" alt="profile" />
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-400 transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-400 transition duration-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
