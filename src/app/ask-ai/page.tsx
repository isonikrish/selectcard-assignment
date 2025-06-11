"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import Card from "@/components/Card"
import { cardType } from "@/lib/types"

export default function AskAI() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [summary, setSummary] = useState("")

  const handleAsk = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/search?query=${query}`)
      if (res.status === 200) {
        setSummary(res.data.summary)
        setData(res.data.data)
      } else {
        setSummary("No summary found.")
        setData([])
      }
    } catch {
      setSummary("Something went wrong.")
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          Ask AI <Sparkles className="text-purple-400 animate-pulse w-8 h-8" />
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mb-8">
          Get credit card suggestions or comparisons by asking in natural language.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 ">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Best cashback cards with lounge access"
            className="bg-gray-800 text-white border border-gray-700 focus-visible:ring-purple-500"
          />
          <Button
            onClick={handleAsk}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "Ask AI"}
          </Button>
        </div>

        <div className="mt-10 text-left text-sm text-gray-300">
          {summary && (
            <div className="mb-6 p-4 rounded-lg bg-gray-800 border border-purple-700 text-white ">
              <strong>Summary:</strong>
              <p className="mt-1 text-sm text-slate-300">{summary}</p>
            </div>
          )}

          {data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.map((card: cardType, idx) => (
                <Card name={card.name} features={card.features} bank={card.bank} annual_fee={card.annual_fee} cashback={card.cashback} summary={card.summary} key={idx}/>
              ))}
            </div>
          ) : (
            !summary && (
              <p className="italic text-gray-500 mt-10">AI suggestions will appear here...</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
