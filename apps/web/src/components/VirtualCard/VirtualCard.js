import React, { useState, useRef } from 'react';
import './VirtualCard.css';

// Import images directly
import gradCap from '../../img/icons8-graduation-cap-64.png';
import profilePhoto from '../../img/image1.jpg';
import qrCode from '../../img/websiteQRCode_noFrame.png';

const VirtualCard = ({ userDetails, imageUrl, onImageUpdate }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fileInputRef = useRef(null);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Exit fullscreen when pressing Escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isFullscreen]);

    // Determine card title based on role
    const getCardTitle = () => {
        if (userDetails?.role === 'ADMIN') {
            return 'Cape Peninsula Of Technology Virtual Admin Card';
        } else {
            return 'Cape Peninsula Of Technology        Virtual Student Card';
        }
    };

    const handleImageUpdateClick = () => {
        if (onImageUpdate) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0] && onImageUpdate) {
            onImageUpdate(e.target.files[0]);
            e.target.value = ''; // Reset file input
        }
    };

    return (
        <div className="main-section-card">
            <div className={`card ${isFullscreen ? 'fullscreen' : ''}`}>
                {/* Fullscreen Button */}
                <button className="fullscreen-btn" onClick={toggleFullscreen}>
                    <i className={isFullscreen ? 'fas fa-compress' : 'fas fa-expand'}></i>
                </button>

                {/* Left Blue Section */}
                <div className="card-left">
                    <h2>{getCardTitle()}</h2>
                    <img src={gradCap} alt="graduation-cap"/>
                </div>

                {/* Right Section */}
                <div className="card-right">
                    <div className="profile">
                        <div className="profile-image-container">
                            <div className="image-wrapper">
                                <img
                                    src={imageUrl || profilePhoto}
                                    alt="Profile"
                                    onError={(e) => {
                                        e.target.src = profilePhoto;
                                    }}
                                />
                                {onImageUpdate && (
                                    <>
                                        <button
                                            className="update-image-btn"
                                            onClick={handleImageUpdateClick}
                                            title="Update Profile Image"
                                        >
                                            <i className="fas fa-camera"></i>
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="contact">
                                <p><strong>Contact Information</strong>
                                    {userDetails?.phone || 'Not provided'}
                                </p>
                                <p><strong>Email Address</strong>
                                    {userDetails?.email || 'Not provided'}
                                </p>
                                <p><strong>Address</strong>
                                    {userDetails?.address || 'Not provided'}
                                </p>
                            </div>
                        </div>
                        <div className="info">
                            <h3>{userDetails?.name || 'User Name'}</h3>
                            <p><span>{userDetails?.role === 'Admin' ?'Admin Number' :'Student Number'}:</span>{userDetails?.id}</p>
                            <p><span>Facility:</span>{userDetails?.facility || 'N/A'}</p>
                            <p><span>Department:</span>{userDetails?.department || 'N/A'}</p>
                            <p><span>Course:</span>{userDetails?.course || 'N/A'}</p>
                            <div className="qr">
                                <img src={qrCode} alt="QR Code" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualCard;