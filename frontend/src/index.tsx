import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store = {store}>
    <GoogleOAuthProvider clientId='420031257155-i4bpv2iuvbl2ler5269k2mdsi5k3np2i.apps.googleusercontent.com'> 
    <App />
    </GoogleOAuthProvider>
  </Provider>
);

