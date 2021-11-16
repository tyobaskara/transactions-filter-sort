import PropTypes from 'prop-types';

const displayName = 'TransactionListItem';
const propTypes = {
  transaction: PropTypes.shape({
    account_number: PropTypes.string,
    amount: PropTypes.number,
    beneficiary_bank: PropTypes.string,
    beneficiary_name: PropTypes.string,
    completed_at: PropTypes.string,
    created_at: PropTypes.string,
    fee: PropTypes.number,
    id: PropTypes.string,
    remark: PropTypes.string,
    sender_bank: PropTypes.string,
    status: PropTypes.string,
    unique_code: PropTypes.number
  }).isRequired
};
const defaultProps = {};

const Config = {
  displayName,
  defaultProps,
  propTypes
};

export default Config;
