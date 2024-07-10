import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './Captcha.css'; // Импортируем файл с CSS-стилями

const Captcha = ({ onCaptchaChange }) => {
  const handleCaptchaChange = (token) => {
    if (token) {
      onCaptchaChange(true, token);
    } else {
      onCaptchaChange(false, null);
    }
  };

  return (
    <div className="captcha-container">
      <HCaptcha
        sitekey="32a403ee-7318-47ca-80fe-2baedb222d06" // Ваш site key
        onVerify={handleCaptchaChange}
      />
    </div>
  );
};

export default Captcha;
