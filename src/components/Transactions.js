import React from 'react';
import './Transactions.css'

const Transaction = ({allTxns}) => {
  console.log(allTxns)
  return (
    <div className='transaction-container'>
      <h2>All Transactions:</h2>
     {allTxns.length === 0 ? <div>
       
       </div>: <div className='grid-container'>
          {allTxns.map((txn, index) => {
            return (
              <div>
                <p>Reciever: {txn.address}</p>
                <p>Amount: {txn.amount.toString()}</p>
                <p>Date: {txn.timestamp.toString()}</p>
                </div>
            )
          })}
         </div>}
    </div>
  );
};

export default Transaction;
