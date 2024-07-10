import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Tooltip, CircularProgress } from '@mui/material';
import './ExchangeInstruction.css';


const ExchangeInstruction = ({ 
  amount, 
  fromCoin, 
  toCoin, 
  userWallet, 
  calculateAmountReceived, 
  getWalletAddress, 
  remainingTime, 
  email, 
  onCancelRequest 
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [status, setStatus] = useState('Принята, ожидает оплаты клиентом');

  const [statusChangedAt, setStatusChangedAt] = useState(null); // Время изменения статуса заявки
  const [loading, setLoading] = useState(false); // Состояние для загрузчика

  // Установка времени создания заявки при монтировании компонента


  // Имитация загрузки с лоадером каждые 30 секунд
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Можно добавить дополнительные действия здесь, если нужно
      }, 2000);
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []);

  const handlePaid = () => {
    setIsPaid(true);
    setStatus('Пару секунд...');
    setStatusChangedAt(new Date()); // Устанавливаем время изменения статуса

    setTimeout(() => {
      setStatus('Получено подтверждение об оплате от клиента');
    }, 2000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
       alert('Адрес скопирован в буфер обмена');
      },
      (err) => {
        alert('Ошибка при копировании адреса: ' + err);
      }
    );
  };

  return (
    <Box className="exchange-instruction-container">
      <Typography variant="h6" gutterBottom>
        Инструкция по переводу
      </Typography>
      <Typography variant="h6" gutterBottom>
        Пожалуйста! Не обновляйте страницу, следуйте инструкции ниже.
      </Typography>
      
      <Box className="table">
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1">
              Переведите <strong>{amount}</strong> {fromCoin?.symbol.toUpperCase()} на следующий кошелек:
            </Typography>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Tooltip title="Скопировать адрес" arrow>
              <Typography 
                variant="body1" 
                onClick={() => handleCopy(getWalletAddress(fromCoin?.name))}
                sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}
              >
                <strong>{getWalletAddress(fromCoin?.name)}</strong>
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1">Ваш кошелек: <strong>{userWallet}</strong></Typography>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1">Как только мы получим ваш перевод, мы обработаем вашу заявку в автоматическом режиме.</Typography>
          </Box>
        </Box>
       
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body2" color="textSecondary">
              Email для получения результата обмена: <strong>{email}</strong>
            </Typography>
          </Box>
        </Box>
       
        {statusChangedAt && (
          <Box className="table-row">
            <Box className="table-cell">
              <Typography 
                variant="body2" 
                color="textSecondary"
              >
                Время изменения статуса: <strong>{statusChangedAt.toLocaleString()}</strong>
              </Typography>
            </Box>
          </Box>
        )}

        <Box className="table-row">
          <Box className="table-cell">
            <Typography 
              variant="body2" 
              className={`status ${status === 'Получено подтверждение об оплате от клиента' ? 'status-paid' : status === 'Пару секунд...' ? 'status-processing' : 'status-pending'}`}
            >
              Статус заявки: <strong>{status}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

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

      {loading  && (
        <Box className="loader-wrapper">
          <CircularProgress />
          <Typography variant="body2" color="textSecondary">
            Обновляем статус заявки...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ExchangeInstruction;
