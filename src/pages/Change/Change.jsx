import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Change.css";
import { Link, useNavigate } from "react-router-dom";
import { REQUEST_ROUTE } from "../../components/routes/routes";
import ChangeIcon from "./ChangeIcon/ChangeIcon";
import { reserves } from "../../array/coinsArray";
import ReviewsList from "../../components/Reviews/Reviews";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";

function Change() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [priceToShow1, setPriceToShow1] = useState(null);
  const [priceToShow2, setPriceToShow2] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountCoin2, setAmountCoin2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exchangeRatesCache, setExchangeRatesCache] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Делаем один запрос к API для получения данных о монетах и их курсах
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });

        if (response.data && response.data.length > 0) {
          setCoins(response.data);
          localStorage.setItem("coins", JSON.stringify(response.data));

          // Обновляем курс обмена
          const ids = response.data.map(coin => coin.id).join(',');
          const priceResponse = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
              ids: ids,
              vs_currencies: "usd",
            },
          });

          const exchangeRates = {};
          response.data.forEach(coin => {
            exchangeRates[coin.id] = priceResponse.data[coin.id]?.usd || 0;
          });

          setExchangeRatesCache(exchangeRates);
        } else {
          throw new Error("Empty data");
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Ошибка при загрузке данных. Попробуйте снова позже.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedCoins",
      JSON.stringify([selectedCoin1, selectedCoin2])
    );

    if (selectedCoin1 && selectedCoin2) {
      
      if (exchangeRatesCache[selectedCoin1.id] && exchangeRatesCache[selectedCoin2.id]) {
        const rate1to2 = exchangeRatesCache[selectedCoin2.id] / exchangeRatesCache[selectedCoin1.id];
        const rate = rate1to2 ? rate1to2 : "N/A";
        const amount = rate1to2 ? (1 / rate1to2) : "N/A";

        setExchangeRate(rate);
        setAmountCoin2(amount);
      } else {
        fetchExchangeRate(selectedCoin1.id, selectedCoin2.id);
      }
    }
  }, [selectedCoin1, selectedCoin2, exchangeRatesCache]);

  const fetchExchangeRate = (coinId1, coinId2) => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: `${coinId1},${coinId2}`,
          vs_currencies: "usd",
        },
      })
      .then((response) => {
        const rate1to2 =
          response.data[coinId2]?.usd / response.data[coinId1]?.usd;
        const rate = rate1to2 ? rate1to2 : "N/A";
        const amount = rate1to2 ? (1 / rate1to2) : "N/A";

        const cacheKey = `${coinId1}_${coinId2}`;
        setExchangeRatesCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: { rate, amount },
        }));

        setExchangeRate(rate);
        setAmountCoin2(amount);
      })
      .catch((error) => {
        setExchangeRate("Error");
      });
  };

  const handleCoinClick = (coin, listNumber) => {
    if (listNumber === 1) {
      if (selectedCoin2 && selectedCoin2.id === coin.id) {
        return;
      } else {
        setSelectedCoin1(coin);
        setPriceToShow1(coin.id);
      }
    } else if (listNumber === 2) {
      if (selectedCoin1 && selectedCoin1.id === coin.id) {
        return;
      } else {
        setSelectedCoin2(coin);
        setPriceToShow2(coin.id);
      }
    }
  };

  const getReserve = (name) => {
    const reserve = reserves.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
    return reserve ? reserve.reserve : "No Reserve";
  };

  const handleCreateRequest = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toast.success(
      "Заявка создана! Пожалуйста, следуйте далее для завершения процесса обмена."
    );

    setTimeout(() => {
      navigate(REQUEST_ROUTE);
    }, 1000);
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="lists-container">
        <div>
          <p className="text-change">Отдаете</p>
          <ul className="listFirst">
            {coins.map((coin) => (
              <li key={coin.id} onClick={() => handleCoinClick(coin, 1)}>
                <button
                  type="button"
                  className={`coin-button ${selectedCoin1?.id === coin.id ? "selected" : ""}`}
                  disabled={selectedCoin2 && selectedCoin2.id === coin.id}
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
                  className={`coin-button ${selectedCoin2?.id === coin.id ? "selected" : ""}`}
                  disabled={selectedCoin1 && selectedCoin1.id === coin.id}
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

      <div className="selected-info-container">
        {selectedCoin1 && selectedCoin2 && (
          <div className="selected-info">
            <div className="coin-info">
              <img
                src={selectedCoin1.image}
                width="50px"
                height="50px"
                alt={selectedCoin1.name}
              />
              <span>{selectedCoin1.name}</span>
            </div>

            <div className="coin-info">
              <img
                src={selectedCoin2.image}
                width="50px"
                height="50px"
                alt={selectedCoin2.name}
              />
              <span>{selectedCoin2.name}</span>
            </div>
          </div>
        )}
        {exchangeRate && (
          <div className="exchange-rate-info">
            <p className="resultChange">
              1 {selectedCoin1?.name} ≈ {amountCoin2} {selectedCoin2?.name}
            </p>
          </div>
        )}
      </div>

      <Link
        to={REQUEST_ROUTE}
        className="create-btn"
        onClick={handleCreateRequest}
      >
        Создать заявку
      </Link>
      <div className="reviews-container">
        <ReviewsList />
      </div>
      <ToastContainer
        className="toast-container"
        position="fixed"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
      />
    </div>
  );
}

export default Change;
