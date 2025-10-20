import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SideNav from '../components/SideNav/SideNav';
import '../App.css';

const NotificationCenter = ({ isSideNavActive, toggleSideNav, closeSideNav }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [recipientType, setRecipientType] = useState('all_students');
    const [specificEmails, setSpecificEmails] = useState('');
    const [specificCourse, setSpecificCourse] = useState('');
    const [specificDepartment, setSpecificDepartment] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchNotifications = async () => {
            try {
                let response;
                if (userRole === 'ADMIN') {
                    response = await axios.get('http://localhost:8080/api/notifications/admin');
                } else {
                    response = await axios.get(`http://localhost:8080/api/notifications/user/${userId}`);
                }
                setNotifications(response.data);
            } catch (err) {
                setError('Failed to fetch notifications');
                console.error(err);
            }
        };

        fetchNotifications();
    }, [userId, userRole, navigate]);

    const handleSend = async () => {
        if (userRole !== 'ADMIN') {
            setError('Only admins can send notifications');
            return;
        }

        try {
            const notification = {
                subject,
                content,
                recipientType,
                specificEmails: recipientType === 'specific_person' ? specificEmails : '',
                specificCourse: recipientType === 'specific_course' ? specificCourse : '',
                specificDepartment: recipientType === 'specific_department' ? specificDepartment : '',
            };
            const response = await axios.post('http://localhost:8080/api/notifications', notification);
            setNotifications([response.data, ...notifications]);
            setSubject('');
            setContent('');
            setSpecificEmails('');
            setSpecificCourse('');
            setSpecificDepartment('');
            setError(null);
        } catch (err) {
            setError('Failed to send notification');
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar toggleSideNav={toggleSideNav} />
            <SideNav isActive={isSideNavActive} closeSideNav={closeSideNav} />
            <div className="main-section">
                <h1>Notification Center {userRole === 'ADMIN' ? '(Admin)' : '(Student)'}</h1>
                {error && <p className="error">{error}</p>}

                {userRole === 'ADMIN' && (
                    <div className="notification-container">
                        <form className="notification-form">
                            <label>Subject:</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />

                            <label>Content:</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="6" required />

                            <label>Send to:</label>
                            <select value={recipientType} onChange={(e) => setRecipientType(e.target.value)}>
                                <option value="all_students">All Students</option>
                                <option value="specific_course">Specific Course</option>
                                <option value="specific_department">Specific Department</option>
                                <option value="specific_person">Specific Person(s)</option>
                            </select>

                            {recipientType === 'specific_person' && (
                                <>
                                    <label>Emails (comma-separated):</label>
                                    <input type="text" value={specificEmails} onChange={(e) => setSpecificEmails(e.target.value)} placeholder="example1@email.com, example2@email.com" required />
                                </>
                            )}

                            {recipientType === 'specific_course' && (
                                <>
                                    <label>Course Name/ID:</label>
                                    <input type="text" value={specificCourse} onChange={(e) => setSpecificCourse(e.target.value)} required />
                                </>
                            )}

                            {recipientType === 'specific_department' && (
                                <>
                                    <label>Department Name:</label>
                                    <input type="text" value={specificDepartment} onChange={(e) => setSpecificDepartment(e.target.value)} required />
                                </>
                            )}

                            <button type="button" onClick={handleSend} className="btn btn-primary">Send Notification</button>
                        </form>
                    </div>
                )}

                <div className="message-history">
                    <h2>{userRole === 'ADMIN' ? 'Sent Messages' : 'Received Messages'}</h2>
                    {notifications.length === 0 ? (
                        <p>No messages {userRole === 'ADMIN' ? 'sent' : 'received'} yet.</p>
                    ) : (
                        <div className="message-list">
                            {notifications.map((msg, index) => (
                                <div key={index} className="message-card">
                                    <h3>{msg.subject}</h3>
                                    <p>{msg.content}</p>
                                    <p><strong>Recipient:</strong> {msg.recipient}</p>
                                    <p><strong>Sent:</strong> {msg.timestamp}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;