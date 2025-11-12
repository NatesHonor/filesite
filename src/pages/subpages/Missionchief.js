import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../styles/MissionchiefPage.css';

const MissionChief = () => {
  const appName = "MissionchiefBot";
  const [versions, setVersions] = useState([]);
  const [latestVersion, setLatestVersion] = useState(null);
  const [changelogContent, setChangelogContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.natemarcellus.com/version/missionchiefbot`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { latest, versions } = data;
        setVersions(versions);
        setLatestVersion(latest);

        const changelogResponse = await fetch('/MarkDownFiles/MissionchiefBotLatest.md');
        if (!changelogResponse.ok) {
          throw new Error('Failed to fetch changelog');
        }
        const changelogText = await changelogResponse.text();
        setChangelogContent(changelogText);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const LoadingScreen = () => (
    <div className="loading-screen">
      <h2>Loading...</h2>
      <p>Please wait while we fetch the latest information.</p>
    </div>
  );

  return (
    <div className="download-page">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="top-box">
            <h1>Missionchief Bot</h1>
            <p>The ultimate automation tool to simplify your needs for Missionchief.</p>

            <div className="button-container">
              <Link to={`/thank-you/${appName}/latest`}>
                <button className="primary-button">
                  Download MissionchiefBot v{latestVersion}
                </button>
              </Link>
              <a
                href="https://support.natemarcellus.com/docs/missionchief-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="secondary-button">Browse the Wiki</button>
              </a>
            </div>
          </div>

          <div className="changelog-box">
            <ReactMarkdown>{changelogContent}</ReactMarkdown>
          </div>

          <h3>Previous Versions:</h3>
          <ul className="version-list">
            {versions.map((version) => (
              <li key={version}>
                <Link to={`/thank-you/${appName}/${version}`}>
                  <button className="primary-button">Download v{version}</button>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MissionChief;
