import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Tooltip, CircularProgress } from '@mui/material';
import './ExchangeInstruction.css';
import { wallet } from '../../array/coinsArray';
import { toast } from 'react-toastify';
import { resetState, setAmount, setEmail, setFromCoin, setUserWallet } from '../../redux/state/exchangeReducer/exchangeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAmount, selectEmail, selectSelectedFromCoin, selectUserWallet } from '../../redux/state/exchangeReducer/exchangeSelectors';

const ExchangeInstruction = () => {
  const amount = useSelector(selectAmount);
  const fromCoin = useSelector(selectSelectedFromCoin);
  const userWallet = useSelector(selectUserWallet);
  const email = useSelector(selectEmail);

  const [isPaid, setIsPaid] = useState(false);
  const [status, setStatus] = useState('Принята, ожидает оплаты клиентом');
  const [statusChangedAt, setStatusChangedAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secondsToUpdate, setSecondsToUpdate] = useState(30);
  const [confirmationTimeout, setConfirmationTimeout] = useState(null);
  const [paymentStartTime, setPaymentStartTime] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Загрузка данных из `localStorage` при монтировании
  useEffect(() => {
    const exchangeForm = JSON.parse(localStorage.getItem('exchangeForm'));
    const selectedCoins = JSON.parse(localStorage.getItem('selectedCoins'));

    if (exchangeForm) {
      dispatch(setAmount(exchangeForm.amount));
      dispatch(setUserWallet(exchangeForm.userWallet));
      dispatch(setEmail(exchangeForm.email));
    }

    if (selectedCoins) {
      const fromCoin = selectedCoins[0]; // Можно выбрать конкретную монету динамически
      dispatch(setFromCoin(fromCoin));
    }


  }, [dispatch]);

  useEffect(() => {
    if (secondsToUpdate > 0) {
      const countdownTimer = setTimeout(() => {
        setSecondsToUpdate((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(countdownTimer);
    }
  }, [secondsToUpdate]);

  useEffect(() => {
    if (isPaid && paymentStartTime) {
      const elapsedTime = Date.now() - paymentStartTime;
      if (elapsedTime >= 10 * 60 * 1000) {
        setStatus('Платеж подтвержден, ожидайте');
      } else {
        const timeoutId = setTimeout(() => {
          setStatus('Платеж подтвержден, ожидайте');
        }, 10 * 60 * 1000 - elapsedTime);
        setConfirmationTimeout(timeoutId);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [isPaid, paymentStartTime]);

  const handlePaid = () => {
    
    setIsPaid(true);
    localStorage.setItem("isPaid", JSON.stringify(true));
    setStatus('Пару секунд...');
    setStatusChangedAt(new Date());
    setPaymentStartTime(Date.now());

    setTimeout(() => {
      setStatus('Получено подтверждение об оплате от клиента');
    }, 2000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert('Адрес скопирован в буфер обмена'),
      (err) => alert('Ошибка при копировании адреса: ' + err)
    );
  };

  const getWalletAddress = (coinName) => {
    const coin = wallet.find((c) => c.name === coinName);
    return coin ? coin.wallet : '';
  };

  const handleCancelRequest = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(resetState());
    navigate('/');
    toast.info('Ваша заявка была отменена');
  };

  return (
    <Box
      className="exchange-instruction-container"
      sx={{
        backgroundColor: 'background.paper',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.8s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Инструкция по переводу
      </Typography>
      <Typography variant="h6" gutterBottom className="titleInstr">
        Cледуйте инструкции ниже.
      </Typography>

      <Box className="table">
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1" className="titleInstr">
              Переведите <strong>{amount}</strong> {fromCoin?.name} на следующий кошелек:
            </Typography>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Tooltip title="Скопировать адрес" arrow>
              <Typography
              
                variant="body1"
                onClick={() => handleCopy(getWalletAddress(fromCoin?.name))}
                sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <strong >{getWalletAddress(fromCoin?.name)}</strong>
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1"
            className="titleInstr">
              Ваш кошелек: <strong>{userWallet}</strong>
            </Typography>
          </Box>
        </Box>
        <Box className="table-row">
          <Box className="table-cell">
            <Typography variant="body1" className="titleInstr">
              Как только мы получим ваш перевод, мы обработаем вашу заявку в автоматическом режиме.
            </Typography>
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
              <Typography variant="body2" color="textSecondary">
                Время изменения статуса: <strong>{statusChangedAt.toLocaleString()}</strong>
              </Typography>
            </Box>
          </Box>
        )}

        <Box className="table-row">
          <Box className="table-cell">
            <Typography
              variant="body2"
              className={`status ${
                status === 'Платеж подтвержден, ожидайте'
                  ? 'status-confirmed'
                  : status === 'Получено подтверждение об оплате от клиента'
                  ? 'status-paid'
                  : status === 'Пару секунд...'
                  ? 'status-processing'
                  : 'status-pending'
              }`}
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
          onClick={handleCancelRequest}
          className="cancel-button"
          disabled={isPaid}
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

      {loading && (
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
