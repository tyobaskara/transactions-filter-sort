import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

// Components
import { StatusLabel } from '..';

// Utils
import { formatThousand } from '../../utils/transactions.util';
import { formatDateID } from '../../utils/date.util';

import config from './transactionDetail.component.config';
import './transactionDetail.styles.scss';

const _renderDetailHead = (transactionId, selectedTransaction) => (
  <div className='transactionDetail__head'>
    <p className='bold'>ID TRANSAKSI: #{transactionId}</p>
    <StatusLabel status={selectedTransaction.status}/>
  </div>
);

const _renderDetailBody = selectedTransaction => {
  const { 
    sender_bank, beneficiary_bank, beneficiary_name, 
    account_number, amount, unique_code, remark, created_at
  } = selectedTransaction;
  const senderClass = sender_bank.length > 4 ? 'capitalize' : 'uppercase';
  const beneficiaryClass = beneficiary_bank.length > 4 ? 'capitalize' : 'uppercase';

  return (
    <div className='transactionDetail__body clearfix'>
      <img src='/images/icon-detail.png' alt='icon detail' />
      <div className='content'>
        <p>
          <span className='uppercase bold'>pengirim</span>
          <span className={senderClass}>{sender_bank}</span>
        </p>

        <p>
          <span className='uppercase bold'>penerima</span>
          <span className={beneficiaryClass}>{beneficiary_bank}</span>
          <span>{account_number}</span>
          <span className='capitalize'>{beneficiary_name}</span>
        </p>

        <p>
          <span className='uppercase bold'>nominal</span>
          <span>Rp{formatThousand(amount)}</span>
          <span className='bold'>Kode Unik: {unique_code}</span>
        </p>

        <p>
          <span className='uppercase bold'>catatan</span>
          <span>{remark}</span>
        </p>

        <p>
          <span className='uppercase bold'>waktu dibuat</span>
          <span>{formatDateID(created_at)}</span>
        </p>
      </div>
    </div>
  );
};

const TransactionDetail = (props) => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const { transactions } = props;
  const selectedTransaction = transactions.data.find(transaction => transaction.id === transactionId);

  return (
    <div className='transactionDetail'>
      <div className='container'>
        <h1>Detail Transaksi</h1>
        {_renderDetailHead(transactionId, selectedTransaction)}
        {_renderDetailBody(selectedTransaction)}
        <button className='btn btn-orange' onClick={() => navigate(-1)}>Kembali</button>
      </div>
    </div>
  );
};
TransactionDetail.displayName = config.displayName;
TransactionDetail.propTypes = config.propTypes;
TransactionDetail.defaultProps = config.defaultProps;

export default React.memo(TransactionDetail);
