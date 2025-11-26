import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Barcode Generator</h1>
        <p className="hero-description">
          Generate professional barcodes for your products with ease. 
          Create, customize, and download barcodes in seconds.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/generate" className="cta-button">
            Start Generating Barcodes
          </Link>
          <Link to="/hindi-labels" className="cta-button" style={{ background: '#28a745' }}>
            Generate Hindi Labels
          </Link>
          <Link to="/promo-signage" className="cta-button" style={{ background: '#dc3545' }}>
            Create Promo Signage
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Product Barcodes</h3>
            <p>Generate barcodes with complete product information including name, price, and details.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Easy Download</h3>
            <p>Download multiple barcodes at once in an organized folder structure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Professional Design</h3>
            <p>Beautiful, print-ready barcode labels with all necessary product information.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Efficient</h3>
            <p>Generate multiple barcodes quickly with batch processing capabilities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🇮🇳</div>
            <h3>Hindi Labels</h3>
            <p>Generate FMCG signage labels in Hindi with bilingual support for food, non-food, and fashion products.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Promotional Signage</h3>
            <p>Create eye-catching promotional signage with large price displays, savings information, and bilingual text.</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Prepare Your Data</h3>
              <p>Organize your product information including SKU, name, price, and attributes.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Generate Barcodes</h3>
              <p>Click the generate button and select a folder to save your barcodes.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Download & Print</h3>
              <p>Your barcodes are saved in an organized folder, ready to print and use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

