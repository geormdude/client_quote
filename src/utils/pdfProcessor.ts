/**
 * Content: PDF Tax Return Processor
 * 
 * Call Graph:
 * processTaxReturn
 * ├── getDocument (PDF.js)
 * ├── getPage
 * ├── getTextContent
 * └── calculateComplexityScore
 */

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

// Initialize PDF.js worker
if (typeof window !== 'undefined' && !import.meta.env?.TEST) {
  GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.mjs';
}

// Custom error types for specific failure scenarios
export class PDFProcessingError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'PDFProcessingError';
  }
}

export interface TaxSummary {
  incomeTypes: string[];
  schedules: string[];
  hasBusinessIncome: boolean;
  hasRentalProperty: boolean;
  investmentComplexity: 'simple' | 'moderate' | 'complex';
  deductionCategories: string[];
  estimatedComplexity: 'basic' | 'intermediate' | 'advanced';
}

/**
 * Processes a tax return PDF file and generates a summary of its contents
 * @param file - The PDF file to process
 * @returns Promise resolving to a TaxSummary object
 * @throws PDFProcessingError if file processing fails
 */
export async function processTaxReturn(file: File): Promise<TaxSummary> {
  try {
    // Validate file type and size
    if (!file.type.includes('pdf')) {
      throw new PDFProcessingError('Invalid file type. Only PDF files are supported.');
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      throw new PDFProcessingError('File size exceeds maximum limit of 50MB.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    // Initialize default summary with type safety
    const summary: TaxSummary = {
      incomeTypes: [],
      schedules: [],
      hasBusinessIncome: false,
      hasRentalProperty: false,
      investmentComplexity: 'simple',
      deductionCategories: [],
      estimatedComplexity: 'basic'
    };

    // Process each page with progress tracking
    const totalPages = pdf.numPages;
    for (let i = 1; i <= totalPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items
          .map((item: TextItem | TextMarkedContent) => {
            if ('str' in item) {
              return item.str;
            }
            return '';
          })
          .filter(Boolean)
          .join(' ');

        // Update summary based on document analysis
        await updateSummaryFromText(summary, text);
        
      } catch (pageError) {
        console.warn(`Warning: Failed to process page ${i}`, pageError);
        // Continue processing other pages
      }
    }

    // Post-process summary
    return finalizeSummary(summary);
    
  } catch (error) {
    if (error instanceof PDFProcessingError) {
      throw error;
    }
    throw new PDFProcessingError(
      'Failed to process tax return PDF',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Updates the tax summary based on text content analysis
 * @param summary - The current tax summary object
 * @param text - The text content to analyze
 */
async function updateSummaryFromText(summary: TaxSummary, text: string): Promise<void> {
  // Schedule detection
  const scheduleMatches = {
    'Schedule C': { flag: 'hasBusinessIncome', complexity: 3 },
    'Schedule E': { flag: 'hasRentalProperty', complexity: 2 },
    'Schedule B': { investmentComplexity: 'moderate' as const },
    'Schedule D': { investmentComplexity: 'complex' as const }
  };

  // Process schedules
  Object.entries(scheduleMatches).forEach(([schedule, impact]) => {
    if (text.includes(schedule)) {
      summary.schedules.push(schedule);
      if ('flag' in impact) {
        summary[impact.flag as keyof Pick<TaxSummary, 'hasBusinessIncome' | 'hasRentalProperty'>] = true;
      }
      if ('investmentComplexity' in impact) {
        summary.investmentComplexity = impact.investmentComplexity;
      }
    }
  });

  // Income type detection
  const incomeTypes = ['W-2', '1099-NEC', '1099-DIV', '1099-INT'];
  incomeTypes.forEach(type => {
    if (text.includes(type)) summary.incomeTypes.push(type);
  });

  // Deduction detection
  const deductions = {
    'Charitable': 'Charitable Contributions',
    'Mortgage Interest': 'Mortgage Interest',
    'Medical': 'Medical Expenses'
  };

  Object.entries(deductions).forEach(([key, value]) => {
    if (text.includes(key)) summary.deductionCategories.push(value);
  });
}

/**
 * Finalizes the tax summary by deduplicating arrays and calculating complexity
 * @param summary - The tax summary to finalize
 * @returns The finalized tax summary
 */
function finalizeSummary(summary: TaxSummary): TaxSummary {
  // Deduplicate arrays
  summary.schedules = Array.from(new Set(summary.schedules));
  summary.incomeTypes = Array.from(new Set(summary.incomeTypes));
  summary.deductionCategories = Array.from(new Set(summary.deductionCategories));

  // Calculate complexity score
  const complexityScore = 
    (summary.schedules.length * 2) +
    (summary.hasBusinessIncome ? 3 : 0) +
    (summary.hasRentalProperty ? 2 : 0) +
    (summary.investmentComplexity === 'complex' ? 3 : 
     summary.investmentComplexity === 'moderate' ? 1 : 0);

  // Determine final complexity
  summary.estimatedComplexity = 
    complexityScore > 6 ? 'advanced' :
    complexityScore > 3 ? 'intermediate' : 'basic';

  return summary;
}