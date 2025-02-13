declare module 'pdfjs-dist/build/pdf.worker.mjs' {
  const worker: any;
  export default worker;
}

declare module 'pdfjs-dist' {
  import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
  
  interface GetDocumentParameters {
    data: ArrayBuffer;
  }

  interface PDFDocumentLoadingTask {
    promise: Promise<PDFDocumentProxy>;
  }

  export function getDocument(params: GetDocumentParameters): PDFDocumentLoadingTask;
  
  export const GlobalWorkerOptions: {
    workerSrc: any;
  };
} 