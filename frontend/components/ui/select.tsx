"use client"

import * as React from "react"

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`h-10 w-full rounded-md border border-input bg-background px-3 text-sm ${className}`}
      {...props}
    />
  )
}

export { Select }
