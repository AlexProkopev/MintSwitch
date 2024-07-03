import React from 'react';
import PropTypes from 'prop-types';
import css from './Profile.module.css';

const Profile = ({ userProfile, handleLogout }) => {
  return (
    <div className={css.profileContainer}>
      <h2 className={css.profileTitle}>Профиль пользователя</h2>
      <p className={css.profileDetails}>Имя: {userProfile.name}</p>
      <p className={css.profileDetails}>Email: {userProfile.email}</p>
      <p className={css.profileDetails}>Количество успешных обменов: {userProfile.successfulExchanges || 0}</p>
      <button className={css.btnLogout} onClick={handleLogout}>Выйти</button>
    </div>
  );
};

Profile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Profile;
