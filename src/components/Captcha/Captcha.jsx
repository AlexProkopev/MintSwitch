import React, { useState, useEffect } from 'react';
import css from './Captcha.module.css';

const Captcha = ({ onCaptchaChange }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

 

  useEffect(() => {
    onCaptchaChange(isAnswerCorrect);
  }, [isAnswerCorrect, onCaptchaChange]);

  

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
  
      const randomOptions = generateOptions(answer);
      setOptions(randomOptions);
      setSelectedAnswer(null);
      setIsAnswerCorrect(false);
    };
    generateCaptcha();
  }, []);

  const generateOptions = (correctAnswer) => {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
      options.add(Math.floor(Math.random() * 20) - 10); // Генерация случайных чисел от -10 до 20
    }

    return Array.from(options).sort(() => Math.random() - 0.5); // Перемешивание опций
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div className={css.captchaContainer}>
      <div className={css.captcha}>
        <span className={css.number}>{num1}</span>
        <span className={css.operator}>{operator}</span>
        <span className={css.number}>{num2}</span>
        <span>= ?</span>
      </div>
      <div className={css.optionsContainer}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`${css.optionButton} 
                        ${selectedAnswer === option ? (option === correctAnswer ? css.correct : css.incorrect) : ''}`}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Captcha;
