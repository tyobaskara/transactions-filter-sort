import React from 'react';

// Components
import { StatusLabel } from '..';

// Utils
import { formatThousand } from '../../utils/transactions.util';
import { formatDateID } from '../../utils/date.util';

import Config from './transactionListItem.component.config';

import './transactionListItem.styles.scss';

const _renderOriginDestination = (transaction) => {
  const { sender_bank, beneficiary_bank } = transaction;
  const senderClass = sender_bank.length > 4 ? 'capitalize' : 'uppercase';
  const beneficiaryClass = beneficiary_bank.length > 4 ? 'capitalize' : 'uppercase';

  return (
    <p className='originDestination'>
      <span className={senderClass}>{sender_bank}</span>
      <i className="fas fa-arrow-right"></i>
      <span className={beneficiaryClass}>{beneficiary_bank}</span>
    </p>
  );
};

const _renderAmountAndDate = (transaction) => (
  <p className='amountAndDate'>
    <span>Rp{formatThousand(transaction.amount)}</span>
    <i className="fas fa-circle"></i>
    <span>{formatDateID(transaction.created_at)}</span>
  </p>
);

const _renderItem = transaction => {
  const { beneficiary_name, status } = transaction;
  const wrapperClass = `transactionListItemWrapper ${status}`;

  return (
    <div className={wrapperClass}>
      <div className='content'>
        {_renderOriginDestination(transaction)}
        <p className='beneficiaryName'>{beneficiary_name}</p>
        {_renderAmountAndDate(transaction)}
        <StatusLabel status={transaction.status} />
      </div>
    </div>
  );
};

const TransactionListItem = (props) => {
  const { transaction } = props;

  return _renderItem(transaction);
}
TransactionListItem.displayName = Config.displayName;
TransactionListItem.propTypes = Config.propTypes;
TransactionListItem.defaultProps = Config.defaultProps;

export default TransactionListItem;
