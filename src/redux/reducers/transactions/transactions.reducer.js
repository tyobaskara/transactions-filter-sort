import axios from 'axios';
import { createAction } from 'redux-action';
import typeToReducer from 'type-to-reducer';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const ERROR_TRANSACTIONS = 'ERROR_TRANSACTIONS';

// mapDispatchToProps = dispatch => ({
//  data: (res) => dispatch(getTransactionsAction(res))
// })
// mapDispatchToProps = {
//  data: getTransactionsAction
// }
// equal to dispatch({ type: GET_TRANSACTIONS, payload: res });
const getTransactionsAction = createAction(GET_TRANSACTIONS);
const errorTransactionsAction = createAction(ERROR_TRANSACTIONS);

const getTransactions = () => async dispatch => {
  try {
    const result = await axios.get(`https://nextar.flip.id/frontend-test`);
    
    dispatch(getTransactionsAction(Object.values(result.data)))
  }
  catch(error){
    dispatch(errorTransactionsAction(error))
  }
}

export const actions = {
  getTransactions
}

const initialState = {
  data: [],
  loading: true,
  error: ''
};

const getTransactionsHandler = (state, action) => ({
  ...state,
  data: action.payload,
  loading: false
});

const errorTransactionsHandler = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload
});

export default typeToReducer({
  [GET_TRANSACTIONS]: getTransactionsHandler,
  [ERROR_TRANSACTIONS]: errorTransactionsHandler
}, initialState);
