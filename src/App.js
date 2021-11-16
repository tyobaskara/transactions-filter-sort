import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import TransactionList from './components/transactionList/transactionList.container';
import TransactionDetail from './components/transactionDetail/transactionDetail.container';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TransactionList />} />
        <Route path="/detail/:transactionId" element={<TransactionDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
