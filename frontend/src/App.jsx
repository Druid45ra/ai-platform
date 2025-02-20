import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ModelList from "./components/models/ModelList";
import ModelDetails from "./components/models/ModelDetails";
import ModelTraining from "./components/models/ModelTraining";
import Statistics from "./components/dashboard/Statistics";
import ProtectedRoute from "./components/common/ProtectedRoute";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/models"
              element={
                <PrivateRoute>
                  <ModelList />
                </PrivateRoute>
              }
            />
            <Route
              path="/models/:id"
              element={
                <PrivateRoute>
                  <ModelDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/models/:id/train"
              element={
                <PrivateRoute>
                  <ModelTraining />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
