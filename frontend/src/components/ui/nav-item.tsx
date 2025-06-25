// src/components/ui/nav-item.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItemVariants = cva(
  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground",
      },
    },
  }
);

export function NavItem({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={cn(navItemVariants({ active: isActive }))}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}
