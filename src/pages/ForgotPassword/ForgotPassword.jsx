import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Notify } from 'notiflix';
import css from './ForgotPassword.module.css';
import BackButton from '../../components/BackButton/BackButton';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Email обязателен'),
});

const ForgotPassword = () => {


  const handleSubmit = () => {
   
       setTimeout(() => { Notify.failure('Что то пошло не так, повторите позже');},1000)
      
      
  };

  return (
    
         
         <div className={css.container}>
         <BackButton/>
      <h2 className={css.titleForgotPassword}>Восстановление пароля</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.formForgotPassword}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={css.inputForgotPassword}
            />
            <button 
              type="submit" 
              className={css.btnForgotPassword}
              disabled={isSubmitting}
            >
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
   
    
  );
};

export default ForgotPassword;
