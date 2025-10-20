// Temporary route for testing the Notifications screen with mock data.
// This allows UI development without relying on backend integration.
//DO NOT DELETE - FOR TESTING PURPOSES ONLY

import React, { useState } from 'react';
import NotificationCenter from '../NotificationsCenter';

const TestNotificationCenter = () => {
  // Set mock user data
  localStorage.setItem('userId', '123');
  localStorage.setItem('role', 'ADMIN');

  // Side nav state and handlers
  const [isSideNavActive, setIsSideNavActive] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavActive((prev) => !prev);
  };

  const closeSideNav = () => {
    setIsSideNavActive(false);
  };

  return (
    <NotificationCenter
      isSideNavActive={isSideNavActive}
      toggleSideNav={toggleSideNav}
      closeSideNav={closeSideNav}
    />
  );
};

export default TestNotificationCenter;