import AppRouter from "./Router";
import React, { useState } from "react";
import { authService } from "../fbBase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Sweeter</footer>
    </>
  );
}

export default App;
