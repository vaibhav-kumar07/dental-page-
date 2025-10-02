"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface QRCodeDisplayProps {
  url: string
  doctorName: string
}

export function QRCodeDisplay({ url, doctorName }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 300,
          margin: 2,
          color: {
            dark: "#1e40af",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [url])

  const handleDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const link = document.createElement("a")
      link.download = `${doctorName.replace(/\s+/g, "_")}_QR_Code.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} className="border-4 border-blue-100 rounded-lg shadow-lg" />
      <Button onClick={handleDownload} variant="outline" className="w-full bg-transparent">
        <Download className="mr-2 h-4 w-4" />
        Download QR Code
      </Button>
    </div>
  )
}
