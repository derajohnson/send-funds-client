import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers'
import './Form.css';
import abi from '../utils/SendFunds.json';
import { parseEther } from 'ethers/lib/utils';
import Transaction from './Transactions';

// 0x61696df0f7Af8A8570D9da0D010f0098F94687dc

const Form = () => {
    const [walletAddress, setWalletAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [allTxns, setAllTxns] = useState([])
    const [isTxn, setIsTxn] = useState(false)

    const contractAddress = '0x901daf41a2292c1002e4F9dEe8f8Ab05964ccd50'
    const contractABI = abi.abi
    const sendFunds = async () => {
        try {
            const {ethereum} = window
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sendFundsContract = new ethers.Contract(contractAddress, contractABI, signer)
                const sendFundsTxn = await sendFundsContract.sendFunds(walletAddress, ethers.utils.parseEther(amount), { gasLimit: 300000, value: parseEther(amount) })
                await sendFundsTxn.wait()
            }else{
                console.log('ethereum object does not exist!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTransactions = async () => {
      try {
        const {ethereum} = window
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const sendFundsContract = new ethers.Contract(contractAddress, contractABI, signer)
            let getAllTxn = await sendFundsContract.getAllTxn()
            setIsTxn(true)

    let txns = [];
    getAllTxn.forEach(txn => {
      txns.push({
          address: txn.reciever,
          amount: txn.amount,
          timestamp: new Date(txn.timestamp * 1000)
      })
  })
    setAllTxns(txns)
           
        }else{
            console.log('ethereum object does not exist!')
        }
    } catch (error) {
        console.log(error)
    }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        sendFunds();
        
    }
useEffect(() => {
getAllTransactions()
}, [])
    console.log(allTxns)

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Wallet Address"
            required
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </p>
        <p>
          <input
            type="number"
            name=""
            id=""
            placeholder="Enter Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step='any'
            min='0'
          />
        </p>
        <button type="submit">
          Send
        </button>
      </form>

      <div>
        {isTxn === false ? <div>
          </div>:<div>
            <Transaction allTxns={allTxns}/>
            </div>
          }
      </div>
    </div>
  );
};

export default Form;
