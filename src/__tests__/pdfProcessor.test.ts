/**
 * Test suite for PDF Tax Return Processor
 * Tests cover:
 * - File validation
 * - Error handling
 * - Tax form detection
 * - Complexity calculation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processTaxReturn, PDFProcessingError } from '../utils/pdfProcessor';
import { getDocument } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

// Mock PDF.js
vi.mock('pdfjs-dist', () => ({
  getDocument: vi.fn(),
}));

describe('PDF Tax Return Processor', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject non-PDF files', async () => {
    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    await expect(processTaxReturn(file)).rejects.toThrow(PDFProcessingError);
    await expect(processTaxReturn(file)).rejects.toThrow('Invalid file type');
  });

  it('should reject files over size limit', async () => {
    const largeContent = new Array(51 * 1024 * 1024).fill('a').join('');
    const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    await expect(processTaxReturn(file)).rejects.toThrow('File size exceeds maximum limit');
  });

  it('should detect business income from Schedule C', async () => {
    const mockPDFPage = {
      getTextContent: vi.fn().mockResolvedValue({
        items: [
          { str: 'Form 1040' },
          { str: 'Schedule C' },
          { str: 'Business Income' },
        ] as TextItem[],
      }),
    };

    const mockPDF = {
      numPages: 1,
      getPage: vi.fn().mockResolvedValue(mockPDFPage),
    };

    (getDocument as ReturnType<typeof vi.fn>).mockResolvedValue({
      promise: Promise.resolve(mockPDF),
    });

    const file = new File(['dummy pdf content'], 'tax.pdf', { type: 'application/pdf' });
    const result = await processTaxReturn(file);

    expect(result.hasBusinessIncome).toBe(true);
    expect(result.schedules).toContain('Schedule C');
  });

  it('should calculate correct complexity for multiple schedules', async () => {
    const mockPDFPage = {
      getTextContent: vi.fn().mockResolvedValue({
        items: [
          { str: 'Schedule C' },
          { str: 'Schedule E' },
          { str: 'Schedule D' },
        ] as TextItem[],
      }),
    };

    const mockPDF = {
      numPages: 1,
      getPage: vi.fn().mockResolvedValue(mockPDFPage),
    };

    (getDocument as ReturnType<typeof vi.fn>).mockResolvedValue({
      promise: Promise.resolve(mockPDF),
    });

    const file = new File(['dummy pdf content'], 'tax.pdf', { type: 'application/pdf' });
    const result = await processTaxReturn(file);

    expect(result.estimatedComplexity).toBe('advanced');
    expect(result.schedules).toHaveLength(3);
  });

  it('should handle PDF processing errors gracefully', async () => {
    (getDocument as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('PDF processing failed')
    );
    
    const file = new File(['invalid pdf'], 'tax.pdf', { type: 'application/pdf' });
    await expect(processTaxReturn(file)).rejects.toThrow(PDFProcessingError);
  });

  it('should deduplicate detected items', async () => {
    const mockPDFPage = {
      getTextContent: vi.fn().mockResolvedValue({
        items: [
          { str: 'W-2' },
          { str: 'W-2' }, // Duplicate
          { str: 'Schedule C' },
        ] as TextItem[],
      }),
    };

    const mockPDF = {
      numPages: 1,
      getPage: vi.fn().mockResolvedValue(mockPDFPage),
    };

    (getDocument as ReturnType<typeof vi.fn>).mockResolvedValue({
      promise: Promise.resolve(mockPDF),
    });

    const file = new File(['dummy pdf content'], 'tax.pdf', { type: 'application/pdf' });
    const result = await processTaxReturn(file);

    expect(result.incomeTypes).toHaveLength(1);
    expect(result.schedules).toHaveLength(1);
  });
}); 