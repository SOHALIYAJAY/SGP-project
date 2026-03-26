import { useState } from "react"
import { exportToPDF } from "@/lib/export-to-pdf"

export function useExportPDF(elementId: string, fileName: string, title: string, companyName?: string) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(elementId, fileName, title, companyName)
    } finally {
      setIsExporting(false)
    }
  }

  return { isExporting, handleExport }
}
