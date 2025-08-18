"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="theme-switch">
        <input type="checkbox" className="hidden" />
        <div className="slider">
          <Moon className="w-3 h-3 text-olive" />
          <Sun className="w-3 h-3 text-white opacity-0" />
        </div>
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <label className="theme-switch">
      <input type="checkbox" checked={isDark} onChange={() => setTheme(isDark ? "light" : "dark")} className="hidden" />
      <div className="slider">
        <Moon className="w-3 h-3 text-olive transition-opacity duration-300" style={{ opacity: isDark ? 0 : 1 }} />
        <Sun className="w-3 h-3 text-white transition-opacity duration-300" style={{ opacity: isDark ? 1 : 0 }} />
      </div>
    </label>
  )
}
