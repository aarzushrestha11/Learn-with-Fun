import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RecruiterDashboard from "./pages/Dashborad/RecruiterDashboard";
import ParticipantDashboard from "./pages/Dashborad/ParticipantDashboard";
import Navbar from "./component/Navbar";
import NotFound from "./NotFound";
import AdminDashboard from "./pages/Dashborad/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateOpportunity from "./pages/Opportunities/CreateOpportunity";
import OpportunityDetails from "./pages/Opportunities/OpportunityDetails";
import NotificationsPage from "./pages/NotificationPage"
import Opportunityedit from "./pages/Opportunities/Oppurtunityedit";
import Users from "./pages/Users";
import SubmitOpportunity from "./pages/Opportunities/SubmitOpportunity";
import Submissions from "./pages/Opportunities/Submissions";
import EditSubmission from "./pages/Opportunities/Editsubmissions";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/view-opportunity/" element={<OpportunityDetails />} />

          <Route path="/opportunity/:_id/edit" element={<Opportunityedit />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <div className="p-4">
                  <AdminDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter"
            element={
              <ProtectedRoute roles={["Recruiter"]}>
                <div className="p-4">
                  <RecruiterDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/participant"
            element={
              <ProtectedRoute roles={["Participant"]}>
                <div className="p-4">
                  <ParticipantDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/submission/:_id"
            element={
              <ProtectedRoute roles={["Participant"]}>
                <div className="p-4">
                  <SubmitOpportunity />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-opportunity"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <CreateOpportunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/submissions"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <Submissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions/edit/:_id"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <EditSubmission />
              </ProtectedRoute>
            }
          />

      
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
