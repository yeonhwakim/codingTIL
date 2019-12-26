import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';

import App from './App';
import Socket from './Socket';

ReactDom.render(
  <Provider store={store}>
    <Socket/>
    <App />
  </Provider>,
  document.getElementById('root'),
);
