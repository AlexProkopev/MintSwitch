import React from "react";
import Header from "../Header/Header";
import Footer from "../../pages/Footer/Footer";
import './Layout.css'; // Добавьте файл стилей для layout

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
