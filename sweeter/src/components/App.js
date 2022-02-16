import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbBase";
import { updateProfile } from "firebase/auth";
import Footer from "./Footer";
import styled from "styled-components";
import { RiSunFill, RiMoonFill } from "react-icons/ri";

const ThemeSwitchButton = styled.span`
  position: absolute;
  top: 40px;
  right: 60px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#04aaff")};
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 32px;
  text-align: center;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState({});
  const [isDarkMode, setDarkMode] = useState(true);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject(user);
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          const userName = user.email.substring(0, user.email.indexOf("@"));
          updateProfile(user, { displayName: userName });
        }
        setUserObject(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <div>
          <ThemeSwitchButton
            onClick={() => setDarkMode((prev) => !prev)}
            isDarkMode={isDarkMode}
          >
            {isDarkMode ? <RiMoonFill /> : <RiSunFill />}
          </ThemeSwitchButton>
          <AppRouter
            refreshUser={refreshUser}
            userObject={userObject}
            isLoggedIn={isLoggedIn}
            isDarkMode={isDarkMode}
          />
        </div>
      ) : (
        "initializing..."
      )}
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}

export default App;
