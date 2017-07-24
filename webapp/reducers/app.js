import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Immutable from 'immutable';

import graph from './graph.reducer.js';
import layout from './layout.reducer.js';
import node from './node.reducer.js';

export default combineReducers({
  routing: routerReducer,
  graph,
  layout,
  node,
});
