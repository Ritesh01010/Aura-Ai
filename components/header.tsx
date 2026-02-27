"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const supabase = createClient()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔹 Load user + avatar
    const loadUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setUser(null)
        setAvatarUrl(null)
        setLoading(false)
        return
      }

      setUser(user)

      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      setAvatarUrl(data?.avatar_url ?? null)
      setLoading(false)
    }

    loadUserAndProfile()

    // 🔹 Auth listener
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          const { data } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", currentUser.id)
            .single()

          setAvatarUrl(data?.avatar_url ?? null)
        } else {
          setAvatarUrl(null)
        }
      }
    )

    // ✅ STEP 3 — LISTEN FOR AVATAR UPDATE EVENT
    const handleAvatarUpdated = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      setAvatarUrl(data?.avatar_url ?? null)
    }

    window.addEventListener("avatar-updated", handleAvatarUpdated)

    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener("avatar-updated", handleAvatarUpdated)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAvatarUrl(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Aura
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="nav-link">Home</a>
          <a href="/library" className="nav-link">Video Library</a>
          <a href="/training" className="nav-link">Training</a>
          <a href="/leaderboard" className="nav-link">Leaderboard</a>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <>
              <a href="/profile">
                <Avatar className="h-8 w-8 border border-slate-700 hover:border-violet-500 transition-colors">
                  <AvatarImage
                    src={
                      avatarUrl
                        ? `${avatarUrl}?t=${Date.now()}`
                        : "/placeholder.svg?height=32&width=32&text=U"
                    }
                  />
                  <AvatarFallback className="bg-slate-800 text-slate-400">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </a>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="
                  border-slate-700 
                  bg-slate-900/60 
                  text-slate-300 
                  hover:bg-violet-600/20 
                  hover:text-violet-300 
                  hover:border-violet-500/40 
                  transition-all
                "
              >
                Logout
              </Button>
            </>
          ) : (
            !loading && (
              <Button
                onClick={() => router.push("/login")}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                Login
              </Button>
            )
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <a href="/profile">
            <Avatar className="h-8 w-8 border border-slate-700">
              <AvatarImage
                src={
                  avatarUrl
                    ? `${avatarUrl}?t=${Date.now()}`
                    : "/placeholder.svg?height=32&width=32&text=U"
                }
              />
              <AvatarFallback className="bg-slate-800 text-slate-400">U</AvatarFallback>
            </Avatar>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-8">
                <a href="/">Home</a>
                <a href="/library">Video Library</a>
                <a href="/training">Training</a>
                <a href="/leaderboard">Leaderboard</a>
                <a href="/profile">Profile</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
