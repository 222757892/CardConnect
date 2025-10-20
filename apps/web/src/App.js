import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotificationCenter from "./screens/NotificationsCenter";
import ViewCard from "./screens/ViewCard";
import TestViewCard from "./screens/testing/TestViewCard";
import TestNotificationCenter from "./screens/testing/TestNotificationCenter";

/* Partner's pages (avoid name collisions by aliasing if needed) */
import Login from "./screens/Login";        // partner's Login page
import Signup from "./screens/Signup";     // partner's Signup page
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";

import "./App.css";

export default function App() {
  const [isSideNavActive, setIsSideNavActive] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavActive(!isSideNavActive);
  };

  const closeSideNav = () => {
    setIsSideNavActive(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* --------------------
             Public routes (both teams)
             -------------------- */}

          {/* Primary login/signup routes (your app's screens) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Legacy / partner pages kept available under alternate routes
              so both teams' code remains usable without naming conflicts.
              You can change these URLs to whatever you prefer, or remove
              them once everyone migrates to the same components. */}
          <Route path="/legacy-login" element={<Login />} />
          <Route path="/legacy-signup" element={<Signup />} />

          {/* Partner's welcome and profile pages */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />

          {/* --------------------
             Unified / role-aware routes (your app)
             -------------------- */}
          <Route
            path="/notifications"
            element={
              <NotificationCenter
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          <Route
            path="/virtual-card"
            element={
              <ViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          {/* Default route -> your Login screen (change to Welcome if you'd rather) */}
          <Route path="/" element={<Login />} />

          {/* Redirects / old routes mapped to new unified ones */}
          <Route
            path="/user-card"
            element={
              <ViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />
          <Route
            path="/user-notifications"
            element={
              <NotificationCenter
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          {/* --------------------
             Temporary test routes
             -------------------- */}
          <Route
            path="/test-viewcard"
            element={
              <TestViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          <Route
            path="/test-notifications"
            element={<TestNotificationCenter />}
          />
        </Routes>
      </div>
    </Router>
  );
}
