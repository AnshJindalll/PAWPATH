"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Calendar, User, Weight, MapPin, Share2 } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Dog } from "@/types"

interface EnhancedDogCardProps {
  dog: Dog
  onContact?: (dogId: number) => void
}

export function EnhancedDogCard({ dog, onContact }: EnhancedDogCardProps) {
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleContact = () => {
    if (onContact) {
      onContact(dog.id)
    } else {
      toast({
        title: `Interested in ${dog.name}?`,
        description: "In a real application, this would open a contact form with the shelter.",
      })
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? `${dog.name} removed from your favorites` : `${dog.name} added to your favorites`,
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: `Meet ${dog.name}`,
        text: `${dog.name} is a ${dog.age} ${dog.breed} looking for a loving home!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Share this dog's profile with friends and family.",
      })
    }
  }

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-olive transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dog Image */}
      <div className="relative h-64 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
        {dog.urgent && (
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-semibold animate-pulse">
            Urgent
          </Badge>
        )}

        {/* Action Buttons */}
        <div
          className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <Button
            size="icon"
            variant="secondary"
            onClick={handleLike}
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              isLiked ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/90 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <div
          className={`text-8xl transition-all duration-500 ${
            isHovered ? "scale-110 animate-float" : "group-hover:animate-float"
          }`}
        >
          🐕
        </div>
      </div>

      {/* Dog Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-olive transition-colors duration-300">
            {dog.name}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2 hover:text-foreground transition-colors duration-200">
              <Calendar className="w-4 h-4" />
              <span className="capitalize">{dog.age}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors duration-200">
              <User className="w-4 h-4" />
              <span>{dog.gender}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors duration-200">
              <Weight className="w-4 h-4" />
              <span>{dog.size}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors duration-200">
              <MapPin className="w-4 h-4" />
              <span>{dog.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              {dog.breed}
            </Badge>
            {dog.goodWith.map((trait) => (
              <Badge
                key={trait}
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50 transition-colors"
              >
                {trait}
              </Badge>
            ))}
            {dog.personality.slice(0, 2).map((trait) => (
              <Badge
                key={trait}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
              >
                {trait}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{dog.description}</p>
        </div>

        {/* Contact Button */}
        <Button
          onClick={handleContact}
          className="w-full bg-gradient-donate hover:shadow-orange-glow transition-all duration-300 text-white font-semibold group-hover:scale-105"
        >
          <Heart className="w-4 h-4 mr-2" />
          Contact About {dog.name}
        </Button>
      </div>
    </div>
  )
}
