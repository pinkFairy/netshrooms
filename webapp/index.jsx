import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

import styles from './styles/App.scss';
import reducers from './reducers/app';

import App from './components/App';

const store = createStore(reducers, applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory)));
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);