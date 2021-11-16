import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Thunk from 'redux-thunk';

import reducers from './reducers';

const middlewares = [Thunk];

const enhancer = composeWithDevTools(
  applyMiddleware(...middlewares)
);

const store = createStore(reducers, enhancer);

// Redux-Persist
const persistor = persistStore(store);

export { store, persistor };
