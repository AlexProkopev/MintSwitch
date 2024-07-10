import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Captcha from '../../components/Captcha/Captcha';  // Import Captcha component

import css from './Login.module.css';
import { selectIsLoading } from '../../redux/state/autentification/authentification.selectors';
import Loader from '../../components/Loader/Loader';
import { fetchUser } from '../../redux/state/autentification/services';
import { CABINET_ROUTE, REGISTER_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../components/routes/routes'; // Add FORGOT_PASSWORD_ROUTE
import { Notify } from 'notiflix';

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);

  const handleCaptchaChange = (isCorrect, answer) => {
    setCaptchaAnswer(answer);
    setIsCaptchaCorrect(isCorrect);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    if (!isCaptchaCorrect) {
      setSubmitting(false);
      return;
    }

    dispatch(fetchUser({ ...values, captchaToken: captchaAnswer }))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        Notify.success('Вы успешно авторизовались');
        navigate(CABINET_ROUTE);
      })
      .catch(() => {
        setSubmitting(false);
        Notify.failure('Неверный email или пароль');
      });
  };

  return (
    <>
      
      <div className={css.container}>
      {isLoading && <Loader />}
        <h2 className={css.titleLogIn}>Вход в личный кабинет</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.formLogIn}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={css.inputLogIn}
              />
              <Field
                type="password"
                name="password"
                placeholder="Пароль"
                className={css.inputLogIn}
              />
              <Captcha onCaptchaChange={handleCaptchaChange} />  {/* Add Captcha component */}
              <button 
                type="submit" 
                className={css.btnLogIN}
                disabled={isSubmitting || !isCaptchaCorrect}  
              >
                Войти
              </button>
            </Form>
          )}
        </Formik>
        <p className={css.profileText}>
          Нет аккаунта? <Link to={REGISTER_ROUTE}>Зарегистрируйтесь</Link>
        </p>
        <p className={css.forgotPasswordText}>
          <Link to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
