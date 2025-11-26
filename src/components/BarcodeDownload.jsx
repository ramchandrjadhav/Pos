import { useState } from 'react';
import JsBarcode from 'jsbarcode';
import './BarcodeDownload.css';

const BarcodeDownload = ({ barcodeData = [] }) => {
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

  const handleGenerateBarcode = async () => {
    if (!barcodeData || barcodeData.length === 0) {
      alert('No barcode data available. Please provide barcode data.');
      return;
    }

    setIsLoading(true);

    try {
      // Check if File System Access API is supported
      if (!window.showDirectoryPicker) {
        alert('File System Access API is not supported in this browser. Please use Chrome, Edge, or Opera.');
        setIsLoading(false);
        return;
      }

      const directoryHandle = await window.showDirectoryPicker();
      const today = new Date().toISOString().split('T')[0];
      const folderHandle = await directoryHandle.getDirectoryHandle(`Barcodes_${today}`, { create: true });

      for (let index = 0; index < barcodeData.length; index++) {
        const data = barcodeData[index];
        const qty = data.qty || 1;

        if (data && data.grn) {
          const fullSku = data.grn.child_sku;
          const value = fullSku.substring(0, 14);
          const productName = `Product Name: ${data.grn.product_name}`;
          const mrp = `MRP: ₹${parseFloat(data.grn.mrp).toFixed(2)}`;
          const rozanaPrice = `Rozana Price: ₹${parseFloat(data.priceDetail.selling_price).toFixed(2)}`;
          const Size = `Size: ${data.attributes.size ?? ''}`;
          const Color = `Color: ${data.attributes.color ?? ''}`;
          const SupplierName = `Manufactured by: ${data.grn.manufacturer_name}`;
          const NetQuantity = `Net Quantity: ${data.attributes.quantity ?? ''}N`;
          const Maddress = `Manufacturer Address: ${data.grn.manufacturer_address ?? ''}`;
          const Coorigin = `Country of Origin: ${data.grn.country_origin ?? ''}`;
          const manufacturerMonthRaw = data.grn.manufacturer_month ?? '';
          const formattedManufacturerMonth = manufacturerMonthRaw.replace('-', '');
          const Manufacturermonth = `Manufacturing Month: ${formattedManufacturerMonth}`;
          const text = [productName, mrp, rozanaPrice, Color, Size, NetQuantity, SupplierName, Maddress, Coorigin, Manufacturermonth];

          for (let i = 0; i < qty; i++) {
            const barcodeCanvas = document.createElement("canvas");
            JsBarcode(barcodeCanvas, value, {
              width: 2,
              height: 60,
              displayValue: true,
              font: "'Courier New', monospace",
              fontSize: 16,
              textMargin: 2,
              background: "#ffffff",
              lineColor: "#000000",
              format: "CODE128"
            });

            const canvasWidth = 400;
            const titleHeight = 90;
            const lineHeight = 28;
            const ctx = document.createElement('canvas').getContext('2d');
            ctx.font = "18px 'Courier New', monospace";
            let extraHeight = 0;
            text.forEach(line => {
              const wrapped = wrapText(ctx, line, canvasWidth - 20);
              extraHeight += wrapped.length * lineHeight;
              if (line.includes("Rozana Price")) extraHeight += 10;
            });

            const canvasHeight = barcodeCanvas.height + titleHeight + extraHeight + 100;
            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = canvasWidth;
            finalCanvas.height = canvasHeight;
            const fctx = finalCanvas.getContext("2d");

            // White background for entire canvas
            fctx.fillStyle = "#ffffff";
            fctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // "Marketed by" text section
            fctx.fillStyle = "#000";
            fctx.font = "20px 'Montserrat', sans-serif";
            fctx.textAlign = "center";
            fctx.fillText("Marketed by", canvasWidth / 2, 25);
            fctx.fillText("Rozana Rural Commerce Pvt Ltd", canvasWidth / 2, 50);
            fctx.font = "14px 'Montserrat', sans-serif";
            fctx.fillText("Customer Care: 01206089148", canvasWidth / 2, 70);

            fctx.drawImage(barcodeCanvas, (canvasWidth - barcodeCanvas.width) / 2, titleHeight + 10);

            // Set font before wrapping text to ensure accurate measurements
            fctx.font = "18px 'Courier New', monospace";
            let yOffset = titleHeight + barcodeCanvas.height + 30;
            text.forEach(line => {
              const isRozanaPrice = line.includes("Rozana Price");
              const isSize = line.startsWith("Size:");
              const wrappedLines = wrapText(fctx, line, canvasWidth - 20);

              wrappedLines.forEach((wrappedLine, idx) => {
                if (isRozanaPrice && idx === 0) {
                  const textWidth = fctx.measureText(wrappedLine).width;
                  const paddingX = 5;
                  const paddingY = 5;
                  const bgHeight = 22 + paddingY * 2;
                  const bgWidth = textWidth + paddingX * 5;

                  fctx.fillStyle = "#f24b5a";
                  fctx.beginPath();
                  fctx.moveTo(10 + 10, yOffset - 18 - paddingY);
                  fctx.arcTo(10 + bgWidth, yOffset - 18 - paddingY, 10 + bgWidth, yOffset - 18 + bgHeight, 10);
                  fctx.arcTo(10 + bgWidth, yOffset - 18 + bgHeight, 10, yOffset - 18 + bgHeight, 10);
                  fctx.arcTo(10, yOffset - 18 + bgHeight, 10, yOffset - 18 - paddingY, 10);
                  fctx.arcTo(10, yOffset - 18 - paddingY, 10 + bgWidth, yOffset - 18 - paddingY, 10);
                  fctx.closePath();
                  fctx.fill();

                  fctx.fillStyle = "white";
                  fctx.font = "bold 18px 'Courier New', monospace";
                  fctx.fillText(wrappedLine, 15 + paddingX, yOffset);
                } else {
                  fctx.fillStyle = "#000";
                  fctx.font = isSize ? "bold 18px 'Courier New', monospace" : "18px 'Courier New', monospace";
                  fctx.textAlign = "left";
                  fctx.fillText(wrappedLine, 10, yOffset);
                }
                yOffset += lineHeight;
              });

              if (isRozanaPrice) {
                yOffset += 10;
              }
            });

            const blob = await new Promise(resolve => finalCanvas.toBlob(resolve, 'image/jpeg'));
            const fileHandle = await folderHandle.getFileHandle(`Barcode_${value}_Copy_${i + 1}.jpg`, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
          }
        }
      }

      alert('Barcodes saved successfully!');
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
          <h1 className="panel-title">Download Barcodes</h1>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <button
              id="generate-barcode"
              className="btn btn-info"
              onClick={handleGenerateBarcode}
              disabled={isLoading || !barcodeData || barcodeData.length === 0}
            >
              Generate New Folder and Save Barcodes
            </button>
            {(!barcodeData || barcodeData.length === 0) && (
              <p className="error" style={{ marginTop: '10px', color: '#dc3545' }}>
                No barcode data available. Please provide barcode data to generate barcodes.
              </p>
            )}
          </div>
        </div>
        {isLoading && (
          <div id="loader">
            <div id="spinner"></div>
            <div>Barcode is downloading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeDownload;

