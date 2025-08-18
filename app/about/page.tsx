import { Heart, Users, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"

const aboutCards = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "To reduce the number of dogs in pounds and shelters by connecting them with loving families who will provide them with the care and attention they deserve.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "A network of dedicated volunteers, pounds, shelters, and families working together to give every dog a second chance at happiness.",
  },
  {
    icon: Shield,
    title: "Our Promise",
    description:
      "We ensure all dogs are health-checked, vaccinated, and ready for adoption. We also provide ongoing support to new families.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHeader title="About PawPath" description="Our mission to connect rescue dogs with loving families" />

        <div className="container mx-auto px-4 pb-20">
          {/* Hero Content */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Founded in 2025, PawPath was born from a simple belief: every dog deserves a loving home. We've built a
              comprehensive platform that bridges the gap between rescue dogs in need and families ready to provide them
              with the love and care they deserve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-olive">2847</div>
                <div className="text-muted-foreground">Dogs Rescued</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-olive">156</div>
                <div className="text-muted-foreground">Partner Organizations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-olive">98%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* About Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {aboutCards.map((card, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-olive transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-olive rounded-full flex items-center justify-center group-hover:animate-float">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  PawPath started when our founder, Sarah, visited a local animal shelter and was heartbroken by the
                  number of wonderful dogs waiting for homes. She realized that many potential adopters simply didn't
                  know these dogs existed, while shelters struggled to reach the right families.
                </p>
                <p>
                  What began as a simple website to showcase local shelter dogs has grown into a comprehensive platform
                  connecting rescue organizations across the country with loving families. We've streamlined the
                  adoption process, making it easier for both shelters and adopters to find their perfect match.
                </p>
                <p>
                  Today, we're proud to work with over 150 pounds, shelters, and rescue organizations, helping thousands
                  of dogs find their forever homes. But our work is far from over – every day, more dogs enter the
                  system, and we're committed to helping every single one find the love they deserve.
                </p>
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
