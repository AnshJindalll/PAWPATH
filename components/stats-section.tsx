"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  {
    number: 2847,
    label: "Dogs Adopted",
    description: "Happy families created",
  },
  {
    number: 156,
    label: "Partner Pounds",
    description: "Across the country",
  },
  {
    number: 98,
    label: "Success Rate",
    description: "Successful adoptions",
    suffix: "%",
  },
  {
    number: 24,
    label: "Hours Response",
    description: "Average response time",
  },
]

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const increment = target / (duration / 16)
    let currentValue = 0

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= target) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        setCurrent(Math.floor(currentValue))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-olive">
      {current.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2 group">
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <div className="text-xl font-semibold text-foreground">{stat.label}</div>
              <div className="text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
