import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowRight, 
  Dumbbell, 
  Trophy, 
  Video, 
  Activity, 
  Zap, 
  Target, 
  Users, 
  Play, 
  CheckCircle2,
  Sparkles
} from "lucide-react"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500/30">
      
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] -z-10 pointer-events-none opacity-60" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none opacity-40" />

          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <Badge variant="outline" className="w-fit border-violet-500/30 bg-violet-500/10 text-violet-300 px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
                    <Sparkles className="mr-2 h-3.5 w-3.5 fill-violet-500 text-violet-500" />
                    AI-Powered Form Correction v1.0
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-gradient-to-br from-white via-slate-100 to-slate-500 bg-clip-text text-transparent">
                    Train Smarter,<br /> Not Harder.
                  </h1>
                  <p className="max-w-[600px] text-slate-400 md:text-xl leading-relaxed">
                    Experience the future of fitness with real-time computer vision analysis. 
                    <strong className="text-violet-400"> Aura</strong> corrects your form instantly, preventing injuries and maximizing gains.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/login?signup=true">
                    <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white gap-2 h-12 px-8 shadow-lg shadow-violet-600/25 transition-all hover:scale-105">
                      Start Free Trial <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/library">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white gap-2 h-12 px-8 backdrop-blur-sm">
                      <Play className="h-4 w-4" /> Watch Demo
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-slate-950 h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?text=U${i}`} />
                        <AvatarFallback className="bg-slate-800 text-xs">U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-slate-300 font-medium">10,000+ Athletes</span>
                     <span className="text-xs">Trusted by pros worldwide</span>
                  </div>
                </div>
              </div>
              
              {/* Hero Image/Graphic area */}
              <div className="relative mx-auto lg:ml-auto w-full max-w-[500px] aspect-square perspective-1000">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-20 blur-3xl -z-10 animate-pulse" />
                <div className="relative h-full w-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-2xl transform rotate-y-12 hover:rotate-0 transition-transform duration-700">
                  {/* Simulated UI Interface */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 border-0 backdrop-blur-md">98% Accuracy</Badge>
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-white uppercase tracking-wider">LIVE REC</span>
                    </div>
                  </div>
                  
                  {/* Skeleton Overlay UI */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                     <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400">
                           <Activity className="h-5 w-5" />
                        </div>
                        <div>
                           <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Form Score</div>
                           <div className="text-xl font-bold text-white">Perfect <span className="text-emerald-400">100</span></div>
                        </div>
                     </div>
                  </div>

                  <img
                    src="/HOMEIMG.jpg"
                    alt="AI Analysis Visualization"
                    className="h-full w-full object-cover opacity-80"
                  />
                  
                  {/* Tech Lines Overlay */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-50">
                     <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                           <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1"/>
                        </pattern>
                     </defs>
                     <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        {/* Features Grid */}
        <section id="features" className="py-24 bg-slate-950 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="border-violet-500/30 text-violet-400 bg-violet-500/5">Key Features</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Precision Engineering for Your Body</h2>
              <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed">
                Everything you need to reach peak performance, powered by cutting-edge AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Video,
                  title: "Computer Vision Library",
                  desc: "Access 500+ exercises with real-time skeletal tracking overlays to master your technique."
                },
                {
                  icon: Activity,
                  title: "Real-time Correction",
                  desc: "Get instant audio and visual feedback if your knees cave in or your back rounds."
                },
                {
                  icon: Trophy,
                  title: "Global Leaderboards",
                  desc: "Compete with friends and the global community. Earn XP for perfect form, not just reps."
                },
                {
                  icon: Target,
                  title: "Personalized Plans",
                  desc: "AI adapts your workout intensity daily based on your performance and fatigue levels."
                },
                {
                  icon: Zap,
                  title: "Velocity Tracking",
                  desc: "Measure the speed of your lifts to optimize for power or hypertrophy."
                },
                {
                  icon: Users,
                  title: "Community Challenges",
                  desc: "Join monthly challenges to stay motivated and win exclusive digital badges."
                }
              ].map((feature, i) => (
                <Card key={i} className="bg-slate-900/40 border-slate-800 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all duration-300">
                      <feature.icon className="h-6 w-6 text-slate-300 group-hover:text-violet-300 transition-colors" />
                    </div>
                    <CardTitle className="text-white group-hover:text-violet-100 transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  How <span className="text-violet-500">Aura</span> Works
                </h2>
                <div className="space-y-8">
                  {[
                    { title: "Setup your space", desc: "Place your phone or laptop on the floor or a table. No special equipment needed." },
                    { title: "Select your workout", desc: "Choose from our library of AI-supported exercises or start a custom routine." },
                    { title: "Start moving", desc: "Our AI tracks 33 distinct points on your body to ensure perfect biomechanics." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {/* Connecting Line */}
                      {i !== 2 && <div className="absolute left-4 top-10 bottom-[-20px] w-px bg-slate-800" />}
                      
                      <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 font-bold text-sm relative z-10">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/training">
                <Button className="bg-white text-slate-950 hover:bg-slate-200 mt-6 font-semibold px-8">
                  See Technology in Action
                </Button>
                </a>
              </div>
              <div className="relative group">
                 {/* Decorative gradient blob */}
                 <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 transform rotate-3 group-hover:opacity-30 transition-opacity duration-500" />
                 <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden aspect-video shadow-2xl">
                   <img 
                     src="/HOMEIMG.jpg" 
                     alt="App Interface" 
                     className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                   />
                   {/* Play button overlay */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 group-hover:bg-violet-600/80 group-hover:border-violet-500">
                       <Play className="h-8 w-8 text-white fill-current ml-1" />
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-950/20 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                Ready to Transform Your Fitness?
              </h2>
              <p className="text-slate-400 text-xl max-w-[700px] mx-auto">
                Join thousands of users who have already leveled up their training with Aura's AI precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a href="/login?signup=true">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-14 text-lg shadow-lg shadow-violet-600/30">
                    Start Your Journey
                  </Button>
                </a>
                
              </div>
              <p className="text-sm text-slate-500">Unlock AI-Powered Workouts — No Cost, No Limits.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
        <div className="container px-4 md:px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-white text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                <Dumbbell className="h-5 w-5 text-violet-500" />
              </div>
              <span>Aura</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[200px]">
              AI-powered fitness training for the modern athlete. Precision in every rep.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/training" className="hover:text-violet-400 transition-colors">Training</a></li>
              <li><a href="/library" className="hover:text-violet-400 transition-colors">Library</a></li>
              <li><a href="/leaderboard" className="hover:text-violet-400 transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Aura Fitness. All rights reserved.
        </div>
      </footer>
    </div>
  )
}