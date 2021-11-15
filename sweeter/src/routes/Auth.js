import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          name="email"
          type="text"
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
          value={passowrd}
          onChange={onChange}
          autoComplete="off"
        />
        <input type="submit" value="LOGIN" onClick={onSubmit} />
      </form>

      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;
