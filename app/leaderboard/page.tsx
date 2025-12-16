import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Filter, ArrowUp, ArrowDown, Flame, Dumbbell, Clock, Crown, Zap } from "lucide-react"
import Header from "../../components/header"

export default function LeaderboardPage() {
  return (
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
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Compete with the elite. Rise through the ranks by maintaining perfect form and consistency.
                </p>
            </div>
        </div>

        <div className="container px-4 md:px-6 pb-20">
          <div className="flex flex-col gap-8">
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-30 p-2 -mx-2 rounded-2xl backdrop-blur-md bg-slate-950/50 md:static md:bg-transparent md:p-0">
              <Tabs defaultValue="weekly" className="w-full sm:w-auto">
                <TabsList className="bg-slate-900/80 border border-slate-800 p-1 h-auto rounded-full w-full sm:w-auto">
                  <TabsTrigger value="weekly" className="rounded-full px-6 py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="rounded-full px-6 py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">Monthly</TabsTrigger>
                  <TabsTrigger value="alltime" className="rounded-full px-6 py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">All Time</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" className="w-full sm:w-auto gap-2 border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-violet-500/30 rounded-full">
                <Filter className="h-4 w-4" />
                Filter View
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Leaderboard List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-slate-800/60 bg-slate-900/60 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" /> Top Performers
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">UPDATED 5M AGO</span>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors group">
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="flex items-center justify-center w-8 font-mono">
                            {i === 0 ? (
                              <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-40" />
                                <Trophy className="h-6 w-6 text-yellow-400 relative z-10" />
                              </div>
                            ) : i === 1 ? (
                              <Medal className="h-6 w-6 text-slate-300" />
                            ) : i === 2 ? (
                              <Award className="h-6 w-6 text-amber-600" />
                            ) : (
                              <span className="text-lg font-bold text-slate-600 group-hover:text-slate-400 transition-colors">#{i + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className={`h-10 w-10 border-2 ${i < 3 ? 'border-violet-500' : 'border-slate-800'}`}>
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i}`} />
                                    <AvatarFallback className="bg-slate-800 text-slate-400">U{i}</AvatarFallback>
                                </Avatar>
                                {i < 3 && <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-violet-600 rounded-full border-2 border-slate-900 flex items-center justify-center"><Zap className="h-2 w-2 text-white fill-current" /></div>}
                            </div>
                            <div>
                                <div className={`font-medium ${i < 3 ? 'text-white' : 'text-slate-300'}`}>User {i + 1}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    {i === 0 ? "Elite" : i < 3 ? "Pro" : "Member"} • Lvl {20 - i}
                                </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <div className="font-bold text-white font-mono text-lg">{1200 - i * 50} <span className="text-xs text-slate-500 font-sans">XP</span></div>
                            <div className="flex items-center justify-end gap-1 text-[10px]">
                              {i % 3 === 0 ? (
                                <span className="text-emerald-400 flex items-center bg-emerald-400/10 px-1.5 py-0.5 rounded">
                                    <ArrowUp className="h-2.5 w-2.5 mr-0.5" /> +{(10 - i) * 5}%
                                </span>
                              ) : (
                                <span className="text-slate-600">Stable</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                {/* User Rank Card */}
                <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-900/20 to-slate-900/50 backdrop-blur-sm p-1 shadow-lg shadow-violet-900/10">
                  <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
                    <h2 className="text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" /> Your Standing
                    </h2>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-14 w-14 border-2 border-white/10">
                        <AvatarImage src="/placeholder.svg?height=64&width=64&text=You" />
                        <AvatarFallback className="bg-slate-800 text-white">YOU</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-lg font-bold text-white">Your Name</div>
                        <Badge variant="secondary" className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border-0 text-[10px] px-2 py-0.5">Intermediate</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg bg-slate-900 p-3 text-center border border-slate-800">
                        <div className="text-2xl font-bold text-white font-mono">#24</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Global Rank</div>
                      </div>
                      <div className="rounded-lg bg-slate-900 p-3 text-center border border-slate-800">
                        <div className="text-2xl font-bold text-emerald-400 font-mono">780</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Points</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                        <ArrowUp className="h-4 w-4" />
                        <span>Rising Fast</span>
                      </div>
                      <div className="text-xs text-emerald-500/70">Top 15%</div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}