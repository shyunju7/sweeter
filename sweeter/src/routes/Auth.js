import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../fbBase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setNewAccount] = useState(true);

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
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          required
          value={email}
          onChange={onChange}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          autoComplete="off"
        />
        <input
          type="submit"
          value={isNewAccount ? "Create Account" : "Login"}
        />
      </form>

      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;
