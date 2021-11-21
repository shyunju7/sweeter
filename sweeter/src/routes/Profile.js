import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbBase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  margin-bottom: 12px;
  display: flex;
  width: 320px;
  flex-direction: column;
`;

const LogoutBtn = styled.button`
  outline: none;
  border: none;
  background-color: tomato;
  font-size: 14px;
`;

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
    if (
      newDisplayName !== userObject.displayName &&
      newDisplayName.length > 0
    ) {
      await updateProfile(userObject, { displayName: newDisplayName });
      refreshUser();
      alert("업데이트되었습니다:)");
    } else {
      setNewDisplayName(userObject.displayName);
      return;
    }
  };

  return (
    <Container>
      <ProfileForm onSubmit={onSubmit}>
        <input
          className="formInput profile_input"
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" className="formBtn" />
      </ProfileForm>

      <LogoutBtn onClick={onLogout} className="formBtn">
        Logout
      </LogoutBtn>
    </Container>
  );
};

export default Profile;
