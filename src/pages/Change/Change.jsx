import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Change.css";
import {useNavigate } from "react-router-dom";
import { REQUEST_ROUTE } from "../../components/routes/routes";
import ChangeIcon from "./ChangeIcon/ChangeIcon";
import ReviewsList from "../../components/Reviews/Reviews";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import Reserver from "../../components/Reserves/Reserver";

function Change() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountCoin2, setAmountCoin2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRatesCache, setExchangeRatesCache] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const amount = rate1to2 ? (1 / rate1to2) : "N/A";

        setExchangeRate(rate1to2);
        setAmountCoin2(amount);
      }
    }
  }, [selectedCoin1, selectedCoin2, exchangeRatesCache]);

  const handleCoinClick = (coin, listNumber) => {
    if (listNumber === 1) {
      if (selectedCoin2 && selectedCoin2.id === coin.id) {
        return;
      } else {
        setSelectedCoin1(coin);
      }
    } else if (listNumber === 2) {
      if (selectedCoin1 && selectedCoin1.id === coin.id) {
        return;
      } else {
        setSelectedCoin2(coin);
      }
    }
  };

  const handleCreateRequest = (event) => {
    event.preventDefault();

    if (!selectedCoin1 || !selectedCoin2) {
      toast.error("Выберите обе монеты для обмена.");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    toast.success(
      "Заявка создана! Пожалуйста, следуйте далее для завершения процесса обмена."
    );

    setLoading(true);

    setTimeout(() => {
      navigate(REQUEST_ROUTE);
      setLoading(false);
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
                <div className="priceInfo">{coin.current_price.toFixed(3)} USD</div>
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
                <div className="priceInfo">{coin.current_price.toFixed(3)} USD</div>
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

      <button
        className="create-btn"
        onClick={handleCreateRequest}
        disabled={!selectedCoin1 || !selectedCoin2}
      >
        Создать заявку
      </button>
      <Reserver />
      <div className="reviews-container">
        <h2 className="reviews-title">Отзывы о нас</h2>
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
