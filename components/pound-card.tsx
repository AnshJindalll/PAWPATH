"use client"

import { MapPin, Phone, Clock, Dog } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Pound } from "@/types"

interface PoundCardProps {
  pound: Pound
  isSelected?: boolean
  onSelect: (pound: Pound) => void
  onViewDogs: (poundId: number) => void
}

export function PoundCard({ pound, isSelected, onSelect, onViewDogs }: PoundCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "municipal":
        return "bg-blue-100 text-blue-800"
      case "rescue":
        return "bg-green-100 text-green-800"
      case "shelter":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "municipal":
        return "Municipal Pound"
      case "rescue":
        return "Rescue Organization"
      case "shelter":
        return "Animal Shelter"
      default:
        return "Unknown"
    }
  }

  return (
    <div
      className={`bg-card rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-olive hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-olive shadow-olive" : ""
      }`}
      onClick={() => onSelect(pound)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-foreground">{pound.name}</h3>
          <Badge className={getTypeColor(pound.type)}>{getTypeLabel(pound.type)}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{pound.address}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{pound.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{pound.hours}</span>
          </div>

          <div className="flex items-center gap-3">
            <Dog className="w-4 h-4 flex-shrink-0 text-olive" />
            <span className="text-sm font-medium text-olive">{pound.availableDogs} dogs available</span>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            onViewDogs(pound.id)
          }}
          className="w-full bg-gradient-olive hover:shadow-olive transition-all duration-300 text-white font-semibold"
        >
          View Available Dogs
        </Button>
      </div>
    </div>
  )
}
