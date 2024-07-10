import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Chip,
} from "@mui/material";
import { changeCoins } from "../../redux/state/coinRequestState/coinRequestState.selectors";
import { coinNetworks, MinMax, wallet } from "../../array/coinsArray";
import ExchangeInstruction from "../ExchangeInstruction/ExchangeInstruction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ROAD_ROUTE } from "../routes/routes";
import Loader from "../Loader/Loader";

const ExchangeRequest = () => {
  const [amount, setAmount] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [selectedFromCoin, setSelectedFromCoin] = useState(null);
  const [selectedToCoin, setSelectedToCoin] = useState(null);
  const [selectedFromNetwork, setSelectedFromNetwork] = useState("");
  const [selectedToNetwork, setSelectedToNetwork] = useState("");
  const [showInstruction, setShowInstruction] = useState(false); // Состояние для показа инструкции
  const [userWallet, setUserWallet] = useState(""); // Поле для ввода кошелька пользователя
  const [email, setEmail] = useState(""); // Поле для ввода email
  const [remainingTime, setRemainingTime] = useState(0); // Оставшееся время для заявки
  const [isAMLChecked, setIsAMLChecked] = useState(false); // Состояние для проверки галочки AML
  const [isNetworkSelectionDisabled, setIsNetworkSelectionDisabled] = useState(false); // Состояние для блокировки выбора сетей
  const [loading, setLoading] = useState(false);

  const defaultCoins = useSelector(changeCoins);
  const [coinOptions, setCoinOptions] = useState([]);
  console.log("coinOptions: ", coinOptions);

  useEffect(() => {
    if (defaultCoins && defaultCoins.length > 0) {
      setCoinOptions(
        defaultCoins.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          image: coin.image,
          currentPrice: coin.current_price, // Используем текущую цену для расчета ставки обмена
        }))
      );

      // Выбираем первые две монеты для обмена по умолчанию
      setSelectedFromCoin(defaultCoins[0]);
      setSelectedToCoin(defaultCoins[1]);
    }
  }, [defaultCoins]);

  useEffect(() => {
    // Загружаем выбранные монеты из localStorage при монтировании компонента
    const storedValues = JSON.parse(localStorage.getItem("selectedCoins"));
    if (storedValues) {
      setSelectedFromCoin(storedValues[0] || null);
      setSelectedToCoin(storedValues[1] || null);
    }
  }, []);

  useEffect(() => {
    const fetchLimits = () => {
      // Найти минимальные и максимальные значения для выбранной пары монет
      const findLimits = () => {
        const fromCoinName = selectedFromCoin?.name;
        const toCoinName = selectedToCoin?.name;

        const fromCoinLimits = MinMax.find(
          (item) => item.name === fromCoinName
        );
        const toCoinLimits = MinMax.find((item) => item.name === toCoinName);

        if (fromCoinLimits && toCoinLimits) {
          // Установить минимальное и максимальное количество
          setMinAmount(parseFloat(fromCoinLimits.min));
          setMaxAmount(parseFloat(fromCoinLimits.max)); // Исправлено здесь
        } else {
          setMinAmount(0);
          setMaxAmount(0);
        }
      };

      if (selectedFromCoin && selectedToCoin) {
        findLimits();
      }
    };

    fetchLimits();

    // Обновляем лимиты при смене монет
    const interval = setInterval(fetchLimits, 1800000); // 1800000ms = 30 минут
    return () => clearInterval(interval);
  }, [selectedFromCoin, selectedToCoin]);

  
  useEffect(() => {
    const values = {
      amount,
      userWallet,
      email, // Добавляем email в сохранение данных формы
    };
    localStorage.setItem("exchangeForm", JSON.stringify(values));
  }, [amount, userWallet, email]);

  useEffect(() => {
    if (selectedFromCoin && selectedToCoin) {
      localStorage.setItem(
        "selectedCoins",
        JSON.stringify([selectedFromCoin, selectedToCoin])
      );
    }
  }, [selectedFromCoin, selectedToCoin]);

  useEffect(() => {
    // Обновляем список доступных сетей и устанавливаем сеть по умолчанию
    const updateNetworks = () => {
      if (selectedFromCoin) {
        const fromNetworks = getSupportedNetworks(selectedFromCoin.symbol);
        if (fromNetworks.length > 0) {
          setSelectedFromNetwork(fromNetworks[0]); // Выбираем первую сеть по умолчанию, если она одна
        }
      }
    };

    updateNetworks();
  }, [selectedFromCoin]);

  useEffect(() => {
    // Обновляем список доступных сетей и устанавливаем сеть по умолчанию
    const updateNetworks = () => {
      if (selectedToCoin) {
        const toNetworks = getSupportedNetworks(selectedToCoin.symbol);
        if (toNetworks.length > 0) {
          setSelectedToNetwork(toNetworks[0]); // Выбираем первую сеть по умолчанию, если она одна
        }
      }
    };

    updateNetworks();
  }, [selectedToCoin]);

  // Функция для получения поддерживаемых сетей для монеты
  const getSupportedNetworks = (symbol) => {
    const coin = coinNetworks?.find(
      (c) => c.symbol.toLowerCase() === symbol.toLowerCase()
    );
    return coin ? coin.supportedNetworks : [];
  };

  // Вычисление обменного курса и количества монет, которые пользователь получит
  const calculateAmountReceived = (amount, fromCoin, toCoin) => {
    if (!amount || !fromCoin || !toCoin) return 0;
    const fromCoinPrice = fromCoin.current_price;
    const toCoinPrice = toCoin.current_price;

    if (fromCoinPrice && toCoinPrice) {
      return ((amount * fromCoinPrice) / toCoinPrice).toFixed(4); // Преобразование числа в строку с 4 знаками после запятой
    }
    return 0;
  };

  // Вычисление курса обмена
  const calculateExchangeRate = () => {
    if (selectedFromCoin && selectedToCoin) {
      const fromCoinPrice = selectedFromCoin.current_price;
      const toCoinPrice = selectedToCoin.current_price;
      return (fromCoinPrice / toCoinPrice).toFixed(4); // Курс обмена с 4 знаками после запятой
    }
    return 0;
  };

  // Получение кошелька для выбранной монеты по названию
  const getWalletAddress = (coinName) => {
    const coin = wallet.find((c) => c.name === coinName);
    return coin ? coin.wallet : "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount >= minAmount && amount <= maxAmount && userWallet && email) {
      if (isAMLChecked) {
        setLoading(true)
        setTimeout(()=>{
          setShowInstruction(true); // Показываем инструкцию по переводу
        setIsNetworkSelectionDisabled(true); // Замораживаем выбор сетей
setLoading(false)
        },2000)
        toast.success(
          "Ваша заявка на обмен была успешно создана. Пожалуйста, следуйте инструкции для завершения обмена."
        );
      } else {
        setLoading(false);
        toast.error(
          "Пожалуйста, подтвердите условия AML перед созданием заявки."
        );
      }
    } else {
      setLoading(false);
      toast.error(
        `Пожалуйста, введите корректное количество от ${minAmount} до ${maxAmount}.`
      );
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

  // Обработчик выбора сети из
  const handleFromNetworkChange = (network) => {
    setSelectedFromNetwork(network);
  };

  // Обработчик выбора сети в
  const handleToNetworkChange = (network) => {
    setSelectedToNetwork(network);
  };

  const handleCancelRequest = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавная прокрутка
    });
    setShowInstruction(false); // Возвращаемся к форме обмена
    setAmount(""); // Очищаем количество
    setUserWallet(""); // Очищаем кошелек
    setEmail(""); // Очищаем email
    setRemainingTime(30 * 60); // Сброс времени до 30 минут
    setIsAMLChecked(false); // Сбрасываем состояние чекбокса AML
    setIsNetworkSelectionDisabled(false); // Разблокируем выбор сетей
    toast.info("Ваша заявка была отменена и вы вернулись к форме обмена.");
  };
