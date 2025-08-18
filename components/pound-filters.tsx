"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface PoundFiltersProps {
  distanceFilter: string
  typeFilter: string
  onDistanceChange: (distance: string) => void
  onTypeChange: (type: string) => void
}

export function PoundFilters({ distanceFilter, typeFilter, onDistanceChange, onTypeChange }: PoundFiltersProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Filter Pounds</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Distance</label>
          <Select value={distanceFilter} onValueChange={onDistanceChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="25">Within 25 miles</SelectItem>
              <SelectItem value="50">Within 50 miles</SelectItem>
              <SelectItem value="100">Within 100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <Select value={typeFilter} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="municipal">Municipal Pounds</SelectItem>
              <SelectItem value="rescue">Rescue Organizations</SelectItem>
              <SelectItem value="shelter">Animal Shelters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
