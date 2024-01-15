import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDy6iOp2_YTKW7C1UEMlTbILwz4yoyRlu4",
  authDomain: "secret-share-app-6785e.firebaseapp.com",
  databaseURL: "https://secret-share-app-6785e-default-rtdb.firebaseio.com",
  projectId: "secret-share-app-6785e",
  storageBucket: "secret-share-app-6785e.appspot.com",
  messagingSenderId: "839491010809",
  appId: "1:839491010809:web:ee31ff60a68e2b8f38a228",
  measurementId: "G-RHKKW18W6C"
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,

);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
reportWebVitals();
