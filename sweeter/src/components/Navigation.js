import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObject }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/profile">My PROFILE</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
