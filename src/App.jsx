
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Redirect from './pages/Redirect';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}
