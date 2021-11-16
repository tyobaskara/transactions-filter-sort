import { connect } from 'react-redux';

import TransactionDetail from './transactionDetail.component';

const container = props => <TransactionDetail {...props} />;

const mapStateToProps = state => ({
  transactions: state.transactions
});

export default connect(
  mapStateToProps
)(container);
