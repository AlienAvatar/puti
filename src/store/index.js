import { createStore, applyMiddleware, compose } from 'redux';
//用最简单的方式搭建异步的Action构造器
import thunk from 'redux-thunk';
//记录所有Redux action和下一次state的日志
import logger from 'redux-logger';
import reducer from './Reducer';
import { routerMiddleware } from 'react-router-redux';

let createHistory = require('history').createHashHistory;
let history = createHistory();
let routerWare = routerMiddleware(history);

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk, routerWare)));