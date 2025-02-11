import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Users.css";

const Users = () => {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (user && (user.role === "Admin" || user.role === "Recruiter")) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/users", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch users.");
          }

          const data = await response.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchUsers();
    }
  }, [user]);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

 
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">
            Please log in to view your profile.
          </h2>
        </div>
      </div>
    );
  }

  
  const RoleBadge = ({ role }) => {
    const roleColors = {
      Admin: "bg-red-500 text-white",
      Recruiter: "bg-blue-500 text-white",
      Participant: "bg-green-500 text-white",
    };

    return (
      <span
        className={`text-sm px-2 py-1 rounded-full font-semibold ${roleColors[role]}`}
      >
        {role}
      </span>
    );
  };

  return (
    <div id="image4" className="min-h-screen py-10 px-4 ">
      <div className="max-w-6xl flex justify-center items-center flex-col mx-auto  shadow-lg rounded-lg p-8 bg-white">

        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          {user.name}'s Profile
        </h1>
        <img className="h-20 w-20 rounded-full" src="https://sketchok.com/images/articles/06-anime/002-one-piece/26/16.jpg" alt="profile" srcset="" />

        <p className="text-lg text-gray-700 mb-4 text-center">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg text-gray-700 mb-8 text-center">
          <strong>Role:</strong> <RoleBadge role={user.role} />
        </p>

        {(user.role === "Admin" || user.role === "Recruiter") && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">All Users</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error:</strong> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4 ">
                      <h3 className="text-xl font-bold text-gray-900">
                        {u.name}
                      </h3>
                      <RoleBadge role={u.role} />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> {u.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Role:</strong> {u.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
