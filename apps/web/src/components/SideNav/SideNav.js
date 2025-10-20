import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import logo from '../../img/logo.png';

const SideNav = ({ isActive, closeSideNav }) => {
    const navigate = useNavigate();
    // const userRole = localStorage.getItem('role');

    const handleNavigation = (page) => {
        navigate(`/${page}`);
        closeSideNav();
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <>
            <div className={`overlay ${isActive ? 'active' : ''}`} onClick={closeSideNav}></div>
            <div className={`side-nav ${isActive ? 'active' : ''}`}>
                <div className="side-nav-top">
                    <img src={logo} alt="logo" />
                    <i className="fa-solid fa-xmark" id="close-menu" onClick={closeSideNav}></i>
                </div>
                <div className="nav-list">
                    <ul>
                        <div className="list-items" onClick={() => handleNavigation('dashboard')}>
                            <img className="list-items-icons" src="https://img.icons8.com/material-outlined/24/dashboard-layout.png" alt="dashboard-layout"/>
                            <li><button className="nav-button">Dashboard</button></li>
                        </div>
                        <div className="list-items" onClick={() => handleNavigation('profile')}>
                            <img className="list-items-icons" src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user-male-circle"/>
                            <li><button className="nav-button">Profile Information</button></li>
                        </div>
                        <div className="list-items" onClick={() => handleNavigation('settings')}>
                            <img className="list-items-icons" src="https://img.icons8.com/windows/32/settings.png" alt="settings"/>
                            <li><button className="nav-button">Settings</button></li>
                        </div>
                        <div className="list-items" onClick={() => handleNavigation('notifications')}>
                            <img className="list-items-icons" src="https://img.icons8.com/windows/32/alarm.png" alt="alarm"/>
                            <li><button className="nav-button">Notification Center</button></li>
                        </div>
                        <div className="list-items" onClick={() => handleNavigation('virtual-card')}>
                            <img className="list-items-icons" src="https://img.icons8.com/windows/32/identification-documents.png" alt="identification-documents"/>
                            <li><button className="nav-button">Virtual Card</button></li>
                        </div>
                        <div className="list-items" onClick={handleLogout}>
                            <div className="log-out">
                                <button className="logout-button">Log Out</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideNav;