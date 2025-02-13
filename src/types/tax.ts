export interface TaxSummary {
  incomeTypes: string[];
  schedules: string[];
  hasBusinessIncome: boolean;
  hasRentalProperty: boolean;
  investmentComplexity: 'simple' | 'moderate' | 'complex';
  deductionCategories: string[];
  estimatedComplexity: 'basic' | 'intermediate' | 'advanced';
}

export interface ProcessingStatus {
  stage: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  message: string;
}