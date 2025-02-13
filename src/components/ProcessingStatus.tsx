import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { ProcessingStatus as Status } from '../types/tax';

interface ProcessingStatusProps {
  status: Status;
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-soft">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-brand-primary">
          {status.message}
        </span>
        <span className="text-sm text-gray-500">
          {status.progress}%
        </span>
      </div>
      <Progress.Root
        className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
        value={status.progress}
      >
        <Progress.Indicator
          className="h-full bg-brand-primary transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${100 - status.progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
}