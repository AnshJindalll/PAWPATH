"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import clsx from "clsx"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "relative flex items-center w-14 h-7 rounded-full cursor-pointer transition-colors",
        isDark ? "bg-gray-800" : "bg-gray-300"
      )}
    >
      {/* Knob that slides */}
      <div
        className={clsx(
          "absolute top-1 left-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md transition-transform duration-300",
          isDark ? "translate-x-7" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-800" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
    </div>
  )
}
