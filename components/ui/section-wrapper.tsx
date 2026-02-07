"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function SectionWrapper({
  title,
  description,
  actions,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold leading-none">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div>{children}</div>
    </section>
  )
}
