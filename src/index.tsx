import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./assets/theme/theme-maun.scss";
import "./assets/layout/css/layout-maun.scss";
import "primeicons/primeicons.css";
import "./favicon.ico";

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SiteShowcase from "./components/site/SiteShowcase";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
