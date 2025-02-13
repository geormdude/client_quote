import * as pdfjsLib from 'pdfjs-dist';
import { TaxSummary } from '../types/tax';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

if (typeof window !== 'undefined' && 'Worker' in window) {
  GlobalWorkerOptions.workerPort = new Worker(
    new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url),
    { type: 'module' }
  );
}

export async function processTaxReturn(file: File): Promise<TaxSummary> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  
  // Initialize default summary
  const summary: TaxSummary = {
    incomeTypes: [],
    schedules: [],
    hasBusinessIncome: false,
    hasRentalProperty: false,
    investmentComplexity: 'simple',
    deductionCategories: [],
    estimatedComplexity: 'basic'
  };

  // Process each page
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(' ');

    // Analyze content and update summary
    if (text.includes('Schedule C')) {
      summary.hasBusinessIncome = true;
      summary.schedules.push('Schedule C');
    }
    if (text.includes('Schedule E')) {
      summary.hasRentalProperty = true;
      summary.schedules.push('Schedule E');
    }
    if (text.includes('Schedule B')) {
      summary.investmentComplexity = 'moderate';
      summary.schedules.push('Schedule B');
    }
    if (text.includes('Schedule D')) {
      summary.investmentComplexity = 'complex';
      summary.schedules.push('Schedule D');
    }
    
    // Detect income types
    if (text.includes('W-2')) summary.incomeTypes.push('W-2');
    if (text.includes('1099-NEC')) summary.incomeTypes.push('1099-NEC');
    if (text.includes('1099-DIV')) summary.incomeTypes.push('1099-DIV');
    if (text.includes('1099-INT')) summary.incomeTypes.push('1099-INT');
    
    // Detect deduction categories
    if (text.includes('Charitable')) summary.deductionCategories.push('Charitable Contributions');
    if (text.includes('Mortgage Interest')) summary.deductionCategories.push('Mortgage Interest');
    if (text.includes('Medical')) summary.deductionCategories.push('Medical Expenses');
  }

  // Calculate estimated complexity
  // Deduplicate arrays to prevent React key warnings
  summary.schedules = Array.from(new Set(summary.schedules));
  summary.incomeTypes = Array.from(new Set(summary.incomeTypes));
  summary.deductionCategories = Array.from(new Set(summary.deductionCategories));

  const complexityScore = 
    (summary.schedules.length * 2) +
    (summary.hasBusinessIncome ? 3 : 0) +
    (summary.hasRentalProperty ? 2 : 0) +
    (summary.investmentComplexity === 'complex' ? 3 : 
     summary.investmentComplexity === 'moderate' ? 1 : 0);

  summary.estimatedComplexity = 
    complexityScore > 6 ? 'advanced' :
    complexityScore > 3 ? 'intermediate' : 'basic';

  return summary;
}