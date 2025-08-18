"use client"

import { useState } from "react"
import {
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
  Dog,
  Calendar,
  Weight,
  User,
  Palette,
  Home,
  Zap,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import type { FilterOptions } from "@/types"

interface DogFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onReset: () => void
}

export function DogFilters({ filters, onFiltersChange, onReset }: DogFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg mb-8">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Filter className="w-6 h-6 text-olive" />
          Find Your Perfect Match
        </h3>
        <Button variant="outline" onClick={onReset} className="flex items-center gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-olive" />
            Location
          </label>
          <Input
            placeholder="Enter city or zip code"
            value={filters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Dog className="w-4 h-4 text-olive" />
            Breed
          </label>
          <Select value={filters.breed || "any"} onValueChange={(value) => updateFilter("breed", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any Breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Breed</SelectItem>
              <SelectItem value="labrador">Labrador Retriever</SelectItem>
              <SelectItem value="golden">Golden Retriever</SelectItem>
              <SelectItem value="german-shepherd">German Shepherd</SelectItem>
              <SelectItem value="bulldog">Bulldog</SelectItem>
              <SelectItem value="beagle">Beagle</SelectItem>
              <SelectItem value="mixed">Mixed Breed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-olive" />
            Age
          </label>
          <Select value={filters.age || "any"} onValueChange={(value) => updateFilter("age", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Age</SelectItem>
              <SelectItem value="puppy">Puppy (0-1 year)</SelectItem>
              <SelectItem value="young">Young (1-3 years)</SelectItem>
              <SelectItem value="adult">Adult (3-7 years)</SelectItem>
              <SelectItem value="senior">Senior (7+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Weight className="w-4 h-4 text-olive" />
            Size
          </label>
          <Select value={filters.size || "any"} onValueChange={(value) => updateFilter("size", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Size</SelectItem>
              <SelectItem value="Small">Small (0-25 lbs)</SelectItem>
              <SelectItem value="Medium">Medium (25-60 lbs)</SelectItem>
              <SelectItem value="Large">Large (60-100 lbs)</SelectItem>
              <SelectItem value="Extra Large">Extra Large (100+ lbs)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-olive hover:text-olive/80"
        >
          <span>Advanced Filters</span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-olive" />
              Gender
            </label>
            <Select value={filters.gender || "any"} onValueChange={(value) => updateFilter("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Gender</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4 text-olive" />
              Color
            </label>
            <Select value={filters.color || "any"} onValueChange={(value) => updateFilter("color", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Color</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
                <SelectItem value="Brown">Brown</SelectItem>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Golden">Golden</SelectItem>
                <SelectItem value="Mixed">Mixed Colors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Home className="w-4 h-4 text-olive" />
              Good with
            </label>
            <Select
              value={filters.compatibility || "any"}
              onValueChange={(value) => updateFilter("compatibility", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="No Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">No Preference</SelectItem>
                <SelectItem value="Children">Children</SelectItem>
                <SelectItem value="Dogs">Other Dogs</SelectItem>
                <SelectItem value="Cats">Cats</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-olive" />
              Energy Level
            </label>
            <Select value={filters.energy || "any"} onValueChange={(value) => updateFilter("energy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Energy Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Energy Level</SelectItem>
                <SelectItem value="low">Low Energy</SelectItem>
                <SelectItem value="moderate">Moderate Energy</SelectItem>
                <SelectItem value="high">High Energy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
