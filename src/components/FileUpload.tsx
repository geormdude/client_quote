import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileSelect, disabled }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled,
    onDrop: files => files[0] && onFileSelect(files[0])
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-12 border-2 border-dashed rounded-xl text-center cursor-pointer
        transition-colors duration-200 ease-in-out
        bg-white shadow-soft
        ${isDragActive ? 'border-brand-primary bg-brand-secondary' : 'border-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-primary hover:bg-brand-secondary'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-16 w-16 text-brand-primary mb-6" />
      <p className="text-xl font-medium text-brand-primary">
        {isDragActive ? 'Drop your tax return here' : 'Drag & drop your tax return'}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        or click to select a PDF file
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Only Form 1040 PDF files are supported
      </p>
    </div>
  );
}