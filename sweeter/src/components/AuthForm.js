import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../fbBase";

const Container = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const AuthInput = styled.input`
  max-width: 320px;
  width: 320px;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const AuthSwitchButton = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-align: center;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const toggleAccount = () => setNewAccount(!isNewAccount);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      console.log("onSubmit()....");
      if (isNewAccount) {
        // create new User
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // login
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <AuthInput
        name="email"
        type="email"
        placeholder="E-Mail"
        required
        value={email}
        onChange={onChange}
        autoComplete="off"
      />
      <AuthInput
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onChange}
        autoComplete="off"
      />
      <AuthInput
        className="authSubmit"
        type="submit"
        value={isNewAccount ? "Create Account" : "Login"}
      />
      <AuthSwitchButton onClick={toggleAccount}>
        {isNewAccount ? "회원가입하기" : "로그인하기"}
      </AuthSwitchButton>
      {error && <AuthError>{error}</AuthError>}
    </Container>
  );
};

export default AuthForm;
