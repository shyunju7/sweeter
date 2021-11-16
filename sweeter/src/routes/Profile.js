import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbBase";

const Profile = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;
