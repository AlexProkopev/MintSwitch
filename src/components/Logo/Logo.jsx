// src/components/Logo.js
import React from "react";
import { Link } from "react-router-dom";

import "./Logo.css";
import { RocketSVG } from "../../assets/RocketSVG";
import { GalaxySVG } from "../../assets/GalaxySVG";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="logo-container">
        <div className="logo-galaxy">
          <GalaxySVG />
        </div>
        <div className="logo-content">
          <div className="logo-rocket">
            <RocketSVG />
          </div>
          <div className="logo-text">
            <h1 className="logo-text-mine">MintSwitch</h1>
            <p>Currency Exchange</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
