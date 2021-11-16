import { connect } from 'react-redux';
import { actions as transactionsAction } from '../../redux/reducers/transactions/transactions.reducer';
import TransactionList from './transactionList.component';

const container = props => <TransactionList {...props} />;

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = {
  getTransactions: transactionsAction.getTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(container);
