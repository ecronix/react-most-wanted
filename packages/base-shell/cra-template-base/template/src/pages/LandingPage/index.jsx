import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
};
