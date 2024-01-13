import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider} from 'react-redux';
import { combineReducers, createStore} from 'redux';
import {TransactionsProvider} from './Transanctions/TransactionProvider'
import { user} from './reducers/users';
import { bookings } from './reducers/bookings';
import { page } from './reducers/components';
import './index.css'

const store=createStore(combineReducers({user,page, bookings}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TransactionsProvider>
  </React.StrictMode>
);

