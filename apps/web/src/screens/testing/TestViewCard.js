// Temporary route for testing the ViewCard screen with mock data.
// This allows UI development without relying on backend integration.
//DO NOT DELETE - FOR TESTING PURPOSES ONLY

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideNav from "../../components/SideNav/SideNav";
import VirtualCard from "../../components/VirtualCard/VirtualCard";
import "../../App.css";

function TestViewCard() {
  const [isSideNavActive, setIsSideNavActive] = useState(false);

  const toggleSideNav = () => setIsSideNavActive(!isSideNavActive);
  const closeSideNav = () => setIsSideNavActive(false);

  // Mocked user details
  const userDetails = {
    id: "123456",
    name: "Thando Tinto",
    role: "STUDENT",
    email: "thando.tinto@example.com",
    phone: "+27 123 456 7890",
    address: "Cape Town, South Africa",
    department: "Computer Science",
    facility: "Engineering Faculty",
    course: "BSc in Software Engineering",
  };

  const mockImageUrl = require("../../img/image1.jpg");

  return (
    <div>
      <Navbar toggleSideNav={toggleSideNav} />
      <SideNav isActive={isSideNavActive} closeSideNav={closeSideNav} />
      <div className="main-section">
        <h1>Testing Virtual Card</h1>
        <VirtualCard
          userDetails={userDetails}
          imageUrl={mockImageUrl}
          onImageUpdate={(file) => alert(`Mock image upload: ${file.name}`)}
        />
      </div>
    </div>
  );
}

export default TestViewCard;
