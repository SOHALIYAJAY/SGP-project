"use client"

import React from 'react'
import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SimpleStatusCardProps {
  title: string
  description: string
  metrics: string[]
  status: "success" | "warning" | "risk" | "error" | "neutral"
  icon: LucideIcon
  delay?: number
  className?: string
}

const STATUS_CONFIG = {
  success: {
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    descriptionColor: "text-green-700"
  },
  warning: {
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    descriptionColor: "text-amber-700"
  },
  risk: {
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    descriptionColor: "text-orange-700"
  },
  error: {
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    descriptionColor: "text-red-700"
  },
  neutral: {
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700"
  }
}

export function SimpleStatusCard({
  title,
  description,
  metrics,
  status,
  icon: Icon,
  delay = 0,
  className
}: SimpleStatusCardProps) {
  const config = STATUS_CONFIG[status]

  return (
    <Card 
      className={cn(
        "border-2 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in-up",
        config.bgColor,
        config.borderColor,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${config.iconColor} bg-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold text-lg mb-2 ${config.titleColor}`}>
              {title}
            </h3>
            <p className={`text-sm mb-4 ${config.descriptionColor}`}>
              {description}
            </p>
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className={`text-xs p-2 rounded-md bg-white bg-opacity-70 ${config.titleColor} font-medium`}
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
