import React from "react";
import "../CSS/Role.css"; // Make sure to import the CSS file
import { useNavigate } from "react-router-dom";


const Role = () => {
     const navigate = useNavigate(); // Hook to programmatically navigate

     const LoginComponent = () => {
       navigate("/login"); // Navigate to the next page
     };
  return (
    <div className="container">
      <div className="role-button">
        <button onClick={LoginComponent}>Reader</button>
      </div>
      <div className="role-button">
        <button onClick={LoginComponent}>Admin</button>
      </div>
      <div className="role-button">
        <button onClick={LoginComponent}>NewsProvider</button>
      </div>
    </div>
  );
};

export default Role;
