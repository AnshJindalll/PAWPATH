"use client"

import type React from "react"

import { useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const quickFilters = [
  { id: "all", label: "All Dogs", active: true },
  { id: "puppies", label: "Puppies", active: false },
  { id: "seniors", label: "Seniors", active: false },
  { id: "special-needs", label: "Special Needs", active: false },
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to adopt page with search query
      window.location.href = `/adopt?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-olive)]/90 to-[var(--secondary-olive)]/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg+xmlns=%22http://www.w3.org/2000/svg%22+viewBox=%220+0+100+100%22%3E%3Cdefs%3E%3Cpattern+id=%22grain%22+width=%22100%22+height=%22100%22+patternUnits=%22userSpaceOnUse%22%3E%3Ccircle+cx=%2225%22+cy=%2225%22+r=%221%22+fill=%22rgba(255,255,255,0.1)%22/%3E%3Ccircle+cx=%2275%22+cy=%2275%22+r=%221%22+fill=%22rgba(255,255,255,0.1)%22/%3E%3Ccircle+cx=%2250%22+cy=%2210%22+r=%220.5%22+fill=%22rgba(255,255,255,0.05)%22/%3E%3Ccircle+cx=%2210%22+cy=%2260%22+r=%220.5%22+fill=%22rgba(255,255,255,0.05)%22/%3E%3Ccircle+cx=%2290%22+cy=%2240%22+r=%220.5%22+fill=%22rgba(255,255,255,0.05)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect+width=%22100%22+height=%22100%22+fill=%22url(%23grain)%22/%3E%3C/svg%3E')] opacity-30" />
        <div className="absolute inset-0 animate-float">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-2000" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">Save Lives,</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-glow">
                Find Love
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto">
              Connect rescue dogs with loving families through our comprehensive adoption platform
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Every dog deserves a second chance. Join thousands of families who have found their perfect companion
              through PawPath.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by breed, location, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 bg-transparent border-none text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/30 h-14 text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-orange hover:bg-orange/90 text-white font-semibold h-14 px-8 rounded-xl transition-all duration-300 hover:shadow-orange-glow"
              >
                <span className="mr-2">Search</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    activeFilter === filter.id
                      ? "bg-white text-[var(--primary-olive)] hover:bg-white/90"
                      : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
