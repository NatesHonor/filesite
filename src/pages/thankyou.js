import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/ThankYou.css';

function ThankYou() {
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [amount, setAmount] = useState(0);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  const startDownload = useCallback(async () => {
    try {
      const pathParts = location.pathname.split('/');
      const appName = pathParts[2];
      const version = pathParts[3];

      const response = await fetch(`https://api.natemarcellus.com/download/${appName}/${version}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${version}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error during download:', error);
    }
  }, [location.pathname]);

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

    const downloadTimer = setTimeout(() => {
      startDownload();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(downloadTimer);
    };
  }, [location.pathname, startDownload]);

  const displayDownloadName = location.pathname.includes('latest')
    ? 'Missionchief Bot Latest'
    : `Missionchief Bot Version: ${location.pathname.split('/').pop()}`;

  useEffect(() => {
    const fetchMarkdown = async () => {
      const missionchiefVersionFinder = location.pathname.includes('latest')
        ? '/MarkDownFiles/MissionchiefBotLatest.md'
        : `/MarkDownFiles/MissionchiefBot${location.pathname.split('/').pop()}.md`;

      try {
        const response = await fetch(missionchiefVersionFinder);
        if (response.ok) {
          const text = await response.text();
          setMarkdownContent(text);
        } else {
          console.error('Failed to fetch Markdown file');
        }
      } catch (error) {
        console.error('Error fetching Markdown file:', error);
      }
    };

    fetchMarkdown();
  }, [location.pathname]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const generatePayPalUrl = () => `https://paypal.me/natemarcellus/${amount}`;
  const generateCashAppUrl = () => `https://cash.app/$natejmar/${amount}`;
  const handleDownloadRetry = () => startDownload();

  return (
    <div className="thank-you">
      <h1>Thank You for Downloading {displayDownloadName}</h1>
      <p>{countdown > 0 ? `Your download will start in ${countdown} seconds...` : 'Download is starting...'}</p>
      {downloadStarted && (
        <p className="download-link">
          Download not started? 
          <button className="click-here" onClick={handleDownloadRetry}>Click here</button>
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

      <div className="markdown-container">
        <div className="markdown-content">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
