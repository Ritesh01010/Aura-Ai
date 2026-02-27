"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Trophy,
  BarChart3,
  Calendar,
  Clock,
  Flame,
  Dumbbell,
  Heart,
  ArrowUp,
  Camera,
  Edit,
  User,
  Zap,
  Crown,
  Menu
} from "lucide-react"
import Header from "../../components/header"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  // ===== STEP 2: Fetch logged-in user + profile =====
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      // Not logged in → redirect
      if (!user) {
        window.location.href = "/login"
        return
      }

      // Fetch profile
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Profile fetch error:", error)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    loadProfile()
  }, [])
  const handleAvatarUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0]
  if (!file || !profile) return

  // limit size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be under 2MB")
    return
  }

  const fileExt = file.name.split(".").pop()
  const filePath = `${profile.id}.${fileExt}`

  // upload
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true })

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return
  }

  // public URL
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  // save to profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: data.publicUrl })
    .eq("id", profile.id)

  if (updateError) {
    console.error("Profile update error:", updateError)
    return
  }

  // update UI
  setProfile({ ...profile, avatar_url: data.publicUrl })
  window.dispatchEvent(new Event("avatar-updated"))
}

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500/30">
      <Header />
      <main className="flex-1 pb-12">
        
        {/* Profile Header with Banner */}
        <div className="relative mb-8">
            <div className="h-48 w-full bg-gradient-to-r from-violet-900/40 via-indigo-900/40 to-slate-900/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            </div>
            
            <div className="container px-4 md:px-6 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
                            <Avatar className="h-32 w-32 border-4 border-slate-950 relative">
                                <AvatarImage src={ 
                                  profile?.avatar_url ? `${profile.avatar_url}?t=${Date.now()}`
                                  : "/placeholder.svg?height=128&width=128&text=User"}
                                  className="object-cover"/>

                                <AvatarFallback className="bg-slate-800 text-2xl font-bold text-slate-400">UN</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="secondary" onClick={() => document.getElementById("avatar-upload")?.click()} className="absolute bottom-1 right-1 h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800 hover:bg-slate-700 text-white shadow-lg">
                                <Camera className="h-4 w-4" />
                                <span className="sr-only">Change avatar</span>
                            </Button>
                            <input  type="file"  id="avatar-upload"   accept="image/*"  hidden  onChange={handleAvatarUpload} />
                        </div>
                        
                        <div className="space-y-2 mb-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white"> {loading ? "Loading..." : profile?.full_name}</h1>
                                <Badge className="bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 border-violet-500/30 px-2 py-0.5 text-xs">
                                    <Zap className="w-3 h-3 mr-1 fill-current" /> Level 1
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {profile?.created_at && new Date(profile.created_at).toDateString()}</span>
                                <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> 1xx Workouts</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mb-2">
                        <Button variant="outline" className="gap-2 border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                            <Edit className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </Button>
                        
                    </div>
                </div>
            </div>
        </div>

        <div className="container px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
              <TabsList className="w-full max-w-md bg-slate-900/80 border border-slate-800 p-1 h-auto rounded-full grid grid-cols-3">
                <TabsTrigger value="overview" className="rounded-full py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">Overview</TabsTrigger>
                <TabsTrigger value="stats" className="rounded-full py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">Statistics</TabsTrigger>
                <TabsTrigger value="history" className="rounded-full py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">History</TabsTrigger>
              </TabsList>
              <div className="container px-4 md:px-6 text-center">
                <Badge variant="outline" className="mb-4 border-amber-500/30 bg-amber-500/10 text-amber-300 px-3 py-1 backdrop-blur-md mx-auto w-fit">
                    <Crown className="mr-1 h-3 w-3 fill-amber-500" />
                    Upcoming Features
                </Badge>
              </div>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                
                {/* Key Metrics */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
                    <CardHeader className="pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-slate-400">Weekly Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold text-white">3<span className="text-slate-500 text-lg font-normal">/4</span></span>
                          <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">75%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-slate-800" />
                        <p className="text-xs text-slate-500">1 workout left to reach target</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
                    <CardHeader className="pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-slate-400">Calories Burned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">1,248</span>
                            <Badge variant="outline" className="text-[10px] gap-0.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 h-5 px-1.5">
                              <ArrowUp className="h-2.5 w-2.5" /> 12%
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">Total this week</p>
                      </div>
                      <div className="mt-3 h-1 w-full flex gap-0.5 items-end opacity-50">
                          {[20, 40, 30, 50, 40, 60, 80].map((h, i) => (
                              <div key={i} className="flex-1 bg-orange-500 rounded-t-sm" style={{ height: `${h}%` }} />
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
                    <CardHeader className="pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-slate-400">Active Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-1">
                         <span className="text-2xl font-bold text-white">3h 45m</span>
                         <p className="text-xs text-slate-500">Total duration this week</p>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Avg 45m / session</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
                    <CardHeader className="pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-slate-400">Current Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">5 Days</span>
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                         </div>
                         <p className="text-xs text-slate-500">Personal best: 14 days</p>
                      </div>
                      <div className="mt-3 flex gap-1">
                          {['M','T','W','T','F','S','S'].map((d, i) => (
                              <div key={i} className={`h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-600'}`}>
                                  {d}
                              </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  )
}