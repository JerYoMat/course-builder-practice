import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import App from './App';
import { loadCourses } from './actions';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
store.dispatch(loadCourses())
Modal.setAppElement('#root')

ReactDOM.render(
<Provider store={store} >
  <App/>
</Provider>,
  document.getElementById('root'))