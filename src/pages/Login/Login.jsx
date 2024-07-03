import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import css from './Login.module.css';
import { selectIsLoading } from '../../redux/state/autentification/authentification.selectors';
import Loader from '../../components/Loader/Loader';
import { fetchUser } from '../../redux/state/autentification/services';

// Валидация формы с помощью Yup
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
  const navigate = useNavigate(); // Хук для навигации
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { setSubmitting }) => {
    // Отправка данных и обработка успешного логина
    dispatch(fetchUser(values))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        navigate('/exchange'); // Перенаправление на страницу обмена
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
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
              <button
                type="submit"
                className={css.btnLogIN}
                disabled={isSubmitting}
              >
                Войти
              </button>
            </Form>
          )}
        </Formik>
        <p className={css.profileText}>Профиль</p>
      </div>
    </>
  );
};

export default Login;
