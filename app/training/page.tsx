"use client"
import AuthGuard from "@/components/auth-guard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Dumbbell, Play, Clock, Calendar, BarChart, ChevronRight, Zap, Activity } from "lucide-react"
import Header from "../../components/header"

export default function TrainingPage() {
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

  const [progress, setProgress] = useState(68)

  return (
    <AuthGuard>
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500/30">
      <Header />
      <main className="flex-1 pb-12">
        
        {/* Header Section */}
        <div className="relative py-12 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
           <div className="container px-4 md:px-6">
             <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center items-center">
               <Badge variant="outline" className="w-fit border-violet-500/30 bg-violet-500/10 text-violet-300 px-3 py-1 backdrop-blur-md">
                 <Zap className="mr-1 h-3 w-3 fill-violet-500" />
                 AI Trainer Active
               </Badge>
               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                 Training Sessions
               </h1>
               <p className="text-lg text-slate-400">
                 Your personalized path to peak performance. Track, analyze, and improve with real-time feedback.
               </p>
             </div>
           </div>
        </div>

        <div className="container px-4 md:px-6 flex justify-center items-center min-h-[60vh]">
          
          {/* Main Dashboard Grid */}
          <div className="w-full max-w-md">
            
            

            {/* Start Session Card */}
            <Card className="bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 overflow-hidden group">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-violet-400" /> 
                  Start Session
                </CardTitle>
                <CardDescription className="text-slate-400">AI-Guided Real-time Analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="aspect-video relative overflow-hidden rounded-xl bg-slate-950 border border-slate-800 group-hover:border-violet-500/30 transition-all">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                       <Camera className="h-8 w-8 text-violet-400" />
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Live Cam</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="/exercise-detection-updated.html" className="w-full">
                  <Button className="w-full gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20">
                    <Play className="h-4 w-4 fill-current" />
                    Launch AI Camera
                  </Button>
                </a>
              </CardFooter>
            </Card>            
          </div>          
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}