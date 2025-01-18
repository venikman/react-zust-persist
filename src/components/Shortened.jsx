import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shortened() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const originalUrl = localStorage.getItem(code);
  const shortUrl = `${window.location.origin}/redirect/${code}`;
  const { createdAt } = location.state || {};

  const handleGoBack = () => {
    navigate(-1); // Using history API to go back
  };

  return (
    <div className="shortened">
      <h2>Your Shortened URL</h2>
      <div className="url-display">
        <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
        <p>Original URL: {originalUrl}</p>
        {createdAt && <p>Created at: {new Date(createdAt).toLocaleString()}</p>}
      </div>
      <button onClick={handleGoBack}>Go Back</button>
      <Link to="/">Create Another</Link>
    </div>
  );
}