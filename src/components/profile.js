import React from 'react';
import './profile.css';
import Navbar from './navbar';

const ProfilePage = () => {
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, Anytown, USA',
  };

  const handleEditProfile = () => {
    console.log('Edit Profile clicked');
  };
  
  const handleLogout = () => {
    console.log('Log Out clicked');
  };
  

  return (
    <div className="profile-page">
        <Navbar />
      <h1 className="profile-header">Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Name:</strong> {userData.name}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="profile-item">
          <strong>Phone:</strong> {userData.phone}
        </div>
        <div className="profile-item">
          <strong>Address:</strong> {userData.address}
        </div>
      </div>
      <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default ProfilePage;
