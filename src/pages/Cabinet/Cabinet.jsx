import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import css from './Cabinet.module.css';
import { selectIsAutorization, selectUserData } from '../../redux/state/autentification/authentification.selectors';
import { logOutThunk } from '../../redux/state/autentification/services';
import Profile from '../../components/Profile/Profile';
import Transactions from '../../components/Profile/Transactions/Transactions';

const Cabinet = () => {
  const isAuthenticated = useSelector(selectIsAutorization);
  const userProfile = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutThunk());
    navigate('/auth');  // Перенаправление на страницу авторизации после выхода
  };

  return (
    <div className={css.container}>
      {isAuthenticated ? (
       <div>
        <Profile userProfile={userProfile} handleLogout={handleLogout}/>
        <Transactions transactions={[]}/> 
       </div>
      ) : (
        <div className={css.linksContainer}>
          <Link to="/auth" className={css.linkReg}>Авторизация</Link>
          <Link to="/registr" className={css.linkReg}>Регистрация</Link>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
