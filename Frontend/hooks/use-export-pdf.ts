import { useState } from "react"
import { exportToPDFSimple } from "@/lib/export-to-pdf-simple"

export function useExportPDF(elementId: string, fileName: string, title: string, companyName?: string) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDFSimple(elementId, fileName, title, companyName)
    } finally {
      setIsExporting(false)
    }
  }

  return { isExporting, handleExport }
}
