import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import reportWebVitals from './reportWebVitals';
import { AlitaProvider } from 'redux-alita';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style/reset.less';

ReactDOM.render(
  <AlitaProvider>
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </AlitaProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
