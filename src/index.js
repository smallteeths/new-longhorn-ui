import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './models/store';
import {
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import router from './router';
import './utils/base'

// import assets
import './assets/iconfont/iconfont.eot'
import './assets/iconfont/iconfont.svg'
import './assets/iconfont/iconfont.ttf'
import './assets/iconfont/iconfont.woff'

//import antd css
import './index.css'

// import global styles
import './assets/styles/index.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
