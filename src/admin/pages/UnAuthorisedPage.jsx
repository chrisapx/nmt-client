import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UnauthorisedPage = () => {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();

  const handleLoginRedirect = () => {
    dispatchAuth(true);
    // navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You must log in to access the admin panel.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default UnauthorisedPage;