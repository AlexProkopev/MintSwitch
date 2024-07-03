import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import './ExchangeInstruction.css';

const ExchangeInstruction = ({ amount, fromCoin, toCoin, userWallet, calculateAmountReceived, getWalletAddress, remainingTime, email, onCancelRequest }) => {
  const [isPaid, setIsPaid] = useState(false);

  const handlePaid = () => {
    setIsPaid(true);
  };

  return (
    <Box className="exchange-instruction-container">
      <Typography variant="h6" gutterBottom>
        Инструкция по переводу
      </Typography>
      <Typography variant="h6" gutterBottom>
        Пожалуйста! Не обновляйте страницу, следуйте инструкции ниже.
      </Typography>
      <Typography variant="body1" paragraph>
        Переведите <strong>{amount}</strong> {fromCoin?.symbol.toUpperCase()} на следующий кошелек:
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>{getWalletAddress(fromCoin?.name)}</strong>
      </Typography>
      <Typography variant="body1" paragraph>
        Ваш кошелек: <strong>{userWallet}</strong>
      </Typography>
      <Typography variant="body1" paragraph>
        Как только мы получим ваш перевод, мы обработаем вашу заявку в автоматическом режиме.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Оставшееся время для заявки: {Math.floor(remainingTime / 60)} минут {remainingTime % 60} секунд
      </Typography>
      <Typography variant="body2" color="textSecondary" mt={2}>
        Email для получения результата обмена: <strong>{email}</strong>
      </Typography>
      <Box className="button-container">
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancelRequest}
          className="cancel-button"
          disabled={isPaid} // Дизактивируем кнопку при оплате
        >
          Отменить заявку
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaid}
          disabled={isPaid}
          className="paid-button"
        >
          {isPaid ? 'Спасибо за оплату, ожидайте перевод' : 'Оплатил заявку'}
        </Button>
      </Box>
    </Box>
  );
};

export default ExchangeInstruction;
