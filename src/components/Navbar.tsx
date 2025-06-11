"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, CreditCard, Search, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    {
      name: "Explore",
      href: "/explore",
      icon: <Search className="mr-2 h-4 w-4" />,
    },
    {
      name: "Ask AI",
      href: "/ask-ai",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-primary/10 backdrop-blur-md bg-gradient-to-r from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <div className="p-2 rounded-lg bg-purple-800/20 group-hover:bg-purple-800/40 transition">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="ml-2 text-xl font-bold text-white tracking-wide group-hover:text-neon-blue transition">
              SelectCard
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-purple-800/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-800/30 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-black/70 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition ${
                  pathname === item.href
                    ? "bg-purple-800/30 text-neon-blue"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
