import { LoadingScreen } from "@/components/loading-screen"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { StatsSection } from "@/components/stats-section"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturedDogs } from "@/components/featured-dogs"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <EnhancedHeroSection />
        <ScrollAnimation>
          <StatsSection />
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <HowItWorks />
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <FeaturedDogs />
        </ScrollAnimation>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
