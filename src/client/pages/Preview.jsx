import { useParams, useNavigate } from 'react-router-dom';
import useUrlStore from '../store/urlStore';

export default function Preview() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const longUrl = useUrlStore((state) => state.urls[shortUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="container">
      <h1>URL Preview</h1>
      <div className="preview-info">
        <p>Parameter from URL (useParams): <code>{shortUrl}</code></p>
        <p>Short URL: {window.location.origin}/{shortUrl}</p>
        <p>Redirects to: {longUrl}</p>
        <p>URL Length: {longUrl?.length || 0} characters</p>
      </div>
      <button onClick={handleBack} style={{ marginTop: '20px' }}>Go Back</button>
    </main>
  );
}