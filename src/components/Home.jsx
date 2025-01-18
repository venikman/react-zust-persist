import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShortCode(data.shortCode);
      navigate(`/shortened/${data.shortCode}`, {
        state: {
          createdAt: new Date().toISOString(),
          originalUrl: url
        }
      });
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortCode && (
        <p>
          Shortened URL:{' '}
          <a href={`/shortened/${shortCode}`} target="_blank" rel="noopener noreferrer">
            /shortened/{shortCode}
          </a>
        </p>
      )}
    </div>
  );
}

function Shortened({ location }) {
  const { state } = location;
  return (
    <div>
      <h1>Shortened URL Details</h1>
      <p>Original URL: {state.originalUrl}</p>
      <p>Created At: {state.createdAt}</p>
    </div>
  );
}

function Redirect({ location }) {
  const { url } = location.state || {}; //Handle cases where state might be missing
  const navigate = useNavigate();
  if (url) {
    window.location.href = url; //Direct redirect for better user experience
  } else {
    navigate('/');
  }
  return null; //No render necessary
}

export { Home, Shortened, Redirect };