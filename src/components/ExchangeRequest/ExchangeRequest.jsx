

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { coinNetworks, MinMax } from "../../array/coinsArray";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { EXINSTRUCTION, ROAD_ROUTE } from "../routes/routes";
import { selectAmount, selectEmail, selectMaxAmount, selectMinAmount, selectSelectedFromCoin, selectSelectedToCoin, selectUserWallet } from "../../redux/state/exchangeReducer/exchangeSelectors";
import { setAmount, setAmountResult, setEmail, setFromCoin, setMaxAmount, setMinAmount, setToCoin, setUserWallet } from "../../redux/state/exchangeReducer/exchangeReducer";



const ExchangeRequest = () => {
  const amount = useSelector(selectAmount)
  const minAmount = useSelector(selectMinAmount)
  const maxAmount = useSelector(selectMaxAmount)
  const selectedFromCoin = useSelector(selectSelectedFromCoin)
  const selectedToCoin = useSelector(selectSelectedToCoin)
  const userWallet = useSelector(selectUserWallet)
  const email = useSelector(selectEmail)
  const [selectedFromNetwork, setSelectedFromNetwork] = useState("");
  const [selectedToNetwork, setSelectedToNetwork] = useState("");
  


  const [isAMLChecked, setIsAMLChecked] = useState(false); // Состояние для проверки галочки AML


  const defaultCoins = useSelector(changeCoins);
  const [coinOptions, setCoinOptions] = useState([]);

  const dispatch = useDispatch();


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
      dispatch(setFromCoin(defaultCoins[0]));
      dispatch(setToCoin(defaultCoins[1]));
    }
  }, [defaultCoins,coinOptions,dispatch]);

  useEffect(() => {
    // Загружаем выбранные монеты из localStorage при монтировании компонента
    const storedValues = JSON.parse(localStorage.getItem("selectedCoins"));
    if (storedValues) {
      dispatch(setFromCoin(storedValues[0] || null));
      dispatch(setToCoin(storedValues[1] || null));
    }
  }, [dispatch]);

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
          dispatch(setMinAmount(parseFloat(fromCoinLimits.min)));
          
          dispatch(setMaxAmount( parseFloat(fromCoinLimits.max)));
        } else {
          dispatch(setMinAmount(0));
          dispatch(setMaxAmount(0));
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
  }, [selectedFromCoin, selectedToCoin, dispatch]);

  
  useEffect(() => {
    const values = {
      amount,
      userWallet,
      email, // Добавляем email в сохранение данных формы
    };
    localStorage.setItem("exchangeForm", JSON.stringify(values));
  }, [amount, userWallet, email]);



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
      const result = ((amount * fromCoinPrice) / toCoinPrice).toFixed(4)
      dispatch(setAmountResult(result))
      return result 
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


  // Обработчик изменения количества
  const handleAmountChange = (event) => {
    dispatch(setAmount(event.target.value));
   
  };

  // Обработчик изменения кошелька пользователя
  const handleWalletChange = (event) => {
    dispatch(setUserWallet(event.target.value));
  };

  // Обработчик изменения email
  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
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
      {/* {loading && <Loader />} */}
      <Card
        className="exchange-card"
        sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent>
        
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
                        // disabled={isNetworkSelectionDisabled} // Замораживаем выбор сетей
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
                        // disabled={isNetworkSelectionDisabled} // Замораживаем выбор сетей
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

        
          <form >
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Количество"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={`Введите количество от ${minAmount} до ${maxAmount}`}
                  helperText={`Введите количество в ${selectedFromCoin?.name} от ${minAmount} до ${maxAmount}`}
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
  {isAMLChecked ? (
    <Link to={EXINSTRUCTION}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Создать заявку
      </Button>
    </Link>
  ) : (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled
    >
      Создать заявку
    </Button>
  )}
</Box>

            </form>
        </CardContent>
      </Card>
      <div className="notify-wrap">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ExchangeRequest;