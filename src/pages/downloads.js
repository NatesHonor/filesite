import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Downloads.css';

const apikey = process.env.REACT_APP_API_KEY;

function Downloads() {
  const [downloadCounts, setDownloadCounts] = useState({});

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const downloadNames = ['NateLauncher', 'MissionchiefBot', 'MissionchiefBotX', 'MilitaryChiefCLI'];
      const counts = {};

      for (const name of downloadNames) {
        try {
          const response = await fetch(`https://api.natemarcellus.com/download/info/${name}`, {
            headers: {
              'x-api-key': apikey
            }
          });
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
          <h2>Missionchief Bot X <span className="label new">NEW</span></h2>
          <p>The Missionchief Bot automates tasks and handles transportation requests to automate Missionchief credit gathering.</p>
          <p>Downloads: {downloadCounts['MissionchiefBotX'] !== undefined ? downloadCounts['MissionchiefBotX'] : 'Loading...'}</p>
          <Link to="/downloads/MissionchiefBot" className="download-button">Download</Link>
        </div>
        <div className="download-item">
          <h2>Old Missionchief Bot <span className="label old">OLD</span></h2>
          <p>This is an archived old version of the MissionChief Bot.</p>
          <p>Downloads: {downloadCounts['MissionchiefBot'] !== undefined ? downloadCounts['MissionchiefBot'] : 'Loading...'}</p>
          <Link to="/downloads/MissionchiefBot" className="download-button">Download</Link>
        </div>
        <div className="download-item">
          <h2>NateLauncher</h2>
          <p>NateLauncher is a launcher to launch all of the projects I make and is recommended for using the Missionchief Bot.</p>
          <p>Downloads: {downloadCounts.NateLauncher !== undefined ? downloadCounts.NateLauncher : 'Loading...'}</p>
          <Link to="/download/NateLauncher" className="download-button">Download</Link>
        </div>
        <div className="download-item">
          <h2>MilitaryChiefCLI (WIP)</h2>
          <p>MilitaryChiefCLI is a work-in-progress spin-off of Missionchief tailored for military operations. Stay tuned for updates!</p>
          <p>Downloads: {downloadCounts.MilitaryChiefCLI !== undefined ? downloadCounts.MilitaryChiefCLI : 'Loading...'}</p>
          <Link to="/download/MilitaryChiefCLI" className="download-button">Download</Link>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
