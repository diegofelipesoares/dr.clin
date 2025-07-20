// src/components/Form/DataMaskInput.tsx
import React from 'react';
import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils';

interface DataMaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
}

const DataMaskInput = React.forwardRef<HTMLInputElement, DataMaskInputProps>(
  ({ value, onChange, placeholder, name, className }, ref) => {
    return (
      <IMaskInput
        mask='00/00/0000'
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
        placeholder={placeholder ?? 'dd/mm/aaaa'}
        name={name}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      />
    );
  },
);

DataMaskInput.displayName = 'DataMaskInput';

export default DataMaskInput;
