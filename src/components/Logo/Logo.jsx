import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    
      <Link to={"/"}>
        <div class="logo">
          <div class="coin">
            <span class="currency-symbol">$</span>
          </div>
          <div class="text">
            <h1>MintSwitch</h1>
            <p>Currency Exchange</p>
          </div>
        </div>
      </Link>
    
  );
};

export default Logo;
