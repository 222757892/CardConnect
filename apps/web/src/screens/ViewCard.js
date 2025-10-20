import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SideNav from '../components/SideNav/SideNav';
import VirtualCard from '../components/VirtualCard/VirtualCard';
import '../App.css';

function ViewCard({ isSideNavActive, toggleSideNav, closeSideNav }) {
    const [userDetails, setUserDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (err) {
                setError('Failed to fetch user details');
                console.error(err);
            }
        };

        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}/image`, { responseType: 'blob' });
                if (response.data) {
                    setImageUrl(URL.createObjectURL(response.data));
                }
            } catch (err) {
                console.log('No image found or error fetching image');
            }
        };

        fetchUserDetails();
        fetchImage();
    }, [userId, navigate]);

    const handleImageUpdate = async (file) => {
        if (!file) {
            setError('Please select an image to upload');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post(`http://localhost:8080/api/users/${userId}/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Refresh the image after successful upload
            const response = await axios.get(`http://localhost:8080/api/users/${userId}/image`, { responseType: 'blob' });
            setImageUrl(URL.createObjectURL(response.data));
            setError(null);
        } catch (err) {
            setError('Failed to upload image');
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar toggleSideNav={toggleSideNav} />
            <SideNav isActive={isSideNavActive} closeSideNav={closeSideNav} />
            <div className="main-section">
                <h1>{userRole === 'ADMIN' ? 'Admin Card' : 'Student Card'}</h1>
                {error && <p className="error">{error}</p>}
                {userDetails ? (
                    <VirtualCard
                        userDetails={userDetails}
                        imageUrl={imageUrl}
                        onImageUpdate={handleImageUpdate}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ViewCard;