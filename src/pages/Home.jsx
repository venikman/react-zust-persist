import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUrlStore from '../store/urlStore';


export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();
  const addUrl = useUrlStore((state) => state.addUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const short = Math.random().toString(36).substring(2, 8);
    addUrl(short, url);
    setShortUrl(`${window.location.origin}/${short}`);
    navigate(`/preview/${short}`);
  };

  const handleReplace = () => {
    const short = Math.random().toString(36).substring(2, 8);
    localStorage.setItem(short, url);
    navigate(`/preview/${short}`, { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <main className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <div className="button-group">
          <button type="submit">Navigate to Preview</button>
          <button type="button" onClick={handleReplace}>Replace with Preview</button>
          <button type="button" onClick={handleGoBack}>Go Back</button>
          <button type="button" onClick={handleGoForward}>Go Forward</button>
        </div>
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
        <p>Total URLs shortened: {useUrlStore((state) => state.urlCount)}</p>
        <button onClick={useUrlStore((state) => state.reset)}>Reset All</button>
      </div>
    </main>
  );
}