import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./profile.scss";


const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, Bangalore, India",
    mobile: "+91 9876543210",
    occupation: "Software Engineer",
    company: "Tech Solutions Pvt Ltd"
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Company:</strong> {user.company}</p>
      </div>
    </div>
  );
};

export default Profile;