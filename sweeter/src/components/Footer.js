import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#333333")};
`;

const Footer = ({ isDarkMode }) => {
  return (
    <Container isDarkMode={isDarkMode}>
      &copy; {new Date().getFullYear()} Sweeter with Nomad Coders
    </Container>
  );
};

export default Footer;
