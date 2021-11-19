import React from "react";
import { authService, provider } from "../fbBase";
import { signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
const AuthButton = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background: white;
  cursor: pointer;
`;

const SocialLogin = () => {
  const onSocialLogin = async () => {
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <AuthButton onClick={onSocialLogin}>
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </AuthButton>
    </div>
  );
};

export default SocialLogin;
