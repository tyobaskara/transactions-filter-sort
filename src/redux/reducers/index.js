import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import transactionsReducer from './transactions/transactions.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactions']
};

const rootReducer = combineReducers({
  transactions: transactionsReducer
});

export default persistReducer(persistConfig, rootReducer);
