import { Route, Routes } from "react-router-dom";

import "./App.css";
import {
  AUTH_ROUTE,
  CABINET_ROUTE,
  CHANGE_ROUTE,
  CONTACTS_ROUTE,
  CRYPTOTABLE_ROUTE,
  EXINSTRUCTION,
  FORGOT_PASSWORD_ROUTE,
  NOTICE_ROUTE,
  REGISTER_ROUTE,
  REQUEST_ROUTE,
  ROAD_ROUTE,
  SITEMAP_ROUTE,
  TERMS_ROUTE,
} from "./components/routes/routes";
import Layout from "./components/Layout/Layout";
import Cabinet from "./pages/Cabinet/Cabinet";
import Change from "./pages/Change/Change";
import ExchangeRequest from "./components/ExchangeRequest/ExchangeRequest";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import CryptoTable from "./pages/CryptoTable/CryptoTable";
import AMLPolicy from "./pages/AMLPolicy/AMLPolicy";
import Terms from "./pages/Terms/Terms";
import ReviewsList from "./components/Reviews/Reviews";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Contact from "./pages/Contact/Contact";
import Sitemap from "./pages/MapSite/Sitemap ";
import Notice from "./pages/Notice/Notice";
import ExchangeInstruction from "./components/ExchangeInstruction/ExchangeInstruction";



function App() {
  return (
    <Layout>
      <div className="container">
        <Routes>
          <Route path="/" element={<Change />} />
          <Route path={CHANGE_ROUTE} element={<Change />} />
          <Route path={REQUEST_ROUTE} element={<ExchangeRequest />} />
          <Route path={ROAD_ROUTE} element={<AMLPolicy />} />
          <Route path={CABINET_ROUTE} element={<Cabinet />} />
          <Route path={REGISTER_ROUTE} element={<Registration />} />
          <Route path={AUTH_ROUTE} element={<Login />} />
          <Route path={CRYPTOTABLE_ROUTE} element={<CryptoTable />} />
          <Route path={EXINSTRUCTION} element={<ExchangeInstruction />} />
          <Route path={TERMS_ROUTE} element={<Terms />} />
          <Route path="reviews" element={<ReviewsList />} /> 
          <Route path={CONTACTS_ROUTE} element={<Contact />} /> 
          <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} /> 
          <Route path={SITEMAP_ROUTE} element={<Sitemap />} /> 
          <Route path={NOTICE_ROUTE} element={<Notice />} /> 
        </Routes>
       
      </div>
    </Layout>
  );
}

export default App;
