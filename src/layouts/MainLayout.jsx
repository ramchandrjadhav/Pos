import { Link, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="main-layout">
      <header className="header">
        <div className="header-container">
          <h1 className="logo">Barcode Generator</h1>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`nav-link ${location.pathname === '/generate' ? 'active' : ''}`}
            >
              Generate Barcodes
            </Link>
            <Link 
              to="/hindi-labels" 
              className={`nav-link ${location.pathname === '/hindi-labels' ? 'active' : ''}`}
            >
              Hindi Labels
            </Link>
            <Link 
              to="/promo-signage" 
              className={`nav-link ${location.pathname === '/promo-signage' ? 'active' : ''}`}
            >
              Promo Signage
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Barcode Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;

