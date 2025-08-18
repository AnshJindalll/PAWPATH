"use client"

import { Heart, Calendar, User, Weight, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Dog } from "@/types"



interface DogCardProps {
  dog: Dog
  onContact?: (dogId: number) => void
}

const getTagColor = (index: number) => {
  return index % 3 === 0
    ? "bg-green-600 hover:bg-shadow-olive-700 text-white"
    : "bg-orange-600 hover:bg-orange-700 text-white"
}


export function DogCard({ dog, onContact }: DogCardProps) {
  const handleContact = () => {
    if (onContact) {
      onContact(dog.id)
    } else {
      // Default behavior - show alert
      alert(`Thank you for your interest in ${dog.name}! In a real application, this would open a contact form.`)
    }
  }

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-olive transition-all duration-300 hover:-translate-y-2">
      {/* Dog Image */}
      <div className="relative h-64 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        {dog.urgent && (
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-semibold">Urgent</Badge>
        )}
        <div className="text-8xl group-hover:animate-float">🐕</div>
      </div>

      {/* Dog Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{dog.name}</h3>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="capitalize">{dog.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{dog.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="w-4 h-4" />
              <span>{dog.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{dog.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${getTagColor(0)}`}
            >
              {dog.breed}
            </span>
            {dog.goodWith.map((trait, index) => (
              <span
                key={trait}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${getTagColor(index + 1)}`}
              >
                {trait}
              </span>
            ))}
            {dog.personality.slice(0, 2).map((trait, index) => (
              <span
                key={trait}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${getTagColor(index + dog.goodWith.length + 1)}`}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">{dog.description}</p>
        </div>

        {/* Contact Button */}
        <Button
          onClick={handleContact}
          className="w-full bg-gradient-donate hover:shadow-orange-glow transition-all duration-300 text-white font-semibold"
        >
          <Heart className="w-4 h-4 mr-2" />
          Contact About {dog.name}
        </Button>
      </div>
    </div>
  )
}
