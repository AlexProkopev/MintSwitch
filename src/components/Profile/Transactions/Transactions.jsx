import React from 'react';
import css from './Transactions.module.css';

const Transactions = ({ transactions }) => {
  return (
    <div className={css.transactionsContainer}>
      <h2 className={css.transactionsTitle}>Ваши обмены</h2>
      {transactions.length === 0 ? (
        <p className={css.noTransactions}>У вас пока нет ни одного обмена</p>
        
      ) : (
        <ul className={css.transactionsList}>
          {transactions.map((transaction, index) => (
            <li key={index} className={css.transactionItem}>
              {transaction.details}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
