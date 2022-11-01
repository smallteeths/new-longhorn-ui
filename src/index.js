import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './models/store';
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import router from "./router";

// import assets
import './assets/iconfont/iconfont.eot'
import './assets/iconfont/iconfont.svg'
import './assets/iconfont/iconfont.ttf'
import './assets/iconfont/iconfont.woff'

//import antd css
import './index.css'

// import global styles
import './assets/styles/index.scss'


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
