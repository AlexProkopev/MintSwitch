import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Captcha from '../../components/Captcha/Captcha';  // Импортируем новый компонент

import css from './Login.module.css';
import { selectIsLoading } from '../../redux/state/autentification/authentification.selectors';
import Loader from '../../components/Loader/Loader';
import { fetchUser } from '../../redux/state/autentification/services';
import { CABINET_ROUTE, REGISTER_ROUTE } from '../../components/routes/routes';
import { Notify } from 'notiflix';

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
  const navigate = useNavigate();  // Хук для навигации
  const isLoading = useSelector(selectIsLoading);

  const [captchaAnswer, setCaptchaAnswer] = useState(null);  // Хранение правильного ответа капчи

  const handleCaptchaChange = (answer) => {
    setCaptchaAnswer(answer);  // Сохраняем правильный ответ капчи
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (!captchaAnswer) {
      Notify.failure('Пожалуйста, пройдите проверку капчи');
      setSubmitting(false);
      return;
    }

    dispatch(fetchUser({ ...values, captchaToken: captchaAnswer }))  // Передаем ответ капчи на сервер
      .unwrap()
      .then(() => {
        setSubmitting(false);
        Notify.success('Вы успешно авторизовались');
        navigate(CABINET_ROUTE);  // Перенаправление на страницу кабинета
      })
      .catch(() => {
        setSubmitting(false);
        Notify.failure('Неверный email или пароль');
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
              <Captcha onCaptchaChange={handleCaptchaChange} />  {/* Добавляем компонент капчи */}
              
            </Form>
          )}
        </Formik>
        <p className={css.profileText}>
          Нет аккаунта? <Link to={REGISTER_ROUTE}>Зарегистрируйтесь</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
