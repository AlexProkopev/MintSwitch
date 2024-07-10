import React from 'react';
import css from './Profile.module.css';
import { defaultImg } from '../services/defaultImage';

const Profile = ({ userProfile, handleLogout }) => {
  return (
    <div className={css.profileContainer}>
      <div className={css.header}>
        <div className={css.logo}>{userProfile.name}</div>
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
           
          
            <button onClick={handleLogout} className={css.logoutButton}>Выйти</button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Profile;
