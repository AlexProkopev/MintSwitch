import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="coin mint">💵</div>
        <div className="coin switch">🔄</div>
      </div>
      <div className="loader-text">Mint Switch</div>
    </div>
  );
};

export default Loader;
