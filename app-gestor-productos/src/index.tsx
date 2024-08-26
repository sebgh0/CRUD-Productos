import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import 'primereact/resources/themes/mira/theme.css'  // Tema opcional
import 'primereact/resources/themes/soho-light/theme.css'  // Tema opcional
import 'primereact/resources/primereact.min.css';           // Estilos CSS
import 'primeicons/primeicons.css';                         // Íconos


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
