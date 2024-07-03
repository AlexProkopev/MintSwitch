import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './Registration.module.css';
import { registrationUser } from '../../redux/state/autentification/services';
import { selectIsLoading } from '../../redux/state/autentification/authentification.selectors';
import Loader from '../../components/Loader/Loader';

// Схема валидации с использованием Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не может превышать 50 символов')
    .required('Имя обязательно для заполнения'),
  email: Yup.string()
    .email('Некорректный email')
    .required('Email обязателен для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен для заполнения'),
});

const Registration = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  // Обработчик отправки формы
  const handleSubmit = (values) => {
    dispatch(registrationUser(values));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
        <h2 className={css.titleRegist}>Registration</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={css.formContainer}>
              <div className={css.formGroup}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={css.inputField}
                />
                <ErrorMessage name="name" component="div" className={css.error} />
              </div>
              <div className={css.formGroup}>
                <Field
                  type="text"
                  name="email"
                  placeholder="Username"
                  className={css.inputField}
                />
                <ErrorMessage name="email" component="div" className={css.error} />
              </div>
              <div className={css.formGroup}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={css.inputField}
                />
                <ErrorMessage name="password" component="div" className={css.error} />
              </div>
              <button type="submit" className={css.submitButton}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Registration;
