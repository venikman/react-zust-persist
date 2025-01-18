import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlStore from '../store/urlStore';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();
  const { addUrl, setSearchTerm, urls, searchTerm, urlCount, reset } = useUrlStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const short = Math.random().toString(36).substring(2, 8);
    addUrl(short, url);
    setShortUrl(`${window.location.origin}/${short}`);
    navigate(`/preview/${short}`);
  };

  const filteredUrls = Object.entries(urls).filter(([short, long]) => 
    !searchTerm || long.includes(searchTerm) || short.includes(searchTerm)
  );

  return (
    <main className="container">
      <h1>URL Shortener</h1>
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