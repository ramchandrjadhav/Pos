import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BarcodeGenerator from './pages/BarcodeGenerator';
import HindiLabelGenerator from './pages/HindiLabelGenerator';
import PromoSignageGenerator from './pages/PromoSignageGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<BarcodeGenerator />} />
          <Route path="/hindi-labels" element={<HindiLabelGenerator />} />
          <Route path="/promo-signage" element={<PromoSignageGenerator />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
