
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {import.meta.env.VITE_FOOTER_TEXT || 'URL Shortener'}
    </footer>
  );
};

export default Footer;
