import React from 'react';
import PropTypes from 'prop-types';
import css from './Profile.module.css';
import { defaultImg } from '../services/defaultImage';

const Profile = ({ userProfile, handleLogout }) => {
  return (
    <div className={css.profileContainer}>
      <div className={css.header}>
        <div className={css.logo}>Mint Switch</div>
        <div className={css.profileIcon}><img src={defaultImg} alt="Profile Icon" /></div>
      </div>
      <div className={css.mainContent}>
        <div className={css.profileInfo}>
          <div className={css.profileDetailsContainer}>
            <div>
              <p className={css.email}>{userProfile.email}</p>
              <p className={css.exchangeInfo}>Всего обменов 0 на сумму $0</p>
            </div>
          </div>
        </div>
        <div className={css.transactionHistory}>
          <h2>История операций</h2>
          <div className={css.noTransactions}>
            <img src="path-to-sad-bear-image.png" alt="Sad Bear" />
            <p>У вас нет заявок</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userProfile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    successfulExchanges: PropTypes.number,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Profile;
