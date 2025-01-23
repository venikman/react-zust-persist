import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import Preview from './pages/Preview';
import Footer from './components/Footer'; // Added import for Footer component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:shortUrl" element={<Preview />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
      <Footer /> {/* Added Footer component */}
    </Router>
  )
}

// components/Footer.jsx
const Footer = () => {
  const footerText = process.env.NODE_ENV === 'development' ? 'Development Footer' : process.env.REACT_APP_FOOTER_TEXT || 'Production Footer';
  return (
    <footer>
      <p>{footerText}</p>
    </footer>
  );
};

export default Footer;


// .env.development
REACT_APP_FOOTER_TEXT=Development Footer Text

// .env.production
REACT_APP_FOOTER_TEXT=Production Footer Text