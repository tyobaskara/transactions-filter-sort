import PropTypes from 'prop-types';

const displayName = 'TransactionList';
const propTypes = {
  transactions: PropTypes.object.isRequired,
  getTransactions: PropTypes.func.isRequired
};
const defaultProps = {};

const Config = {
  displayName,
  propTypes,
  defaultProps
};

export default Config;
