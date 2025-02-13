import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock the window.Worker
class MockWorker implements Worker {
  onmessage: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null = null;
  
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  postMessage(message: any): void {
    // Mock implementation
    if (this.onmessage) {
      this.onmessage.call(this, new MessageEvent('message', { data: message }));
    }
  }
  
  terminate(): void {
    // Mock implementation
  }

  addEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    // Mock implementation
  }
  
  removeEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    // Mock implementation
  }

  dispatchEvent(event: Event): boolean {
    return true;
  }
}

// Setup global mocks
Object.defineProperty(window, 'Worker', {
  writable: true,
  value: MockWorker
});

// Mock PDF.js worker
vi.mock('pdfjs-dist/build/pdf.worker.mjs', () => ({})); 