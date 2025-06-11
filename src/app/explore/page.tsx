"use client"

import React, { useState } from "react"
import Card from "@/components/Card"
import { cards } from "@/lib/cards"
import { Input } from "@/components/ui/input"

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCards = cards.filter((card) => {
    const term = searchTerm.toLowerCase()
    return (
      card.name.toLowerCase().includes(term) ||
      card.bank.toLowerCase().includes(term) ||
      card.features.some((feature) => feature.toLowerCase().includes(term))
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 py-12 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-white mb-4">Explore Credit Cards</h1>

      <div className="mb-8">
        <Input
          placeholder="Search by name, bank, or feature (e.g., lounge, cashback)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 focus-visible:ring-purple-500"
        />
      </div>

      {filteredCards.length === 0 ? (
        <p className="text-slate-400">No matching cards found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Explore
