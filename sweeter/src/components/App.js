import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbBase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  const updateUserName = async (userName) => {
    await updateProfile(userObject, { displayName: userName });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);

        if (!user.displayName) {
          const userName = user.email.substring(0, user.email.indexOf("@"));
          updateUserName(userName);
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
        <AppRouter userObject={userObject} isLoggedIn={isLoggedIn} />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Sweeter</footer>
    </>
  );
}

export default App;
