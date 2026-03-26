"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export function ConditionalFooter() {
  const pathname = usePathname()
  
  const showFooter = pathname === "/" || pathname === "/company-input"
  
  if (!showFooter) return null
  
  return <Footer />
}
