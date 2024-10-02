import React from "react";
import { useNavigate } from "react-router-dom";

function Errorpages() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-red-600 text-4xl font-bold mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-center text-gray-700 text-lg mb-6">
        The page you are looking for does not exist. Please check the URL or
        return to the homepage.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default Errorpages;
