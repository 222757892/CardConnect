import React from 'react';
import './Navbar.css';

// Import images directly
import logo from '../../img/logo.png';
import profileImg from '../../img/IMG-20240906-WA0261.jpg';

const Navbar = ({ toggleSideNav }) => {
    return (
        <nav>
            <div className="nav-left">
                <i className="fa-solid fa-bars" id="menu-toggle" onClick={toggleSideNav}></i>
                <img src={logo} alt="logo" />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <ul>
                <img className="logo-img" src={profileImg} alt="Profile" />
                <i className="fa-solid fa-angle-down"></i>
                <li><button className="profile-button">Thando Tinto</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;