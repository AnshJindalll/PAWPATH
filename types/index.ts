export interface Dog {
  id: number
  name: string
  breed: string
  age: "puppy" | "young" | "adult" | "senior"
  gender: "Male" | "Female"
  size: "Small" | "Medium" | "Large" | "Extra Large"
  color: string
  location: string
  poundId: number
  urgent: boolean
  goodWith: string[]
  personality: string[]
  description: string
  specialNeeds: boolean
  energy: "low" | "moderate" | "high"
  image?: string
}

export interface Pound {
  id: number
  name: string
  address: string
  phone: string
  lat: number
  lng: number
  availableDogs: number
  hours: string
  type: "municipal" | "rescue" | "shelter"
}

export interface FilterOptions {
  location?: string
  breed?: string
  age?: string
  size?: string
  gender?: string
  color?: string
  compatibility?: string
  energy?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
