import * as React from "react";

export function Nav({ className, children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={`grid items-start gap-2 ${className}`}>
      {children}
    </nav>
  );
}