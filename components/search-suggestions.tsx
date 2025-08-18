"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Dog, User } from "lucide-react"
import { sampleDogs } from "@/lib/sample-data"

interface SearchSuggestionsProps {
  query: string
  onSuggestionSelect: (suggestion: string) => void
  onClose: () => void
}

export function SearchSuggestions({ query, onSuggestionSelect, onClose }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Array<{ type: string; value: string; icon: any }>>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const breeds = [...new Set(sampleDogs.map((dog) => dog.breed))]
    const locations = [...new Set(sampleDogs.map((dog) => dog.location))]
    const names = sampleDogs.map((dog) => dog.name)

    const newSuggestions: Array<{ type: string; value: string; icon: any }> = []

    // Add breed suggestions
    breeds
      .filter((breed) => breed.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .forEach((breed) => {
        newSuggestions.push({ type: "breed", value: breed, icon: Dog })
      })

    // Add location suggestions
    locations
      .filter((location) => location.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .forEach((location) => {
        newSuggestions.push({ type: "location", value: location, icon: MapPin })
      })

    // Add name suggestions
    names
      .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .forEach((name) => {
        newSuggestions.push({ type: "name", value: name, icon: User })
      })

    setSuggestions(newSuggestions.slice(0, 6))
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  if (suggestions.length === 0) return null

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 bg-white dark:bg-card border border-border rounded-lg shadow-lg z-50 mt-1 max-h-64 overflow-y-auto"
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionSelect(suggestion.value)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors duration-200 text-left"
        >
          <suggestion.icon className="w-4 h-4 text-muted-foreground" />
          <div>
            <span className="text-sm font-medium">{suggestion.value}</span>
            <span className="text-xs text-muted-foreground ml-2 capitalize">({suggestion.type})</span>
          </div>
        </button>
      ))}
    </div>
  )
}
