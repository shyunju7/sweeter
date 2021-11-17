import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
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
