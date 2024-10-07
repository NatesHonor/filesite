import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; 
import '../styles/DownloadPage.css';

const DownloadPage = () => {
  const { appName } = useParams();
  const appNameLower = appName.toLowerCase();
  const [versions, setVersions] = useState([]);
  const [latestVersion, setLatestVersion] = useState(null);
  const [expandedVersion, setExpandedVersion] = useState(null);
  const [changelogContent, setChangelogContent] = useState('');
  const [readmeContent, setReadmeContent] = useState('');

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

        const readmeResponse = await fetch('/MarkDownFiles/MissionchiefBotReadMe.md');
        if (!readmeResponse.ok) {
          throw new Error('Failed to fetch README');
        }
        const readmeText = await readmeResponse.text();
        setReadmeContent(readmeText);
      } catch (error) {
        console.error('Error fetching versions or README:', error);
      }
    };

    fetchVersions();
  }, [appName]);

  const handleToggleChangelog = async (version) => {
    if (expandedVersion === version) {
      setExpandedVersion(null);
      setChangelogContent('');
    } else {
      const filePath = version === latestVersion 
        ? 'MarkDownFiles/MissionchiefBotLatest.md' 
        : `MarkDownFiles/MissionchiefBot${version}.md`;
      
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) {
          throw new Error('Failed to fetch changelog');
        }
        const content = await response.text();
        setChangelogContent(content);
        setExpandedVersion(version);
      } catch (error) {
        console.error('Error fetching changelog:', error);
      }
    }
  };

  return (
    <div className="download-page">
      <h1>Download the Latest Version</h1>
      <div className="latest-version">
        <h2>{appName} - {latestVersion}</h2>
        <Link to={`/thank-you/${appName}/latest`}>
          <button>Download Version {latestVersion}</button>
        </Link>
        <button onClick={() => handleToggleChangelog(latestVersion)}>
          {expandedVersion === latestVersion ? 'Hide changelog' : 'See changelog'}
        </button>
        {expandedVersion === latestVersion && (
          <div className="changelog-content">
            <ReactMarkdown>{changelogContent}</ReactMarkdown> 
          </div>
        )}
        <div className="readme-content">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </div>
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
                {expandedVersion === version && (
                  <div className="changelog-content">
                    <ReactMarkdown>{changelogContent}</ReactMarkdown> 
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;
