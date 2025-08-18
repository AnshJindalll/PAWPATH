"use client"

import type { Pound } from "@/types"
import { PoundCard } from "./pound-card"

interface PoundsListProps {
  pounds: Pound[]
  selectedPound: Pound | null
  onPoundSelect: (pound: Pound) => void
  onViewDogs: (poundId: number) => void
}

export function PoundsList({ pounds, selectedPound, onPoundSelect, onViewDogs }: PoundsListProps) {
  if (pounds.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🏢</div>
        <h3 className="text-xl font-bold mb-2">No pounds found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pounds.map((pound) => (
        <PoundCard
          key={pound.id}
          pound={pound}
          isSelected={selectedPound?.id === pound.id}
          onSelect={onPoundSelect}
          onViewDogs={onViewDogs}
        />
      ))}
    </div>
  )
}
