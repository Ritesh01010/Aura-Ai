"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        Checking session…
      </div>
    )
  }

  return <>{children}</>
}
