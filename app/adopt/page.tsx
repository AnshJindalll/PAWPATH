"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"
import { DogFilters } from "@/components/dog-filters"
import { DogsGrid } from "@/components/dogs-grid"
import { sampleDogs } from "@/lib/sample-data"
import type { FilterOptions } from "@/types"

export default function AdoptPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterOptions>({})
  const [searchQuery, setSearchQuery] = useState("")

  // Get search query from URL params
  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters({})
    setSearchQuery("")
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHeader
          title="Adopt a Dog"
          description="Find your perfect companion from our network of trusted pounds and shelters"
        />

        <div className="container mx-auto px-4 pb-20">
          <DogFilters filters={filters} onFiltersChange={handleFiltersChange} onReset={handleReset} />

          <DogsGrid dogs={sampleDogs} filters={filters} searchQuery={searchQuery} />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
