import { BadgePercent, IndianRupee } from "lucide-react"
import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

type CardProps = {
  name: string
  bank: string
  annual_fee: number
  features: string[]
  cashback: boolean
  summary: string
}

const CreditCard = ({
  name,
  bank,
  annual_fee,
  features,
  cashback,
  summary,
}: CardProps) => {
  return (
    <Card className="bg-gray-900 border border-gray-700 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white text-lg">{name}</CardTitle>
        <CardDescription className="text-purple-400 text-sm">{bank}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <IndianRupee className="w-4 h-4" />
          <span>Annual Fee: ₹{annual_fee.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="text-xs text-white bg-purple-500/20 border border-purple-600 px-2 py-1 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        {cashback && (
          <div className="text-green-400 flex items-center gap-1 text-sm">
            <BadgePercent className="w-4 h-4" />
            <span>Cashback Available</span>
          </div>
        )}

        <p className="text-sm text-gray-400">{summary}</p>
      </CardContent>
    </Card>
  )
}

export default CreditCard
