import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ThankYou.css';

function ThankYou() {
  const { downloadName } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const downloadTimer = setTimeout(() => {
      window.location.href = `https://api.natemarcellus.com/download/${downloadName}`;
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(downloadTimer);
    };
  }, [downloadName]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const generatePayPalUrl = () => {
    return `https://paypal.me/TheNatrix01/${amount}`;
  };

  const generateCashAppUrl = () => {
    return `https://cash.app/$natejmar/${amount}`;
  };

  return (
    <div className="thank-you">
      <h1>Thank You for Downloading {downloadName}</h1>
      <p>Your download will start in {countdown} seconds...</p>
      <div className="donate-section">
        <h2>Donate to my projects and development efforts</h2>
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
          <a href={generatePayPalUrl()} target="_blank" rel="noopener noreferrer" className="donate-button">Donate with PayPal</a>
          <a href={generateCashAppUrl()} target="_blank" rel="noopener noreferrer" className="donate-button">Donate with Cash App</a>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
