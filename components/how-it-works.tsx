import { Search, Heart, Home } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search & Browse",
    description: "Browse through hundreds of dogs from verified pounds and shelters across the country.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Connect & Meet",
    description: "Connect with the pound directly and arrange a meet-and-greet with your potential new friend.",
  },
  {
    number: "03",
    icon: Home,
    title: "Adopt & Love",
    description: "Complete the adoption process and welcome your new family member home.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Simple steps to find your perfect companion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group text-center p-8 rounded-2xl bg-card hover:shadow-olive transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-olive rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-olive rounded-full flex items-center justify-center group-hover:animate-float">
                <step.icon className="w-10 h-10 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
