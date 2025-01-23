import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import Preview from './pages/Preview';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview/:shortUrl" element={<Preview />} />
          <Route path="/:shortUrl" element={<Redirect />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}