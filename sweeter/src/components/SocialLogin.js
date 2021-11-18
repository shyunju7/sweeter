import React from "react";
import { authService, provider } from "../fbBase";
import { signInWithPopup } from "firebase/auth";

const SocialLogin = () => {
  const onSocialLogin = async () => {
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <button onClick={onSocialLogin}>Continue with Google</button>
    </div>
  );
};

export default SocialLogin;
