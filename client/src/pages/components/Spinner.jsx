// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval); // Clear interval when count reaches 0
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #4e73df, #1f3c88)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 className="text-4xl font-semibold mb-4 animate__animated animate__fadeIn">
        Redirecting you in <span className="text-5xl">{count}</span>
      </h1>

      {/* Circular countdown visualization */}
      <div className="relative flex justify-center items-center">
        <div className="w-40 h-40 border-4 border-t-indigo-600 rounded-full animate-spin-slow">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-40 rounded-full"></div>
        </div>
      </div>

      <div className="spinner-border mt-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Tooltip with a more detailed message */}
      <div className="mt-4 p-2 rounded-md bg-indigo-800 opacity-75 max-w-xs">
        <span className="text-sm">Please wait while we prepare your request...</span>
      </div>
    </div>
  );
};

export default Spinner;
