import { useState } from 'react';
import HindiLabelDownload from '../components/HindiLabelDownload';
import { sampleBarcodeData } from '../data/sampleData';
import './BarcodeGenerator.css';

const HindiLabelGenerator = () => {
  const [labelType, setLabelType] = useState('hindi_food');

  const labelTypes = [
    { value: 'hindi_food', label: 'Hindi Food Labels' },
    { value: 'hindi_nonfood', label: 'Hindi Non-Food Labels' },
    { value: 'hindi_fashion', label: 'Hindi Fashion Labels' },
  ];

  return (
    <div className="barcode-generator-page">
      <div className="page-header">
        <h1>Hindi FMCG Signage Label Generator</h1>
        <p>Generate and download Hindi labels for your FMCG products</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <label htmlFor="label-type" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Select Label Type:
        </label>
        <select
          id="label-type"
          value={labelType}
          onChange={(e) => setLabelType(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          {labelTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <HindiLabelDownload barcodeData={sampleBarcodeData} labelType={labelType} />
    </div>
  );
};

export default HindiLabelGenerator;

