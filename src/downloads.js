import React from 'react';
import './styles/Downloads.css';

function Downloads() {
  return (
    <div className="downloads">
      <h1>Downloads</h1>
      <p>File's Code, Support, and Donate</p>
      <div className="download-list">
        <div className="download-item">
          <h2>NateLauncher</h2>
          <p>Description of NateLauncher.</p>
          <a href="https://api.natemarcellus.com/download/MissionchiefBotInstaller.exe" class="download-button">Download</a>
          </div>
      </div>
    </div>
  );
}

export default Downloads;
