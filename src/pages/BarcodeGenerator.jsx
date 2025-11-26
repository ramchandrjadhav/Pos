import BarcodeDownload from '../components/BarcodeDownload';
import { sampleBarcodeData } from '../data/sampleData';
import './BarcodeGenerator.css';

const BarcodeGenerator = () => {
  return ( 
    <div className="barcode-generator-page">
      <div className="page-header">
        <h1>Barcode Generator</h1>
        <p>Generate and download barcodes for your products</p>
      </div>
      <BarcodeDownload barcodeData={sampleBarcodeData} />
    </div>
  );
};

export default BarcodeGenerator;

