"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, ArrowRight, Sparkles, Lock, Mail, User, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
// Use relative path to avoid alias issues
import { createClient } from "../../utils/supabase/client"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get("signup") === "true") {
        setActiveTab("signup")
      }
    }
  }, [])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Check your email for the confirmation link!")
      setActiveTab("login")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-violet-500/30 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-30" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 relative z-10">
        
        <a href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tighter group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-colors">Aura</span>
        </a>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="text-slate-400">
              {activeTab === "login" 
                ? "Enter your credentials to access your training plan" 
                : "Join the future of fitness training today"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-2xl">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950/50 border border-slate-800 rounded-lg p-1 mb-6">
                <TabsTrigger 
                  value="login" 
                  className="rounded-md data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400 transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="rounded-md data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400 transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 animate-in fade-in-50 slide-in-from-left-2 duration-300">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 bg-slate-950/50 border-slate-800 text-white focus:border-violet-500 focus:ring-violet-500/20 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
  
                      <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10 bg-slate-950/50 border-slate-800 text-white focus:border-violet-500 focus:ring-violet-500/20 placeholder:text-slate-600"
                      />

                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-white transition"
                      >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 text-base shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02]"
                  >
                    {loading ? "Signing in..." : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 animate-in fade-in-50 slide-in-from-right-2 duration-300">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-9 bg-slate-950/50 border-slate-800 text-white focus:border-violet-500 focus:ring-violet-500/20 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                    <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input 
                    id="signup-email"
                    type="email"
                    placeholder="m@example.com"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-slate-950/50 border-slate-800 text-white focus:border-violet-500 focus:ring-violet-500/20 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
    
                        <Input 
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 pr-10 bg-slate-950/50 border-slate-800 text-white focus:border-violet-500 focus:ring-violet-500/20 placeholder:text-slate-600"/>

                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-white transition">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 text-base shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02]"
                  >
                    {loading ? "Creating Account..." : "Create Account"} <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center text-sm text-slate-500">
            {activeTab === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                >
                  Sign up now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer simple text */}
      <div className="py-6 text-center text-xs text-slate-600 relative z-10">
        © {new Date().getFullYear()} Aura Fitness AI. Secure Login.
      </div>
    </div>
  )
}