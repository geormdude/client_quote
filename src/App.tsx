import React from 'react';
import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { QuoteSummary } from './components/QuoteSummary';
import { ProcessingStatus as Status, TaxSummary } from './types/tax';
import { processTaxReturn } from './utils/pdfProcessor';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<Status>({
    stage: 'idle',
    progress: 0,
    message: 'Ready to process your tax return'
  });
  const [summary, setSummary] = useState<TaxSummary | null>(null);

  const handleFile = async (file: File) => {
    try {
      setStatus({
        stage: 'uploading',
        progress: 20,
        message: 'Reading file...'
      });

      setStatus({
        stage: 'processing',
        progress: 40,
        message: 'Analyzing tax return...'
      });

      const result = await processTaxReturn(file);

      setStatus({
        stage: 'complete',
        progress: 100,
        message: 'Analysis complete!'
      });

      setSummary(result);
    } catch (error) {
      setStatus({
        stage: 'error',
        progress: 0,
        message: 'Error processing file. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary">
      <header className="bg-brand-primary py-6 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-brand-accent mb-4">
            Tax Quote Generator
          </h1>
          <p className="text-lg text-brand-accent/90 mb-6">
            Upload your previous year's Form 1040 to receive an instant quote
          </p>
          <div className="inline-flex items-center text-sm text-brand-primary bg-brand-accent px-6 py-3 rounded-full shadow-soft">
            <ShieldCheck className="h-5 w-5 text-brand-primary mr-2" />
            Your data is processed securely in your browser
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {status.stage !== 'complete' && (
          <div className="mb-8">
            <FileUpload
              onFileSelect={handleFile}
              disabled={status.stage === 'processing'}
            />
          </div>
        )}

        {status.stage !== 'idle' && (
          <div className="mb-8">
            <ProcessingStatus status={status} />
          </div>
        )}

        {summary && <QuoteSummary summary={summary} />}
      </main>
    </div>
  );
}

export default App;
