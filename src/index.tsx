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
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN ? process.env.REACT_APP_AUTH0_DOMAIN : ''}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ? process.env.REACT_APP_AUTH0_CLIENT_ID : ''}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE?process.env.REACT_APP_AUTH0_AUDIENCE:''}
            scope={process.env.REACT_APP_AUTH0_SCOPE?process.env.REACT_APP_AUTH0_SCOPE:''}
            redirectUri={window.location.origin}
        >
            <App/>
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
