// src/components/Form/CrmMaskInput.tsx

import React from 'react';
import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils';

interface CrmMaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
}

const CrmMaskInput = React.forwardRef<HTMLInputElement, CrmMaskInputProps>(
  ({ value, onChange, placeholder, name, className }, ref) => {
    return (
      <IMaskInput
        // A máscara permite: "CRM-SP 123456"
        mask="CRM-** 000000"
        definitions={{
          '*': /[A-Za-z]/,
        }}
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
        placeholder={placeholder ?? 'CRM-SP 123456'}
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

CrmMaskInput.displayName = 'CrmMaskInput';

export default CrmMaskInput;
