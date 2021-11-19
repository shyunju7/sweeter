import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const List = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  list-style: none;
`;

const Item = styled.li`
  color: ${(props) => (props.current ? "#04aaff" : "#ffffff")};
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
