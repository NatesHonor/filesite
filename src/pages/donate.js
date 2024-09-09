import React, { useState } from 'react';
import '../styles/Donate.css';

function Donate() {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const generatePayPalUrl = () => {
    return `https://paypal.me/natemarcellus/${amount}`;
  };

  const generateCashAppUrl = () => {
    return `https://cash.app/$natejmar/${amount}`;
  };

  return (
    <div className="donate">
      <h1>Support Nate's Downloads</h1>
      <p>Your support helps us continue to develop and maintain our tools. Choose an amount to donate:</p>
      <div className="amount-buttons">
        <button onClick={() => setAmount(5)}>$5</button>
        <button onClick={() => setAmount(10)}>$10</button>
        <button onClick={() => setAmount(20)}>$20</button>
        <button onClick={() => setAmount(50)}>$50</button>
        <button onClick={() => setAmount(100)}>$100</button>
        <input
          type="number"
          placeholder="Other amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="donate-buttons">
        <a href={generatePayPalUrl()} target="_blank" rel="noopener noreferrer">
          <button className="paypal-button">Donate with PayPal</button>
        </a>
        <a href={generateCashAppUrl()} target="_blank" rel="noopener noreferrer">
          <button className="cashapp-button">Donate with Cash App</button>
        </a>
      </div>
    </div>
  );
}

export default Donate;
