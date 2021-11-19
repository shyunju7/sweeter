import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
const AppRouter = ({ refreshUser, isLoggedIn, userObject }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <div className="router_container">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                exact
                path="/"
                element={
                  <Home userObject={userObject} refreshUser={refreshUser} />
                }
              />
              <Route
                exact
                path="/profile"
                element={
                  <Profile userObject={userObject} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route exact path="/" element={<Auth />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
