import React from 'react';
import { Download, Copy, CheckCircle2 } from 'lucide-react';
import { TaxSummary } from '../types/tax';
import { jsPDF } from 'jspdf';

interface QuoteSummaryProps {
  summary: TaxSummary;
}

export function QuoteSummary({ summary }: QuoteSummaryProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Tax Return Complexity Analysis', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Estimated Complexity: ${summary.estimatedComplexity}`, 20, 40);
    doc.text(`Required Schedules: ${summary.schedules.join(', ')}`, 20, 50);
    doc.text(`Income Types: ${summary.incomeTypes.join(', ')}`, 20, 60);
    doc.text(`Business Income: ${summary.hasBusinessIncome ? 'Yes' : 'No'}`, 20, 70);
    doc.text(`Rental Property: ${summary.hasRentalProperty ? 'Yes' : 'No'}`, 20, 80);
    doc.text(`Investment Complexity: ${summary.investmentComplexity}`, 20, 90);
    doc.text(`Deduction Categories: ${summary.deductionCategories.join(', ')}`, 20, 100);
    
    doc.save('tax-quote-summary.pdf');
  };

  const copyToClipboard = () => {
    const text = `
Tax Return Complexity Analysis
-----------------------------
Estimated Complexity: ${summary.estimatedComplexity}
Required Schedules: ${summary.schedules.join(', ')}
Income Types: ${summary.incomeTypes.join(', ')}
Business Income: ${summary.hasBusinessIncome ? 'Yes' : 'No'}
Rental Property: ${summary.hasRentalProperty ? 'Yes' : 'No'}
Investment Complexity: ${summary.investmentComplexity}
Deduction Categories: ${summary.deductionCategories.join(', ')}
    `.trim();
    
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-primary mb-6">Tax Return Summary</h2>
      
      <div className="space-y-4">
        <div className="bg-brand-secondary p-6 rounded-lg border border-brand-primary/10">
          <h3 className="font-semibold text-brand-primary">Complexity Assessment</h3>
          <p className="mt-1 text-lg">
            <CheckCircle2 className="inline-block mr-2 h-5 w-5 text-brand-primary" />
            {summary.estimatedComplexity.charAt(0).toUpperCase() + summary.estimatedComplexity.slice(1)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-brand-primary">Required Schedules</h3>
            <ul className="mt-1 space-y-1">
              {summary.schedules.map((schedule, index) => (
                <li key={`schedule-${schedule}-${index}`} className="text-gray-600">{schedule}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-brand-primary">Income Types</h3>
            <ul className="mt-1 space-y-1">
              {summary.incomeTypes.map((type, index) => (
                <li key={`income-${type}-${index}`} className="text-gray-600">{type}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-brand-primary">Business Details</h3>
            <p className="mt-1 text-gray-600">
              Business Income: {summary.hasBusinessIncome ? 'Yes' : 'No'}
              <br />
              Rental Property: {summary.hasRentalProperty ? 'Yes' : 'No'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-brand-primary">Investment Profile</h3>
            <p className="mt-1 text-gray-600">
              Complexity: {summary.investmentComplexity}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-brand-primary">Deduction Categories</h3>
          <ul className="mt-1 grid grid-cols-2 gap-2">
            {summary.deductionCategories.map((category, index) => (
              <li key={`deduction-${category}-${index}`} className="text-gray-600">{category}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={generatePDF}
            className="flex items-center px-6 py-3 bg-brand-primary text-brand-accent rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center px-6 py-3 bg-brand-secondary text-brand-primary rounded-lg border border-brand-primary/20 hover:bg-brand-primary/5 transition-colors"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}