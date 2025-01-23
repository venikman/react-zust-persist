
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {import.meta.env.VITE_FOOTER_TEXT || 'URL Shortener'}
      <span style={{color: 'red'}}> ({import.meta.env.MODE} mode)</span>
    </footer>
  );
};

export default Footer;
