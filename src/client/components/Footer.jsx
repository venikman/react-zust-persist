
import './Footer.css';

const Footer = () => {
  const isDev = import.meta.env.MODE === 'development';
  return (
    <footer className="footer">
      {import.meta.env.VITE_FOOTER_TEXT || 'URL Shortener'}
      {isDev && <span style={{color: 'red'}}> (Development Mode)</span>}
    </footer>
  );
};

export default Footer;
