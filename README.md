# Barcode Generator

A modern React application for generating and downloading product barcodes with complete product information.

## 🚀 Features

- **Product Barcode Generation**: Create professional barcodes with product details
- **Hindi FMCG Signage Labels**: Generate bilingual (Hindi + English) labels for FMCG products
- **Multiple Label Types**: Support for food, non-food, and fashion product labels
- **Batch Processing**: Generate multiple barcodes at once
- **Easy Download**: Save barcodes in organized folders
- **Responsive Design**: Works on all devices
- **Modern UI**: Beautiful and user-friendly interface

## 📁 Project Structure

This project follows a clean, beginner-friendly architecture:

```
src/
├── components/          # Reusable UI components
│   ├── BarcodeDownload.jsx    # Main barcode generation component
│   ├── BarcodeDownload.css
│   ├── HindiLabelDownload.jsx # Hindi label generation component
│   └── HindiLabelDownload.css
├── data/               # Data files and constants
│   └── sampleData.js          # Sample barcode data
├── layouts/            # Layout components
│   ├── MainLayout.jsx         # Main layout with navigation
│   └── MainLayout.css
├── pages/              # Page components (routes)
│   ├── Home.jsx              # Home page
│   ├── Home.css
│   ├── BarcodeGenerator.jsx  # Barcode generator page
│   ├── BarcodeGenerator.css
│   ├── HindiLabelGenerator.jsx # Hindi label generator page
│   └── HindiLabelGenerator.css
├── App.jsx             # Main app component with routing
├── App.css             # Global app styles
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Technologies Used

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **JsBarcode** - Barcode generation library
- **Noto Sans Devanagari** - Hindi font support for Devanagari script
- **Vite** - Build tool and dev server

## 🇮🇳 Hindi Label Types

The application supports multiple Hindi FMCG signage formats:

1. **Hindi Food Labels** (`hindi_food`) - Food products with Hindi text, expiry dates, and FSSAI license
2. **Hindi Non-Food Labels** (`hindi_nonfood`) - Non-food products with manufacturer details in Hindi
3. **Hindi Fashion Labels** (`hindi_fashion`) - Fashion products with size, color, and quantity in Hindi

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🎯 Routes

- `/` - Home page with features and information
- `/generate` - Barcode generator page
- `/hindi-labels` - Hindi FMCG signage label generator with multiple format options

## 📝 How It Works

1. **Prepare Data**: Organize your product information in the `data/sampleData.js` file
2. **Generate**: Click the generate button on the Barcode Generator page
3. **Download**: Select a folder to save your barcodes (Chrome/Edge/Opera required)

## 🏗️ Architecture Overview

### Components
- **BarcodeDownload**: Handles barcode generation logic and UI
- **HindiLabelDownload**: Handles Hindi FMCG label generation with bilingual support
- **MainLayout**: Provides consistent layout with navigation across pages

### Pages
- **Home**: Landing page with features and instructions
- **BarcodeGenerator**: Main page for generating barcodes
- **HindiLabelGenerator**: Page for generating Hindi FMCG signage labels (food, non-food, fashion)

### Data
- **sampleData.js**: Contains sample product data structure

## 🎨 Styling

- Uses CSS modules for component-specific styles
- Responsive design with mobile-first approach
- Modern gradient designs and smooth animations

## 📚 Learning Resources

This project is structured to help beginners understand:
- React component architecture
- React Router for navigation
- Component composition
- File organization best practices
- CSS styling in React

## 🔧 Customization

To customize barcode data, edit `src/data/sampleData.js` with your product information.

## 📄 License

This project is open source and available for learning purposes.
