import { useState } from 'react';
import JsBarcode from 'jsbarcode';
import './BarcodeDownload.css';

const HindiLabelDownload = ({ barcodeData = [], labelType = 'hindi_food' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  };

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

  const getLabelText = (data, type) => {
    const productName = data.grn?.product_name || 'Product Name';
    const mrp = parseFloat(data.grn?.mrp || 0).toFixed(2);
    const sellingPrice = parseFloat(data.priceDetail?.selling_price || 0).toFixed(2);
    const expiryDate = data.grn?.expiry_date || 'NAN';
    const manufacturedDate = data.grn?.manufactured_date || 'NAN';
    const manufacturerName = data.grn?.manufacturer_name || '';
    const manufacturerAddress = data.grn?.manufacturer_address || '';
    const countryOrigin = data.grn?.country_origin || '';
    const size = data.attributes?.size || '';
    const color = data.attributes?.color || '';
    const quantity = data.attributes?.quantity || '';

    switch (type) {
      case 'hindi_food':
        return [
          `उत्पाद का नाम: ${productName}`,
          `Product Name: ${productName}`,
          `MRP: ₹${mrp}`,
          `विक्रय मूल्य: ₹${sellingPrice}`,
          `P.K.D: ${manufacturedDate}`,
          `उपयोग करने की अंतिम तिथि: ${expiryDate}`,
          `ग्राहक सेवा: 01206089148`,
          `FSSAI लाइसेंस नंबर: 135210010`,
        ];
      
      case 'hindi_nonfood':
        return [
          `उत्पाद का नाम: ${productName}`,
          `Product Name: ${productName}`,
          `MRP: ₹${mrp}`,
          `विक्रय मूल्य: ₹${sellingPrice}`,
          `निर्माता: ${manufacturerName}`,
          `निर्माता का पता: ${manufacturerAddress}`,
          `मूल देश: ${countryOrigin}`,
          `ग्राहक सेवा: 01206089148`,
        ];
      
      case 'hindi_fashion':
        return [
          `उत्पाद का नाम: ${productName}`,
          `Product Name: ${productName}`,
          `MRP: ₹${mrp}`,
          `रोज़ाना मूल्य: ₹${sellingPrice}`,
          `आकार: ${size}`,
          `रंग: ${color}`,
          `शुद्ध मात्रा: ${quantity}N`,
          `निर्माता: ${manufacturerName}`,
          `निर्माता का पता: ${manufacturerAddress}`,
          `मूल देश: ${countryOrigin}`,
        ];
      
      default:
        return [
          `उत्पाद का नाम: ${productName}`,
          `MRP: ₹${mrp}`,
          `विक्रय मूल्य: ₹${sellingPrice}`,
        ];
    }
  };

  const handleGenerateLabel = async () => {
    if (!barcodeData || barcodeData.length === 0) {
      alert('No label data available. Please provide label data.');
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
      const folderName = `Hindi_Labels_${labelType}_${today}`;
      const folderHandle = await directoryHandle.getDirectoryHandle(folderName, { create: true });

      for (let index = 0; index < barcodeData.length; index++) {
        const data = barcodeData[index];
        const qty = data.qty || 1;

        if (data && data.grn) {
          const fullSku = data.grn.child_sku;
          const value = fullSku ? fullSku.substring(0, 14) : `SKU${index}`;
          const text = getLabelText(data, labelType);

          for (let i = 0; i < qty; i++) {
            // Generate barcode
            const barcodeCanvas = document.createElement("canvas");
            JsBarcode(barcodeCanvas, value, {
              format: "CODE128",
              width: 3,
              height: 100,
              displayValue: true,
            });

            // Create combined canvas
            const combinedCanvas = document.createElement("canvas");
            const ctx = combinedCanvas.getContext("2d");

            const lineHeight = 30;
            const extraHeight = (text.length + 2) * lineHeight;
            const canvasWidth = 600;
            const canvasHeight = barcodeCanvas.height + extraHeight;

            combinedCanvas.width = canvasWidth * 1.5;
            combinedCanvas.height = canvasHeight * 1.5;
            ctx.scale(1.5, 1.5);

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";

            // Title with Hindi font
            ctx.font = "bold 24px 'Noto Sans Devanagari', Arial, sans-serif";
            const title = "Rozana Rural Commerce Pvt Ltd";
            ctx.fillText(title, canvasWidth / 2, 30);

            // Draw barcode
            ctx.drawImage(barcodeCanvas, (canvasWidth - barcodeCanvas.width) / 2, 50);

            // Draw text with appropriate fonts
            let yOffset = barcodeCanvas.height + 70;
            text.forEach((line) => {
              // Check if line contains Hindi characters
              const hasHindi = /[\u0900-\u097F]/.test(line);
              
              if (hasHindi) {
                ctx.font = "20px 'Noto Sans Devanagari', Arial, sans-serif";
              } else {
                ctx.font = "20px 'Courier New', monospace";
              }
              
              yOffset = wrapText(ctx, line, canvasWidth / 2, yOffset, canvasWidth - 20, lineHeight);
            });

            // Save file
            const blob = await new Promise(resolve => combinedCanvas.toBlob(resolve, 'image/jpeg', 1.0));
            const fileHandle = await folderHandle.getFileHandle(
              `Hindi_Label_${value}_Copy_${i + 1}.jpg`,
              { create: true }
            );
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
          }
        }
      }

      alert('Hindi Labels saved successfully!');
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
          <h1 className="panel-title">
            {labelType === 'hindi_food' && 'Hindi Food Labels'}
            {labelType === 'hindi_nonfood' && 'Hindi Non-Food Labels'}
            {labelType === 'hindi_fashion' && 'Hindi Fashion Labels'}
          </h1>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <button
              className="btn btn-info"
              onClick={handleGenerateLabel}
              disabled={isLoading || !barcodeData || barcodeData.length === 0}
            >
              Generate New Folder and Save Hindi Labels
            </button>
            {(!barcodeData || barcodeData.length === 0) && (
              <p className="error" style={{ marginTop: '10px', color: '#dc3545' }}>
                No label data available. Please provide label data to generate labels.
              </p>
            )}
          </div>
        </div>
        {isLoading && (
          <div id="loader">
            <div id="spinner"></div>
            <div>Labels are downloading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HindiLabelDownload;

