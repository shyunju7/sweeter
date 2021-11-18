import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbBase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const [newUserName, setNewUserName] = useState("");

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject(user);
    setNewUserName(user.displayName);
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        let userName = user.displayName;
        if (!user.displayName) {
          userName = user.email.substring(0, user.email.indexOf("@"));
          updateProfile(userObject, { displayName: userName });
        }

        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObject={userObject}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Sweeter</footer>
    </>
  );
}

export default App;
