"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { DogCard } from "./dog-card"
import type { Dog, FilterOptions } from "@/types"

interface DogsGridProps {
  dogs: Dog[]
  filters: FilterOptions
  searchQuery?: string
}

export function DogsGrid({ dogs, filters, searchQuery }: DogsGridProps) {
  const [displayedDogs, setDisplayedDogs] = useState<Dog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const dogsPerPage = 12

  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          dog.name.toLowerCase().includes(query) ||
          dog.breed.toLowerCase().includes(query) ||
          dog.location.toLowerCase().includes(query) ||
          dog.description.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Apply filters
      if (filters.location && !dog.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.breed && !dog.breed.toLowerCase().includes(filters.breed.toLowerCase())) return false
      if (filters.age && dog.age !== filters.age) return false
      if (filters.size && dog.size !== filters.size) return false
      if (filters.gender && dog.gender !== filters.gender) return false
      if (filters.color && !dog.color.toLowerCase().includes(filters.color.toLowerCase())) return false
      if (filters.compatibility && !dog.goodWith.includes(filters.compatibility)) return false
      if (filters.energy && dog.energy !== filters.energy) return false

      return true
    })
  }, [dogs, filters, searchQuery])

  // Update displayed dogs when filters change
  useEffect(() => {
    setCurrentPage(1)
    setDisplayedDogs(filteredDogs.slice(0, dogsPerPage))
  }, [filteredDogs, dogsPerPage])

  const loadMore = () => {
    const nextPage = currentPage + 1
    const startIndex = currentPage * dogsPerPage
    const endIndex = startIndex + dogsPerPage
    const newDogs = filteredDogs.slice(startIndex, endIndex)

    setDisplayedDogs([...displayedDogs, ...newDogs])
    setCurrentPage(nextPage)
  }

  const hasMore = displayedDogs.length < filteredDogs.length

  if (filteredDogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-2xl font-bold mb-2">No dogs found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Count */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Showing {displayedDogs.length} of {filteredDogs.length} dogs
        </p>
      </div>

      {/* Dogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedDogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            variant="outline"
            className="px-8 py-3 border-olive text-olive hover:bg-olive hover:text-white transition-all duration-300 bg-transparent"
          >
            <span className="mr-2">Load More Dogs</span>
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
