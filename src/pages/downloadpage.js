import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/DownloadPage.css';

const DownloadPage = () => {
  const { appName } = useParams();
  const appNameLower = appName.toLowerCase();
  const [versions, setVersions] = useState([]);
  const [latestVersion, setLatestVersion] = useState(null);
  const [expandedVersion, setExpandedVersion] = useState(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch(`https://api.natemarcellus.com/version/${appNameLower}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { latest, versions } = data;
        setVersions(versions);
        setLatestVersion(latest);
      } catch (error) {
        console.error('Error fetching versions:', error);
      }
    };

    fetchVersions();
  }, [appName]);

  const handleToggleChangelog = (version) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  const renderChangelog = (version) => {
    const changelogFile = version === 'Latest' ? 'MCBotChangelogLatest' : `MCBotChangelog${version}`;
    return <div className="changelog-content">Changelog for {changelogFile}</div>;
  };

  return (
    <div className="download-page">
      <h1>Download the Latest Version</h1>
      <h2>{appName} - {latestVersion}</h2>
      <h3>Previous Versions:</h3>
      <ul className="version-list">
        {versions.map((version) => (
          <li key={version}>
            <Link to={`/thank-you/${appName}/${version}`}>{version}</Link>
            {appName === 'MissionchiefBot' && (
              <>
                <button onClick={() => handleToggleChangelog(version)}>
                  {expandedVersion === version ? 'Hide changelog' : 'See changelog'}
                </button>
                {expandedVersion === version && renderChangelog(version)}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;
