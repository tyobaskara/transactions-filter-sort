import { createAction } from 'redux-action';
import typeToReducer from 'type-to-reducer';

// Services
import transactionServices from '../../../services/transactions.service';

// Constants
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const ERROR_TRANSACTIONS = 'ERROR_TRANSACTIONS';
const SET_LOADING = 'SET_LOADING';

// Container
// mapDispatchToProps = dispatch => ({
//  getTransactions: (res) => dispatch(actions.getTransactions(res))
// })
//
// mapDispatchToProps = {
//  getTransactions: actions.getTransactions
// }
//
// Component
// props.getTransactions('payload') equal to dispatch({ type: GET_TRANSACTIONS, payload: 'payload' });

// Actions
const getTransactionsAction = createAction(GET_TRANSACTIONS);
const errorTransactionsAction = createAction(ERROR_TRANSACTIONS);
const setLoadingAction = createAction(SET_LOADING);

const getTransactions = () => async dispatch => {
  dispatch(setLoadingAction(true));
  const { data, error } = await transactionServices.getTransactions();

  dispatch(setLoadingAction(false));
  if (error) return dispatch(errorTransactionsAction(error));

  dispatch(getTransactionsAction(data));
}

export const actions = {
  getTransactions
}

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: ''
};

// Actions Handler
const getTransactionsHandler = (state, action) => ({
  ...state,
  data: action.payload,
  loading: false,
  error: ''
});

const errorTransactionsHandler = (state, action) => ({
  ...state,
  data: [],
  loading: false,
  error: action.payload
});

const setLoadingHandler = (state, action) => ({
  ...state,
  loading: action.payload
});

// Reducer
export default typeToReducer({
  [GET_TRANSACTIONS]: getTransactionsHandler,
  [ERROR_TRANSACTIONS]: errorTransactionsHandler,
  [SET_LOADING]: setLoadingHandler
}, initialState);
