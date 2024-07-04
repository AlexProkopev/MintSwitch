import React, { useState, useEffect } from 'react';
import css from './Captcha.module.css';

const Captcha = ({ onCaptchaChange }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);

 

  

  useEffect(() => {
    const generateCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-'];
        const op = operators[Math.floor(Math.random() * operators.length)];
    
        setNum1(a);
        setNum2(b);
        setOperator(op);
    
        let answer;
        if (op === '+') {
          answer = a + b;
        } else {
          answer = a - b;
        }
    
        setCorrectAnswer(answer);
        onCaptchaChange(answer);  // Передаем правильный ответ в родительский компонент
      };
      generateCaptcha()
  }, [onCaptchaChange]);

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const isAnswerCorrect = () => {
    return Number(userAnswer) === correctAnswer;
  };

  return (
    <div className={css.captchaContainer}>
      <div className={css.captcha}>
        <span className={css.number}>{num1}</span>
        <span className={css.operator}>{operator}</span>
        <span className={css.number}>{num2}</span>
        <span>=</span>
      </div>
      <input
        type="number"
        value={userAnswer}
        onChange={handleChange}
        placeholder="Введите ответ"
        className={css.inputCaptcha}
      />
      <button className={css.btnCaptcha} disabled={!isAnswerCorrect()}>
        Войти
      </button>
    </div>
  );
};

export default Captcha;
