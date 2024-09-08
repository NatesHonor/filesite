import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Downloads.css';

function Downloads() {
  const [downloadCounts, setDownloadCounts] = useState({});

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const downloadNames = ['NateLauncher', 'MissionchiefBot-Latest', 'MilitaryChiefCLI'];
      const counts = {};

      for (const name of downloadNames) {
        try {
          const response = await fetch(`https://api.natemarcellus.com/download/info/${name}`);
          const data = await response.json();
          console.log(`Fetched data for ${name}:`, data);
          counts[name] = data.downloads || data.downloadCount || 0;
        } catch (error) {
          console.error(`Error fetching download count for ${name}:`, error);
        }
      }

      console.log('Final counts:', counts);
      setDownloadCounts(counts);
    };

    fetchDownloadCounts();
  }, []);

  return (
    <div className="downloads">
      <h1>Downloads</h1>
      <p>Explore our tools and utilities designed to enhance your experience.</p>
      <div className="download-list">
        <div className="download-item">
          <h2>NateLauncher</h2>
          <p>NateLauncher is a launcher to launch all of the projects I make and is recommended for using the Missionchief Bot.</p>
          <p>Downloads: {downloadCounts.NateLauncher !== undefined ? downloadCounts.NateLauncher : 'Loading...'}</p>
          <Link to="/thank-you/NateLauncher" className="download-button">Download</Link>
        </div>
        <div className="download-item">
          <h2>Missionchief Bot</h2>
          <p>The Missionchief Bot automates tasks and handles transportation requests to automate Missionchief credit gathering.</p>
          <p>Downloads: {downloadCounts['MissionchiefBot-Latest'] !== undefined ? downloadCounts['MissionchiefBot-Latest'] : 'Loading...'}</p>
          <Link to="/thank-you/MissionchiefBot-Latest" className="download-button">Download</Link>
        </div>
        <div className="download-item">
          <h2>MilitaryChiefCLI (WIP)</h2>
          <p>MilitaryChiefCLI is a work-in-progress spin-off of Missionchief tailored for military operations. Stay tuned for updates!</p>
          <p>Downloads: {downloadCounts.MilitaryChiefCLI !== undefined ? downloadCounts.MilitaryChiefCLI : 'Loading...'}</p>
          <Link to="/thank-you/MilitaryChiefCLI" className="download-button">Download</Link>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
