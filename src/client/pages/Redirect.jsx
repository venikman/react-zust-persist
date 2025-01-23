
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Redirect() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const longUrl = localStorage.getItem(shortUrl);
    if (longUrl) {
      window.location.href = longUrl;
    } else {
      navigate('/');
    }
  }, [shortUrl, navigate]);

  return <div>Redirecting...</div>;
}
