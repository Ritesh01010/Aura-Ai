"use client"
import AuthGuard from "@/components/auth-guard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Filter, ArrowUp, ArrowDown, Flame, Dumbbell, Clock, Crown, Zap } from "lucide-react"
import Header from "../../components/header"

export default function LeaderboardPage() {
    const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthGuard>
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500/30">
      <Header />
      <main className="flex-1">
        {/* Header with Glow */}
        <div className="relative py-12 md:py-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="container px-4 md:px-6 text-center">
                <Badge variant="outline" className="mb-4 border-amber-500/30 bg-amber-500/10 text-amber-300 px-3 py-1 backdrop-blur-md mx-auto w-fit">
                    <Crown className="mr-1 h-3 w-3 fill-amber-500" />
                    Upcoming Features
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent mb-4">
                    Leaderboard
                </h1>
                {/* <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Compete with the elite. Rise through the ranks by maintaining perfect form and consistency.
                </p> */}
            </div>
        </div>

        <div className="container px-4 md:px-6 pb-20">
          <div className="flex flex-col gap-8">
            
          
            

            
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}