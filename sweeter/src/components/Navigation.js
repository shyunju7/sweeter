import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const List = styled.ul`
  width: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  list-style: none;
`;

const Item = styled.li`
  color: ${(props) => (props.current ? "#04aaff" : "#d9d9d9")};
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  text-decoration: none;

  &:first-child {
    margin-right: 32px;
  }
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      <List>
        <Item current={location.pathname === "/"}>
          <NavLink to="/">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </NavLink>
        </Item>
        <Item current={location.pathname === "/profile"}>
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </NavLink>
        </Item>
      </List>
    </nav>
  );
};

export default Navigation;
