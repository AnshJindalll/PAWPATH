"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "lucide-react"
import { Button } from "./ui/button"
import type { Pound } from "@/types"

interface InteractiveMapProps {
  pounds: Pound[]
  selectedPound: Pound | null
  onPoundSelect: (pound: Pound) => void
  onLocateUser: () => void
}

export function InteractiveMap({ pounds, selectedPound, onPoundSelect, onLocateUser }: InteractiveMapProps) {
  const [mapView, setMapView] = useState<"roadmap" | "satellite">("roadmap")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      if (!(window as any).L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.onload = () => setIsMapLoaded(true)
        document.head.appendChild(script)
      } else {
        setIsMapLoaded(true)
      }
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || mapInstanceRef.current) return

    const L = (window as any).L

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 6)

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    mapInstanceRef.current = map

    const colors = ["#6b7c32", "#e87a5d", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

    pounds.forEach((pound, index) => {
      const color = colors[index % colors.length]

      // Create custom marker with colored circle and number
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">${index + 1}</div>
        `,
        className: "custom-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })

      const marker = L.marker([pound.lat, pound.lng], { icon: customIcon }).addTo(map)

      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="
              background-color: ${color};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 12px;
              margin-right: 8px;
            ">${index + 1}</div>
            <strong style="font-size: 16px;">${pound.name}</strong>
          </div>
          <div style="margin-bottom: 4px;">📍 ${pound.address}</div>
          <div style="margin-bottom: 4px;">📞 ${pound.phone}</div>
          <div style="color: ${color}; font-weight: bold;">🐕 ${pound.availableDogs} dogs available</div>
        </div>
      `

      marker.bindPopup(popupContent)
      marker.on("click", () => onPoundSelect(pound))

      if (selectedPound?.id === pound.id) {
        marker.openPopup()
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isMapLoaded, pounds, selectedPound])

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)

          if (mapInstanceRef.current) {
            const L = (window as any).L

            const userIcon = L.divIcon({
              html: `
                <div style="
                  background-color: #3b82f6;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  animation: pulse 2s infinite;
                "></div>
                <style>
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                  }
                </style>
              `,
              className: "user-location-marker",
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })

            L.marker([location.lat, location.lng], { icon: userIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup("📍 Your Location")
              .openPopup()

            mapInstanceRef.current.setView([location.lat, location.lng], 10)
          }

          onLocateUser()
        },
        (error) => {
          console.error("Geolocation error:", error)
          alert("Unable to get your location.")
        },
      )
    }
  }

  return (
    <div className="relative h-96 md:h-[500px] bg-muted rounded-2xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600 mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-[1000]">
        <Button onClick={handleLocateUser} size="sm" className="bg-white/90 text-olive-600 hover:bg-white shadow-lg">
          <Navigation className="w-4 h-4 mr-2" />
          Find Near Me
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-h-32 overflow-y-auto">
        <h4 className="font-semibold text-sm mb-2">Pound Locations</h4>
        <div className="space-y-1">
          {pounds.slice(0, 5).map((pound, index) => {
            const colors = ["#6b7c32", "#e87a5d", "#10b981", "#f59e0b", "#ef4444"]
            const color = colors[index % colors.length]
            return (
              <div key={pound.id} className="flex items-center gap-2 text-xs">
                <div
                  style={{
                    backgroundColor: color,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </div>
                <span className="truncate max-w-32">{pound.name}</span>
              </div>
            )
          })}
          {pounds.length > 5 && <div className="text-xs text-muted-foreground">+{pounds.length - 5} more</div>}
        </div>
      </div>
    </div>
  )
}
