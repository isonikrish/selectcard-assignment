"use client"
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <main className="bg-gradient-to-br from-gray-950 to-gray-900 min-h-screen">


      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="mx-auto px-4 py-10 md:py-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 mr-3 animate-pulse" />
              <span className="text-purple-400 font-medium">AI-Powered Card Discovery</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gradient leading-tight">
              Find the Perfect
              <br />
              Credit Card for You
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Search, compare, and discover the top credit cards from Indian banks with our intelligent recommendation
              system
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-xl mx-auto">
              <Button variant={"outline"} className="w-full md:w-1/3 p-5" asChild>
                <Link href={'/ask-ai'} className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Ask AI
                </Link>
              </Button>

              <Button className="w-full md:w-1/3 p-5" asChild>
                <Link href={"/explore"} className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Explore
                </Link>
              </Button>
            </div>


          </div>
        </div>
      </div>



    </main>
  );
}
