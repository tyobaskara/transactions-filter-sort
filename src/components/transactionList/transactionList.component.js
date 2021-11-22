import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

// Components
import { SearchForm, TransactionListItem } from '..';

// Utils
import { sumTransactionsAmount, formatThousand } from '../../utils/transactions.util';
import { filterTransactions, sortTransactions } from '../../utils/transactions.util';

import config from './transactionList.component.config';
import './transactionList.styles.scss';

const _renderTransactionsHead = transactions => {
  const transactionsAmount = sumTransactionsAmount(transactions.data);

  return (
    <div className='transactions__head'>
      <h1>Daftar Transaksi</h1>
      <h2>Halo kak!</h2>
      <p>Kamu telah melakukan transaksi sebesar <span className="bold-orange">Rp{formatThousand(transactionsAmount)}</span> sejak menggunakan Flip.</p>
    </div>
  );
};

const _onItemClick = (transaction, navigate) => () => {
  navigate(`/detail/${transaction.id}`);
};

const _renderTransactionList = (data, filterAndSort, navigate) => {
  const { searchInput, sortType } = filterAndSort;
  let transactions = [...data];

  if (searchInput) {
    transactions = filterTransactions(transactions, searchInput);
  }

  if (sortType) {
    transactions = sortTransactions(transactions, sortType);
  }

  if (transactions.length === 0) return <div className='container text-center' style={{ padding: '20px'}}>No match found..</div>;

  return (
    <ul className='transactions__list'>
      {transactions.map((transaction) => (
        <li key={transaction.id} onClick={_onItemClick(transaction, navigate)}>
          <TransactionListItem transaction={transaction} />
        </li>
      ))}
    </ul>
  )
};

const TransactionListComponent = (props) => {
  const navigate = useNavigate();
  const { transactions, getTransactions } = props;
  const [filterAndSort, setFilterAndSort] = useState({
    searchInput: '',
    sortType: ''
  });

  const onSubmitSearch = useCallback(searchData => {
    setFilterAndSort(searchData);
  }, [setFilterAndSort]);

  React.useEffect(() => {
    getTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('transactions.loading', transactions.loading);
  if (transactions.loading) return <div className='container text-center' style={{ padding: '20px'}}>Loading....</div>;
  if (transactions.error) return <div className='container text-center' style={{ padding: '20px'}}>Error....</div>;

  return (
    <div className='transactions'>
      <div className='container'>
        {_renderTransactionsHead(transactions)}
        
        <SearchForm
          onSearchSubmit={onSubmitSearch}
        />

        {_renderTransactionList(transactions.data, filterAndSort, navigate)}
      </div>
    </div>
  )
};
TransactionListComponent.displayName = config.displayName;
TransactionListComponent.propTypes = config.propTypes;
TransactionListComponent.defaultProps = config.defaultProps;

export default TransactionListComponent;
