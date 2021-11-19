import React from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import SocialLogin from "../components/SocialLogin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Auth = () => {
  return (
    <Container>
      <AuthForm />
      <SocialLogin />
    </Container>
  );
};

export default Auth;
