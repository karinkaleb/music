import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import '../styles/profile.css';
import defaultBackground from '../data/songs_covers/default-background.jpg';

const Profile = ({ setIsLoggedIn }) => {
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Ошибка загрузки профиля');
        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email
        });
        if (data.avatarUrl) setAvatar(data.avatarUrl);
      } catch (error) {
        console.error('Profile load error:', error);
        alert('Не удалось загрузить данные профиля');
      }
    };
    fetchProfile();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/update-avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка загрузки');
      }
      const { avatarUrl } = await response.json();
      setAvatar(avatarUrl);
      alert('Аватар успешно обновлён!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message || 'Не удалось обновить аватар');
    }
  };

  return (
    <div className="profile-page">
      <div
        className="profile-background"
        style={{ backgroundImage: `url(${avatar || defaultBackground})` }}
      ></div>
      <h1 className="profile-title">Личный кабинет</h1>
      <div className="profile-content">
        <div className="profile-main-section">
          <div className="avatar-section">
            <label className="avatar-upload">
              <input
                type="file"
                className="upload-input"
                onChange={handleFileUpload}
                accept="image/*"
              />
              <div className="avatar-wrapper">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Аватар"
                    className="profile-avatar"
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      border: '3px solid #38bdf8',
                      boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)'
                    }}
                  />
                ) : (
                  <div className="default-avatar">
                    <UserIcon
                      style={{
                        width: '150px',
                        height: '150px',
                        padding: '15px',
                        fill: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                )}
                <div className="avatar-overlay">
                  <span className="upload-text">Изменить фото</span>
                </div>
              </div>
            </label>
            <button className="edit-button">
              <Link to="#" className="edit-link">
                Редактировать профиль
              </Link>
            </button>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Имя:</label>
              <p>{userData.username || 'Не указано'}</p>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <p>{userData.email || 'Не указан'}</p>
            </div>
          </div>
        </div>
        
        <div className="support-section">
          <h3>Нужна помощь? Хотите опубликовать музыку?</h3>
          <div className="support-content">
            <div className="support-info">
              <h4>Служба поддержки 24/7</h4>
              <div className="support-contacts">
                <a href="tel:+78211264308">+7 821 126 4308</a>
                <a href="mailto:knnzl88@gmail.com">knnzl88@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;