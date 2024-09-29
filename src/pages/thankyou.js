import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ThankYou.css';

function ThankYou() {
  const { downloadName } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [amount, setAmount] = useState(0);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setDownloadStarted(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    const startDownload = async () => {
      try {
        const response = await fetch(`https://api.natemarcellus.com/download/${downloadName}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = downloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error('Download failed');
        }
      } catch (error) {
        console.error('Error during download:', error);
      }
    };

    const downloadTimer = setTimeout(() => {
      startDownload();
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
    return `https://paypal.me/natemarcellus/${amount}`;
  };

  const generateCashAppUrl = () => {
    return `https://cash.app/$natejmar/${amount}`;
  };

  return (
    <div className="thank-you">
      <h1>Thank You for Downloading {downloadName}</h1>
      <p>{countdown > 0 ? `Your download will start in ${countdown} seconds...` : 'Download is starting...'}</p>
      {downloadStarted && (
        <p className="download-link">
          Download not started? <a href={`https://api.natemarcellus.com/download/${downloadName}`} target="_blank" rel="noopener noreferrer">Click here</a>
        </p>
      )}
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
