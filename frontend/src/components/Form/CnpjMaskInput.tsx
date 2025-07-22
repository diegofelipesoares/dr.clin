import { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils"; // se você já usa essa função de classes condicionais

interface CnpjMaskInputProps {
  value?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  name?: string;
  className?: string;
  placeholder?: string;
}

const CnpjMaskInput = forwardRef<HTMLInputElement, CnpjMaskInputProps>(
  ({ value, onChange, name, className, placeholder }, ref) => {
    return (
      <IMaskInput
        mask="00.000.000/0000-00"
        radix="."
        inputRef={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        onAccept={(value) => {
          if (onChange) {
            onChange({ target: { name: name || "", value } });
          }
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      />
    );
  }
);

export default CnpjMaskInput;
