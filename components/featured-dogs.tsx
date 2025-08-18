import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { DogCard } from "./dog-card"
import { sampleDogs } from "@/lib/sample-data"

export function FeaturedDogs() {
  const featuredDogs = sampleDogs.slice(0, 6)

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Dogs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet some of our amazing dogs looking for their forever homes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-gradient-olive hover:shadow-olive transition-all duration-300 text-white font-semibold px-8 py-3"
          >
            <Link href="/adopt">
              <span className="mr-2">View All Dogs</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
