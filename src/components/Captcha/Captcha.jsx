import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onCaptchaChange }) => {
  const handleCaptchaChange = (value) => {
    if (value) {
      onCaptchaChange(true, value);
    } else {
      onCaptchaChange(false, null);
    }
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeCzwwqAAAAAGW2dB21c0RSeRq-maEdBavA74oN" // Ваш site key
        onChange={handleCaptchaChange}
      />
    </div>
  );
};

export default Captcha;
