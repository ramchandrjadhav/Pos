import PromoSignageDownload from '../components/PromoSignageDownload';
import { sampleBarcodeData } from '../data/sampleData';
import './BarcodeGenerator.css';

const PromoSignageGenerator = () => {
  return (
    <div className="barcode-generator-page">
      <div className="page-header">
        <h1>Promotional Signage Generator</h1>
        <p>Generate promotional signage with large price display, product name, and savings information</p>
      </div>
      <PromoSignageDownload barcodeData={sampleBarcodeData} />
    </div>
  );
};

export default PromoSignageGenerator;

