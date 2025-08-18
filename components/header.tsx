"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Heart } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/find-pounds", label: "Find Pounds" },
  { href: "/adopt", label: "Adopt" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[var(--header-bg-scrolled)] backdrop-blur-md shadow-olive" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl group-hover:animate-float">🐕</span>
              <span className="text-2xl font-bold text-olive-600 dark:text-olive-400">PawPath</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative py-2 font-medium transition-all duration-300 hover:text-orange hover:-translate-y-0.5 ${
                        pathname === link.href ? "text-orange" : "text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-orange transition-all duration-300 ${
                          pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <Button className="hidden sm:flex bg-gradient-donate hover:shadow-orange-glow transition-all duration-300 text-white font-semibold">
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-card shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-olive-600 dark:text-olive-400">PawPath</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav className="p-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      pathname === link.href ? "bg-primary/10 text-orange" : "hover:bg-muted text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button className="w-full bg-gradient-donate hover:shadow-orange-glow transition-all duration-300 text-white font-semibold">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
