import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, TextField, FormControl, Button, Box, Checkbox, FormControlLabel } from '@mui/material';
import { changeCoins } from '../../redux/state/coinRequestState/coinRequestState.selectors';
import { wallet } from '../../array/coinsArray';
import ExchangeInstruction from '../ExchangeInstruction/ExchangeInstruction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ROAD_ROUTE } from '../routes/routes';

const ExchangeRequest = () => {
  const [amount, setAmount] = useState('');
  const [minAmount, setMinAmount] = useState(128);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [selectedFromCoin, setSelectedFromCoin] = useState(null);
  const [selectedToCoin, setSelectedToCoin] = useState(null);
  const [showInstruction, setShowInstruction] = useState(false); // Состояние для показа инструкции
  const [userWallet, setUserWallet] = useState('');  // Поле для ввода кошелька пользователя
  const [email, setEmail] = useState('');  // Поле для ввода email
  const [remainingTime, setRemainingTime] = useState(0); // Оставшееся время для заявки
  const [isAMLChecked, setIsAMLChecked] = useState(false); // Состояние для проверки галочки AML

  const defaultCoins = useSelector(changeCoins);
  const [coinOptions, setCoinOptions] = useState([]);
  console.log('coinOptions: ', coinOptions);

  useEffect(() => {
    if (defaultCoins && defaultCoins.length > 0) {
      setCoinOptions(defaultCoins.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        image: coin.image,
        currentPrice: coin.current_price // Используем текущую цену для расчета ставки обмена
      })));

      // Выбираем первые две монеты для обмена по умолчанию
      setSelectedFromCoin(defaultCoins[0]);
      setSelectedToCoin(defaultCoins[1]);
    }
  }, [defaultCoins]);

  useEffect(() => {
    // Загружаем выбранные монеты из localStorage при монтировании компонента
    const storedValues = JSON.parse(localStorage.getItem('selectedCoins'));
    if (storedValues) {
      setSelectedFromCoin(storedValues[0] || null);
      setSelectedToCoin(storedValues[1] || null);
    }
  }, []);

  useEffect(() => {
    const fetchLimits = () => {
      // Генерация случайных значений минимума и максимума для обмена
      const generateLimits = () => {
        const min = Math.floor(Math.random() * (1000 - 128 + 1)) + 128; // Минимум от 128 до 1000
        const max = Math.floor(Math.random() * (150000 - 5000 + 1)) + 5000; // Максимум от 5000 до 150000
        return { min, max };
      };

      if (selectedFromCoin && selectedToCoin) {
        const pairKey = `${selectedFromCoin.id}_${selectedToCoin.id}`;
        const storedLimits = JSON.parse(localStorage.getItem(`exchangeLimits_${pairKey}`));
        const currentTime = new Date().getTime();

        if (storedLimits && storedLimits.timestamp + 30 * 60 * 1000 > currentTime) {
          // Если лимиты еще действительны, используем их
          setMinAmount(storedLimits.minAmount);
          setMaxAmount(storedLimits.maxAmount);
        } else {
          // Генерируем новые лимиты и сохраняем их в localStorage
          const { min, max } = generateLimits();
          setMinAmount(min);
          setMaxAmount(Math.min(max, 150000)); // Устанавливаем максимум до 150000

          localStorage.setItem(`exchangeLimits_${pairKey}`, JSON.stringify({
            minAmount: min,
            maxAmount: Math.min(max, 150000),
            timestamp: currentTime,
          }));
        }
      }
    };

    fetchLimits();

    const interval = setInterval(fetchLimits, 1800000); // 1800000ms = 30 минут
    return () => clearInterval(interval);
  }, [selectedFromCoin, selectedToCoin]);

  useEffect(() => {
    // Устанавливаем время жизни заявки
    setRemainingTime(30 * 60); // 30 минут

    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const values = {
      amount,
      userWallet,
      email, // Добавляем email в сохранение данных формы
    };
    localStorage.setItem('exchangeForm', JSON.stringify(values));
  }, [amount, userWallet, email]);

  useEffect(() => {
    if (selectedFromCoin && selectedToCoin) {
      localStorage.setItem('selectedCoins', JSON.stringify([selectedFromCoin, selectedToCoin]));
    }
  }, [selectedFromCoin, selectedToCoin]);

  // Вычисление обменного курса и количества монет, которые пользователь получит
  const calculateAmountReceived = (amount, fromCoin, toCoin) => {
    if (!amount || !fromCoin || !toCoin) return 0;
    const fromCoinPrice = fromCoin.current_price;
    const toCoinPrice = toCoin.current_price;

    if (fromCoinPrice && toCoinPrice) {
      return (amount * fromCoinPrice / toCoinPrice); // Преобразование числа в строку с 4 знаками после запятой
    }
    return 0;
  };

  // Вычисление курса обмена
  const calculateExchangeRate = () => {
    if (selectedFromCoin && selectedToCoin) {
      const fromCoinPrice = selectedFromCoin.current_price;
      const toCoinPrice = selectedToCoin.current_price;
      return (fromCoinPrice / toCoinPrice); // Курс обмена с 4 знаками после запятой
    }
    return 0;
  };

  // Получение кошелька для выбранной монеты по названию
  const getWalletAddress = (coinName) => {
    const coin = wallet.find(c => c.name === coinName);
    return coin ? coin.wallet : '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount >= minAmount && amount <= maxAmount && userWallet && email) {
      if (isAMLChecked) {
        setShowInstruction(true); // Показываем инструкцию по переводу
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Плавная прокрутка
        });
        toast.success('Ваша заявка на обмен была успешно создана. Пожалуйста, следуйте инструкции для завершения обмена.');
      } else {
        toast.error('Пожалуйста, подтвердите условия AML перед созданием заявки.');
      }
    } else {
      toast.error('Пожалуйста, введите корректные данные.');
    }
  };

  // Обработчик изменения количества
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Обработчик изменения кошелька пользователя
  const handleWalletChange = (event) => {
    setUserWallet(event.target.value);
  };

  // Обработчик изменения email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Обработчик изменения состояния чекбокса AML
  const handleAMLCheck = (event) => {
    setIsAMLChecked(event.target.checked);
  };

  const handleCancelRequest = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавная прокрутка
    });
    setShowInstruction(false); // Возвращаемся к форме обмена
    setAmount(''); // Очищаем количество
    setUserWallet(''); // Очищаем кошелек
    setEmail(''); // Очищаем email
    setRemainingTime(30 * 60); // Сброс времени до 30 минут
    setIsAMLChecked(false); // Сбрасываем состояние чекбокса AML
    toast.info('Ваша заявка была отменена и вы вернулись к форме обмена.');
  };

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Card className="exchange-card" sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Запрос на обмен
          </Typography>

          <div className="aml-background" style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            <Typography variant="body1" paragraph>
              ВНИМАНИЕ!
              В целях противодействия легализации (отмыванию) доходов, полученных преступным путем и финансированию терроризма обменный пункт проведет <span>
              <Link to={ROAD_ROUTE} style={{ color: '#1e90ff', textDecoration: 'underline' }}>AML-проверку</Link></span> Вашей транзакции.
              В случае, если Ваша транзакция будет идентифицирована, как высокорискованная обменный пункт может приостановить обменную операцию до проведения проверки.
            </Typography>
          </div>

          <FormControl fullWidth margin="normal">
            <Typography variant="h6">Из валюты:</Typography>
            {selectedFromCoin ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={selectedFromCoin.image} alt={selectedFromCoin.name} style={{ width: 30, height: 30, marginRight: 8 }} />
                  {selectedFromCoin.name} ({selectedFromCoin.symbol.toUpperCase()})
                </div>
                <p className='network'>Сеть: {selectedFromCoin.name.toUpperCase()}</p>
              </div>
            ) : null}
          </FormControl>

          <Typography variant="h6" align="center" gutterBottom>
            Курс обмена: 1 {selectedFromCoin?.symbol.toUpperCase()} = {calculateExchangeRate()} {selectedToCoin?.symbol.toUpperCase()}
          </Typography>

          <FormControl fullWidth margin="normal">
            <Typography variant="h6">В валюту:</Typography>
            {selectedToCoin ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={selectedToCoin.image} alt={selectedToCoin.name} style={{ width: 30, height: 30, marginRight: 8 }} />
                  {selectedToCoin.name} ({selectedToCoin.symbol.toUpperCase()})
                </div>
                <p className='network'>Сеть: {selectedToCoin.name.toUpperCase()}</p>
              </div>
            ) : null}
          </FormControl>

          {showInstruction ? (
            <ExchangeInstruction
              amount={amount}
              fromCoin={selectedFromCoin}
              toCoin={selectedToCoin}
              userWallet={userWallet}
              calculateAmountReceived={calculateAmountReceived}
              getWalletAddress={getWalletAddress}
              remainingTime={remainingTime}
              email={email}  // Добавляем email в компонент
              onCancelRequest={handleCancelRequest}  // Передаем обработчик отмены заявки
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Количество"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  InputProps={{ inputProps: { min: minAmount, max: maxAmount } }}
                  helperText={`Введите количество от ${minAmount} до ${maxAmount}`}
                  error={amount < minAmount || amount > maxAmount}
                />
                {amount && selectedFromCoin && selectedToCoin && (
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Получите: {calculateAmountReceived(amount, selectedFromCoin, selectedToCoin)} {selectedToCoin.symbol.toUpperCase()}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Ваш кошелек"
                  type="text"
                  value={userWallet}
                  onChange={handleWalletChange}
                  helperText="Введите ваш кошелек"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Ваш email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  helperText="Введите ваш email для получения результата обмена"
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAMLChecked}
                    onChange={handleAMLCheck}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    Я прочитал и согласен с <Link to={ROAD_ROUTE} style={{ color: '#1e90ff', textDecoration: 'underline' }}>AML-политикой</Link>
                  </Typography>
                }
                style={{ marginBottom: '10px' }}
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isAMLChecked}  // Делаем кнопку активной только если AML-чекбокс отмечен
                >
                  Создать заявку
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ExchangeRequest;