//функция которая сохраняет номер заявки в локал сторедж на пол часа и если он там есть тогда показывает номер заявки тот что в локале


  //функция которая проверяет есть ли в локал сторедж номер заявки и если есть то показывает его 
  const createNubmer = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000);
   
    return randomNumber.toString().padStart(9, "0");
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}
    >
      {loading && <Loader />}
      <Card
        className="exchange-card"
        sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Запрос на обмен
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            Заявка номер: {createNubmer()}
          </Typography>

          <div
            className="aml-background"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="body1" paragraph>
              ВНИМАНИЕ! В целях противодействия легализации (отмыванию) доходов,
              полученных преступным путем и финансированию терроризма обменный
              пункт проведет{" "}
              <span>
                <Link
                  to={ROAD_ROUTE}
                  style={{ color: "#1e90ff", textDecoration: "underline" }}
                >
                  AML-проверку
                </Link>
              </span>{" "}
              Вашей транзакции. В случае, если Ваша транзакция будет
              идентифицирована, как высокорискованная обменный пункт может
              приостановить обменную операцию до проведения проверки.
            </Typography>
          </div>

          <FormControl fullWidth margin="normal">
            <Typography variant="h6">Из валюты:</Typography>
            {selectedFromCoin ? (
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={selectedFromCoin.image}
                    alt={selectedFromCoin.name}
                    style={{ width: 30, height: 30, marginRight: 8 }}
                  />
                  {selectedFromCoin.name} (
                  {selectedFromCoin.symbol.toUpperCase()})
                </div>
                <Typography variant="body2" color="textSecondary">
                  Поддерживаемые сети:
                </Typography>
                <div style={{ margin: "10px 0" }}>
                  {getSupportedNetworks(selectedFromCoin.symbol).map(
                    (network) => (
                      <Chip
                        key={network}
                        label={network}
                        onClick={() => handleFromNetworkChange(network)}
                        color={
                          selectedFromNetwork === network
                            ? "primary"
                            : "default"
                        }
                        style={{ margin: "2px", cursor: "pointer" }}
                        disabled={isNetworkSelectionDisabled} // Замораживаем выбор сетей
                      />
                    )
                  )}
                </div>
                <FormHelperText>
                  Выбранная сеть: {selectedFromNetwork}
                </FormHelperText>
              </div>
            ) : null}
          </FormControl>

          <Typography variant="h6" align="center" gutterBottom>
            Курс обмена: 1 {selectedFromCoin?.symbol.toUpperCase()} ={" "}
            {calculateExchangeRate()} {selectedToCoin?.symbol.toUpperCase()}
          </Typography>

          <FormControl fullWidth margin="normal">
            <Typography variant="h6">В валюту:</Typography>
            {selectedToCoin ? (
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={selectedToCoin.image}
                    alt={selectedToCoin.name}
                    style={{ width: 30, height: 30, marginRight: 8 }}
                  />
                  {selectedToCoin.name} ({selectedToCoin.symbol.toUpperCase()})
                </div>
                <Typography variant="body2" color="textSecondary">
                  Поддерживаемые сети:
                </Typography>
                <div style={{ margin: "10px 0" }}>
                  {getSupportedNetworks(selectedToCoin.symbol).map(
                    (network) => (
                      <Chip
                        key={network}
                        label={network}
                        onClick={() => handleToNetworkChange(network)}
                        color={
                          selectedToNetwork === network ? "primary" : "default"
                        }
                        style={{ margin: "2px", cursor: "pointer" }}
                        disabled={isNetworkSelectionDisabled} // Замораживаем выбор сетей
                      />
                    )
                  )}
                </div>
                <FormHelperText>
                  Выбранная сеть:
                  <span className="selected-network">{selectedToNetwork}</span>{" "}
                </FormHelperText>
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
              email={email} // Добавляем email в компонент
              onCancelRequest={handleCancelRequest} // Передаем обработчик отмены заявки
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Количество"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={`Введите количество от ${minAmount} до ${maxAmount}`}
                  helperText={`Введите количество от ${minAmount} до ${maxAmount}`}
                  error={amount < minAmount || amount > maxAmount}
                />
                {amount && selectedFromCoin && selectedToCoin && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Получите:{" "}
                    {calculateAmountReceived(
                      amount,
                      selectedFromCoin,
                      selectedToCoin
                    )}{" "}
                    {selectedToCoin.symbol.toUpperCase()}
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
                    Я прочитал и согласен с{" "}
                    <Link
                      to={ROAD_ROUTE}
                      style={{ color: "#1e90ff", textDecoration: "underline" }}
                    >
                      AML-политикой
                    </Link>
                  </Typography>
                }
                style={{ marginBottom: "10px" }}
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isAMLChecked} // Делаем кнопку активной только если AML-чекбокс отмечен
                >
                  Создать заявку
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="notify-wrap">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ExchangeRequest;
