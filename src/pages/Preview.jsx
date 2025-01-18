
import { useParams } from 'react-router-dom';

export default function Preview() {
  const { shortUrl } = useParams();
  const longUrl = localStorage.getItem(shortUrl);

  return (
    <main className="container">
      <h1>URL Preview</h1>
      <div className="preview-info">
        <p>Short URL: {window.location.origin}/{shortUrl}</p>
        <p>Redirects to: {longUrl}</p>
      </div>
    </main>
  );
}
