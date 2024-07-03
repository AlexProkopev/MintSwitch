import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Change.css";
import { Link, useNavigate } from "react-router-dom";
import { REQUEST_ROUTE } from "../../components/routes/routes";
import ChangeIcon from "./ChangeIcon/ChangeIcon";
import { reserves } from "../../array/coinsArray";
import ReviewsList from "../../components/Reviews/Reviews";
import { toast, ToastContainer } from "react-toastify"; // Импортируем ToastContainer и toast
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили

function Change() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [priceToShow1, setPriceToShow1] = useState(null); // Для списка 1
  const [priceToShow2, setPriceToShow2] = useState(null); // Для списка 2
  const [exchangeRate, setExchangeRate] = useState(null); // Для хранения курса обмена
  const navigate = useNavigate();
  console.log("exchangeRate: ", exchangeRate);

  useEffect(() => {
    // Загружаем выбранные монеты из localStorage при монтировании компонента
    const storedValues = JSON.parse(localStorage.getItem("selectedCoins"));
    if (storedValues) {
      setSelectedCoin1(storedValues[0] || null);
      setSelectedCoin2(storedValues[1] || null);
    }

    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
      });
  }, []);

  useEffect(() => {
    // Сохраняем выбранные монеты в localStorage при их изменении
    localStorage.setItem(
      "selectedCoins",
      JSON.stringify([selectedCoin1, selectedCoin2])
    );
    if (selectedCoin1 && selectedCoin2) {
      fetchExchangeRate(selectedCoin1.id, selectedCoin2.id);
    }
  }, [selectedCoin1, selectedCoin2]);

  const handleCoinClick = (coin, listNumber) => {
    if (listNumber === 1) {
      if (selectedCoin2 && selectedCoin2.id === coin.id) {
        return; // Нельзя выбрать тот же коин в обоих списках
      } else {
        setSelectedCoin1(coin);
        setPriceToShow1(coin.id); // Показываем цену для выбранного коина в первом списке
        setPriceToShow2(null); // Скрываем цену во втором списке
      }
    } else if (listNumber === 2) {
      if (selectedCoin1 && selectedCoin1.id === coin.id) {
        return; // Нельзя выбрать тот же коин в обоих списках
      } else {
        setSelectedCoin2(coin);
        setPriceToShow2(coin.id); // Показываем цену для выбранного коина во втором списке
        setPriceToShow1(null); // Скрываем цену в первом списке
      }
    }
  };

  const fetchExchangeRate = (coinId1, coinId2) => {
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: `${coinId1},${coinId2}`,
          vs_currencies: "usd",
        },
      })
      .then((response) => {
        const rate1to2 =
          response.data[coinId2]?.usd / response.data[coinId1]?.usd;
        setExchangeRate(rate1to2 ? rate1to2.toFixed(2) : "N/A");
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate("Error");
      });
  };

  const getReserve = (name) => {
    const reserve = reserves.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
    return reserve ? reserve.reserve : "No Reserve";
  };

  // Обработчик создания заявки
  const handleCreateRequest = (event) => {
    event.preventDefault(); 
    toast.success(
      "Заявка создана! Пожалуйста, следуйте далее для завершения процесса обмена."
    );
   
    setTimeout(() => {
     navigate(REQUEST_ROUTE); 
    }, 1000); 
  };

  return (
    <div className="container">
      <div className="lists-container">
        <div>
          <p className="text-change">Отдаете</p>
          <ul className="listFirst">
            {coins.map((coin) => (
              <li key={coin.id} onClick={() => handleCoinClick(coin, 1)}>
                <button
                  type="button"
                  className={`coin-button ${
                    selectedCoin1?.id === coin.id ? "selected" : ""
                  }`}
                  disabled={selectedCoin2 && selectedCoin2.id === coin.id} // Деактивируем кнопку если коин уже выбран во втором списке
                >
                  <img
                    src={coin.image}
                    width="80px"
                    height="80px"
                    alt={coin.name}
                  />
                </button>
                {priceToShow1 === coin.id && (
                  <div className="priceInfo">{coin.current_price} USD</div>
                )}
                <div className="reserveInfo">
                  <span>{getReserve(coin.name)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ChangeIcon />
        <div>
          <p className="text-change">Получаете</p>
          <ul className="listSecond">
            {coins.map((coin) => (
              <li key={coin.id} onClick={() => handleCoinClick(coin, 2)}>
                <button
                  type="button"
                  className={`coin-button ${
                    selectedCoin2?.id === coin.id ? "selected" : ""
                  }`}
                  disabled={selectedCoin1 && selectedCoin1.id === coin.id} // Деактивируем кнопку если коин уже выбран в первом списке
                >
                  <img
                    src={coin.image}
                    width="80px"
                    height="80px"
                    alt={coin.name}
                  />
                </button>
                {priceToShow2 === coin.id && (
                  <div className="priceInfo">{coin.current_price} USD</div>
                )}
                <div className="reserveInfo">
                  <span>{getReserve(coin.name)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        to={REQUEST_ROUTE}
        className="create-btn"
        onClick={handleCreateRequest} // Обработчик клика для создания заявки
      >
        Создать заявку
      </Link>
      <div className="reviews-container">
        <ReviewsList />
      </div>
      <ToastContainer />{" "}
      {/* Добавляем компонент ToastContainer для отображения уведомлений */}
    </div>
  );
}

export default Change;
