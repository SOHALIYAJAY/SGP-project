"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground/70 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-[rgba(26,37,64,0.6)] border-[rgba(255,255,255,0.06)] text-[#F0F4F8]",
          "hover:bg-[rgba(26,37,64,0.8)] hover:border-[rgba(255,255,255,0.1)]",
          "focus:outline-none focus:bg-[rgba(26,37,64,0.9)] focus:border-[rgba(14,165,233,0.4)]",
          "focus:shadow-[0_0_0_3px_rgba(14,165,233,0.08),inset_0_0_12px_rgba(14,165,233,0.05)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
