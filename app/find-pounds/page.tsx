"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"
import { InteractiveMap } from "@/components/interactive-map"
import { PoundFilters } from "@/components/pound-filters"
import { PoundsList } from "@/components/pounds-list"
import { samplePounds } from "@/lib/sample-data"
import type { Pound } from "@/types"

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c * 0.621371 // Convert to miles
}

export default function FindPoundsPage() {
  const router = useRouter()
  const [selectedPound, setSelectedPound] = useState<Pound | null>(null)
  const [distanceFilter, setDistanceFilter] = useState("25")
  const [typeFilter, setTypeFilter] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const filteredPounds = samplePounds.filter((pound) => {
    if (typeFilter !== "all" && pound.type !== typeFilter) {
      return false
    }

    // If user location is available, filter by actual distance
    if (userLocation) {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, pound.lat, pound.lng)
      const maxDistance = Number.parseInt(distanceFilter)
      return distance <= maxDistance
    }

    return true
  })

  const handlePoundSelect = (pound: Pound) => {
    setSelectedPound(selectedPound?.id === pound.id ? null : pound)
  }

  const handleViewDogs = (poundId: number) => {
    // Navigate to adopt page with pound filter
    router.push(`/adopt?pound=${poundId}`)
  }

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
        },
        (error) => {
          console.error("Geolocation error:", error)
        },
      )
    }
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHeader title="Find Pounds & Shelters" description="Discover local pounds and shelters near you" />

        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 space-y-6">
              <InteractiveMap
                pounds={filteredPounds}
                selectedPound={selectedPound}
                onPoundSelect={handlePoundSelect}
                onLocateUser={handleLocateUser}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PoundFilters
                distanceFilter={distanceFilter}
                typeFilter={typeFilter}
                onDistanceChange={setDistanceFilter}
                onTypeChange={setTypeFilter}
              />

              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  Pounds & Shelters ({filteredPounds.length})
                  {userLocation && (
                    <span className="text-sm font-normal text-muted-foreground block">
                      Within {distanceFilter} miles of your location
                    </span>
                  )}
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  <PoundsList
                    pounds={filteredPounds}
                    selectedPound={selectedPound}
                    onPoundSelect={handlePoundSelect}
                    onViewDogs={handleViewDogs}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
