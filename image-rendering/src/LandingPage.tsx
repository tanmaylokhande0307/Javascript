import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate("/explore")}
        className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
      >
        <span>Start Creating</span>
      </button>
    </div>
  );
};

export default LandingPage;
