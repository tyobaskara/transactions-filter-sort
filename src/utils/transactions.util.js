import { isDate } from './date.util';

export const sumTransactionsAmount = data => data.reduce((total, item) => total + item.amount, 0);

export const formatThousand = amount => {
  let reverse = amount.toString().split('').reverse().join(''),
  thousand = reverse.match(/\d{1,3}/g);
  thousand = thousand.join('.').split('').reverse().join('');
  return thousand;
};

export const filterTransactions = (transactions, searchInputVal) => 
  transactions.filter(transaction => {
    const { beneficiary_bank, beneficiary_name, sender_bank } = transaction;
    const searchInput = searchInputVal.toLowerCase();

    return beneficiary_name.toLowerCase().includes(searchInput) ||
      sender_bank.toLowerCase().includes(searchInput) ||
      beneficiary_bank.toLowerCase().includes(searchInput)
  });

export const sortTransactions = (transactions, sortType) => {
  const sortBy = sortType.split('=')[0];
  const order = sortType.split('=')[1];
  const _isDate = isDate(new Date(transactions[0][sortBy]));

  let sortedTransactions = [...transactions];

  for (let i = 0; i < sortedTransactions.length; i++) {
    for (let y = 0; y < sortedTransactions.length - 1; y++) {
      const temp = sortedTransactions[y];
      let current = sortedTransactions[y][sortBy];
      let next = sortedTransactions[y + 1][sortBy];

      if (_isDate) {
        current = new Date(current);
        next = new Date(next);
      }

      if (order === 'asc') {
        if (current > next) {
          sortedTransactions[y] = sortedTransactions[y + 1];
          sortedTransactions[y + 1] = temp;
        }
      } else {
        if (current < next) {
          sortedTransactions[y] = sortedTransactions[y + 1];
          sortedTransactions[y + 1] = temp;
        }
      }
    }
  }

  return sortedTransactions;
};
