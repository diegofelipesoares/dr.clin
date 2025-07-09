// src/components/Form/CpfMaskInput.tsx

import React from 'react';
import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils';

interface CpfMaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
}

const CpfMaskInput = React.forwardRef<HTMLInputElement, CpfMaskInputProps>(
  ({ value, onChange, placeholder, name, className }, ref) => {
    return (
      <IMaskInput
        mask="000.000.000-00"
        value={value}
        onAccept={(val: string) => {
          const event = {
            target: {
              name,
              value: val,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }}
        overwrite
        inputRef={ref}
        placeholder={placeholder ?? '000.000.000-00'}
        name={name}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-sidebar-background px-3 py-2 text-sm',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    );
  }
);

CpfMaskInput.displayName = 'CpfMaskInput';

export default CpfMaskInput;
