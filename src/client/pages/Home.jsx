import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlStore from '../store/urlStore';
const config = window.appConfig;

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();
  const { addUrl, setSearchTerm, urls, searchTerm, urlCount, reset } = useUrlStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.origin}/api/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      addUrl(data.shortUrl, url);
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      navigate(`/preview/${data.shortUrl}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredUrls = Object.entries(urls).filter(([short, long]) => 
    !searchTerm || long.includes(searchTerm) || short.includes(searchTerm)
  );

  return (
    <main className="container">
      <h1>URL Shortener - {config.name}'s App</h1>
      <input
        type="text"
        placeholder="Search URLs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <div style={{ marginBottom: '20px' }}>
        {filteredUrls.map(([short, long]) => (
          <div key={short} style={{ marginBottom: '10px' }}>
            <strong>{short}</strong>: {long}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortUrl && (
        <div className="result">
          <p>Your shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      <div className="stats">
        <p>Total URLs shortened: {urlCount}</p>
        <button onClick={reset}>Reset All</button>
      </div>
    </main>
  );
}