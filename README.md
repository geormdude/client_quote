# Tax Quote Generator

A modern web application that analyzes tax returns and generates complexity-based quotes. The application processes Form 1040 tax returns directly in the browser, ensuring data privacy and security.

## Features

- 📄 Secure PDF processing with client-side execution
- 🔒 Privacy-focused (no data leaves your browser)
- 📊 Intelligent tax return complexity analysis
- 💡 Smart detection of income types and tax schedules
- 🎯 Instant quote generation based on return complexity
- 🎨 Modern, responsive UI with real-time processing feedback

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **PDF Processing**: PDF.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite (inferred from modern React setup)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd client_quote
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. Click the upload button or drag and drop your Form 1040 PDF
2. Wait for the automatic analysis to complete
3. Review the complexity assessment and quote
4. Processing status is shown in real-time with progress indicators

## Technical Details

### Tax Return Analysis

The application performs a comprehensive analysis of tax returns, evaluating:

- **Income Sources**
  - W-2 Employment Income
  - 1099-NEC (Self-employment)
  - 1099-DIV (Dividends)
  - 1099-INT (Interest)

- **Tax Schedules**
  - Schedule B (Interest and Dividends)
  - Schedule C (Business Income)
  - Schedule D (Capital Gains)
  - Schedule E (Rental Income)

- **Deductions**
  - Charitable Contributions
  - Mortgage Interest
  - Medical Expenses

### Complexity Scoring

The application uses a sophisticated scoring system:

- Schedule presence (×2 multiplier per schedule)
- Business income (+3 points)
- Rental property (+2 points)
- Investment complexity levels:
  - Complex (+3 points)
  - Moderate (+1 point)
  - Simple (0 points)

Final complexity categories:

- Basic (score ≤ 3)
- Intermediate (score 4-6)
- Advanced (score > 6)

## Security and Privacy

- All processing occurs client-side using PDF.js
- No data is transmitted to any server
- Files are processed in-memory and not stored
- Built-in file validation for type and size

## Project Structure

```
client_quote/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx      # File upload handling
│   │   ├── ProcessingStatus.tsx # Progress indicators
│   │   └── QuoteSummary.tsx    # Results display
│   ├── utils/
│   │   └── pdfProcessor.ts     # PDF analysis logic
│   ├── types/
│   │   └── tax.ts             # TypeScript definitions
│   └── App.tsx                 # Main application
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
