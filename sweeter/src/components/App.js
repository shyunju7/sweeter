import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbBase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const updateUserName = async (userName) => {
    await updateProfile(userObject, { displayName: userName });
  };

  const refreshUser = () => {
    const user = authService.currentUser;
    console.log("refreshUser :", user);
    setUserObject(user);
    setNewUserName(user.displayName);

    // 이 방법 연구해보기!
    // setUserObject({
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   updateProfile: (args) => user.updateProfile(args),
    // });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        let userName = user.displayName;
        if (!user.displayName) {
          userName = user.email.substring(0, user.email.indexOf("@"));
          updateUserName(userName);
        }

        setUserObject(user);

        console.log(`useEffect User:`, user);
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
