import { useState } from 'react';
import './BarcodeDownload.css';

const PromoSignageDownload = ({ barcodeData = [] }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Load Hindi font
  const loadHindiFont = async () => {
    const font = new FontFace(
      'Noto Sans Devanagari',
      'url(https://fonts.gstatic.com/s/notosansdevanagari/v27/TuGoUUFzXI5FBtUq5a8bnKIOdTwQNO_W3fJQeR9hONVhKyhKKqSg.woff2)'
    );
    try {
      await font.load();
      document.fonts.add(font);
    } catch (error) {
      console.warn('Hindi font loading failed, using fallback:', error);
    }
  };

  const handleGenerateSignage = async () => {
    if (!barcodeData || barcodeData.length === 0) {
      alert('No data available. Please provide product data.');
      return;
    }

    setIsLoading(true);

    try {
      // Load Hindi font
      await loadHindiFont();

      // Check if File System Access API is supported
      if (!window.showDirectoryPicker) {
        alert('File System Access API is not supported in this browser. Please use Chrome, Edge, or Opera.');
        setIsLoading(false);
        return;
      }

      const directoryHandle = await window.showDirectoryPicker();
      const today = new Date().toISOString().split('T')[0];
      const folderHandle = await directoryHandle.getDirectoryHandle(`Promo_Signage_${today}`, { create: true });

      for (let index = 0; index < barcodeData.length; index++) {
        const data = barcodeData[index];
        const qty = data.qty || 1;

        if (data && data.grn) {
          const productName = data.grn.product_name || 'Product Name';
          const mrp = parseFloat(data.grn.mrp || 0);
          const sellingPrice = parseFloat(data.priceDetail?.selling_price || 0);
          const savings = mrp - sellingPrice;

          for (let i = 0; i < qty; i++) {
            // Create canvas for promotional signage
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Canvas dimensions - larger for promotional signage
            const canvasWidth = 800;
            const canvasHeight = 600;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // White background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Top: "रोज़ाना प्राइस" (Rozana Price) - Large and centered
            ctx.fillStyle = "#000000";
            ctx.font = "bold 56px 'Noto Sans Devanagari', Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText("रोज़ाना प्राइस", canvasWidth / 2, 30);

            // Main Price: Very Large ₹140 (or selling price) - Most prominent
            const priceValue = sellingPrice.toFixed(0);
            const rupeeSymbol = "₹";
            ctx.font = "bold 200px Arial, sans-serif";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            
            // Draw rupee symbol and price separately for better positioning
            const rupeeX = canvasWidth / 2 - 120;
            const priceY = 160;
            ctx.fillText(rupeeSymbol, rupeeX, priceY);
            
            ctx.fillText(priceValue, canvasWidth / 2 + 20, priceY);

            // Product Name - Below the price, smaller font
            const productText = productName;
            ctx.font = "bold 32px 'Noto Sans Devanagari', Arial, sans-serif";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            
            // Position below price
            const productY = 380;
            ctx.fillText(productText, canvasWidth / 2, productY);

            // Wrap long product names
            const maxWidth = canvasWidth - 60;
            const words = productText.split(' ');
            let line = '';
            let y = productY;
            for (let word of words) {
              const testLine = line + word + ' ';
              const metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && line !== '') {
                ctx.fillText(line, canvasWidth / 2, y);
                line = word + ' ';
                y += 40;
              } else {
                line = testLine;
              }
            }
            if (line) {
              ctx.fillText(line, canvasWidth / 2, y);
            }

            // Bottom Left: MRP with strikethrough
            ctx.font = "32px Arial, sans-serif";
            ctx.fillStyle = "#666666";
            ctx.textAlign = "left";
            const mrpText = `MRP ₹${mrp.toFixed(0)}`;
            
            const mrpX = 60;
            const mrpY = 520;
            
            // Draw text first
            ctx.fillText(mrpText, mrpX, mrpY);
            
            // Draw strikethrough line
            const mrpMetrics = ctx.measureText(mrpText);
            ctx.strokeStyle = "#666666";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(mrpX, mrpY - 18);
            ctx.lineTo(mrpX + mrpMetrics.width, mrpY - 18);
            ctx.stroke();

            // Bottom Right: Savings in Hindi
            ctx.font = "bold 32px 'Noto Sans Devanagari', Arial, sans-serif";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "right";
            const savingsText = `आपकी बचत ₹${savings.toFixed(0)}`;
            ctx.fillText(savingsText, canvasWidth - 60, mrpY);

            // Save file
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1.0));
            const fileName = `Promo_Signage_${productName.replace(/[^a-zA-Z0-9]/g, '_')}_${i + 1}.jpg`;
            const fileHandle = await folderHandle.getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
          }
        }
      }

      alert('Promotional Signage saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      if (error.name !== 'AbortError') {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="barcode-download-container">
      <div className="panel">
        <div className="panel-heading">
          <h1 className="panel-title">Promotional Signage Generator</h1>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Generate promotional signage with large price display and savings
          </p>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <button
              className="btn btn-info"
              onClick={handleGenerateSignage}
              disabled={isLoading || !barcodeData || barcodeData.length === 0}
            >
              Generate Promotional Signage
            </button>
            {(!barcodeData || barcodeData.length === 0) && (
              <p className="error" style={{ marginTop: '10px', color: '#dc3545' }}>
                No data available. Please provide product data to generate signage.
              </p>
            )}
          </div>
          
          {/* Preview of format */}
          <div style={{
            marginTop: '20px',
            padding: '20px',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            background: '#f9f9f9',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Preview Format:</h3>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              padding: '30px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#000' }}>
                रोज़ाना प्राइस
              </div>
              <div style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '10px', color: '#000' }}>
                ₹140
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
                Product Name
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ textDecoration: 'line-through', color: '#666' }}>MRP ₹170</span>
                <span style={{ fontWeight: 'bold', color: '#000' }}>आपकी बचत ₹30</span>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div id="loader">
            <div id="spinner"></div>
            <div>Signage is generating...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoSignageDownload;

