import React from 'react';
import './Reserver.css'; // Подключаем стили
import { reserves } from '../../array/coinsArray';


const Reserver = () => {
  return (
    <div className="reserver-container">
      <h2>Резервы на обмен</h2>
      <div className="reserves-list">
        {reserves.map((reserve, index) => (
          <div key={index} className="reserve-item">
            <h3>{reserve.name}</h3>
            <p>{reserve.reserve}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserver;
