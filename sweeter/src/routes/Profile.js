import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbBase";

const Profile = ({ userObject, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
  const navigate = useNavigate();
  const onLogout = () => {
    authService.signOut();
    navigate("/");
  };

  const getMySweet = async () => {
    const mySweets = await query(
      collection(dbService, "sweets"),
      where("creatorId", "==", userObject.uid)
    );

    const querySnapshot = await getDocs(mySweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMySweet();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    // 변경됐다면 update
    if (newDisplayName !== userObject.displayName) {
      await updateProfile(userObject, { displayName: newDisplayName });
      refreshUser();
    } else {
      return;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;
