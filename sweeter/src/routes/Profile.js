import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbBase";

const Profile = ({ userObject }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    authService.signOut();
    navigate("/");
  };

  const getMySweet = async () => {
    const mySweets = await query(
      collection(dbService, "sweets"),
      where("creatorId", "==", userObject.uid),
      orderBy("createdAt")
    );

    const querySnapshot = await getDocs(mySweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMySweet();
  }, []);

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;
