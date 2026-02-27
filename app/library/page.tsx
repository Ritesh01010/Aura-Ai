"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import AuthGuard from "@/components/auth-guard"

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Flame, Zap, Play, Sparkles } from "lucide-react";
import Header from "@/components/header";

const videoData = {
  all: [
    { title: "Strong Glutes", url: "/videos/Strong Gluits.mp4", category: "Glutes", calories: 200, level: "Beginner", duration: "" },
    { title: "Shoulder Workout", url: "/videos/Shoulder Workout.mp4", category: "Shoulder", calories: 250, level: "Intermediate", duration: "25 min" },
    { title: "Pull Ups", url: "/videos/Pull ups.mp4", category: "Back", calories: 180, level: "Advanced", duration: "15 min" },
    { title: "Hip Thrusts", url: "/videos/hip thrusts.mp4", category: "Glutes", calories: 220, level: "Intermediate", duration: "20 min" },
    { title: "Dumbbell Pull Up", url: "/videos/Dumbbell Pull up.mp4", category: "Back", calories: 210, level: "Intermediate", duration: "15 min" },
    { title: "Chest Flys", url: "/videos/Chest Flys.mp4", category: "Chest", calories: 230, level: "Intermediate", duration: "20 min" },
    { title: "Cable Kickbacks", url: "/videos/cable kickbacks.mp4", category: "Glutes", calories: 160, level: "Beginner", duration: "18 min" },
    { title: "Beginner Pushups", url: "/videos/Begginer Pushups.mp4", category: "Chest", calories: 120, level: "Beginner", duration: "10 min" },

    { title: "Squats Trick", url: "/videos/Squats Trick.mp4", category: "Legs", calories: 240, level: "Intermediate", duration: "20 min" },
    { title: "Shoulder Form", url: "/videos/shoulder form.mp4", category: "Shoulder", calories: 150, level: "Beginner", duration: "18 min" },
    { title: "Planks", url: "/videos/Planks.mp4", category: "Core", calories: 50, level: "Beginner", duration: "5 min" },
    { title: "Head Pull", url: "/videos/Head Pull.mp4", category: "Back", calories: 130, level: "Intermediate", duration: "12 min" },
    { title: "Deadlifts", url: "/videos/DeadLifts.mp4", category: "Legs", calories: 300, level: "Advanced", duration: "25 min" },
    { title: "Chair Workout", url: "/videos/Chair Workout.mp4", category: "Full Body", calories: 190, level: "Beginner", duration: "20 min" },
    { title: "Cable Flys", url: "/videos/cable flys.mp4", category: "Chest", calories: 170, level: "Intermediate", duration: "15 min" },

    { title: "Squats Glutes", url: "/videos/Squats Gluits.mp4", category: "Legs", calories: 260, level: "Intermediate", duration: "22 min" },
    { title: "Pushups", url: "/videos/Pushups.mp4", category: "Chest", calories: 110, level: "Beginner", duration: "10 min" },
    { title: "Overhead Tricep Extensions", url: "/videos/overhead tricep extensions.mp4", category: "Arms", calories: 120, level: "Intermediate", duration: "12 min" },
    { title: "Gripping Handle", url: "/videos/gripping handle.mp4", category: "Grip", calories: 90, level: "Beginner", duration: "10 min" },
    { title: "Core Workout", url: "/videos/Core Workout.mp4", category: "Core", calories: 200, level: "Intermediate", duration: "15 min" },
    { title: "Chair Core Workout", url: "/videos/chair core workout.mp4", category: "Core", calories: 140, level: "Beginner", duration: "12 min" },
    { title: "Bicep Curls", url: "/videos/bicep curls.mp4", category: "Arms", calories: 100, level: "Beginner", duration: "10 min" },
    { title: "Arm Exercises", url: "/videos/Arm Excercises.mp4", category: "Arms", calories: 150, level: "Intermediate", duration: "15 min" },

    { title: "Shoulder", url: "/videos/Shoulder.mp4", category: "Shoulder", calories: 140, level: "Beginner", duration: "10 min" },
    { title: "Pushups Correction", url: "/videos/Pushups correction.mp4", category: "Chest", calories: 80, level: "Beginner", duration: "8 min" },
    { title: "How To Lift", url: "/videos/How to lift.mp4", category: "Form", calories: 60, level: "Beginner", duration: "12 min" },
    { title: "Glutes", url: "/videos/gluits.mp4", category: "Glutes", calories: 210, level: "Intermediate", duration: "15 min" },
    { title: "Chest Workout", url: "/videos/Chest Workout.mp4", category: "Chest", calories: 240, level: "Intermediate", duration: "20 min" },
    { title: "Cable Rows", url: "/videos/cable rows.mp4", category: "Back", calories: 170, level: "Intermediate", duration: "18 min" },
    { title: "Bench Dips", url: "/videos/bench dips.mp4", category: "Arms", calories: 95, level: "Beginner", duration: "10 min" },
    { title: "Bench Press", url: "/videos/Bench Press.mp4", category: "Chest", calories: 280, level: "Advanced", duration: "20 min" }
  ],
  // unused but left for compatibility with your original shape
  strength: [],
  cardio: [],
  yoga: []
};

type Video = {
  title: string;
  url: string;
  category?: string;
  calories?: number;
  level?: string;
  duration?: string;
};

export default function VideoLibraryPage(): JSX.Element {
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

  // build unique categories dynamically from the 'all' list
  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(videoData.all.map((v) => (v.category || "Uncategorized").trim())));
    return ["all", ...cats];
  }, []);

  return (
     <AuthGuard>
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500/30">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-300 px-3 py-1 backdrop-blur-sm">
                <Sparkles className="mr-1 h-3 w-3 fill-violet-500" />
                Video Library
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Master Every Move
              </h1>
              <p className="text-slate-400 md:text-xl max-w-[600px] leading-relaxed">
                Explore our curated collection of AI-enhanced workouts designed to perfect your form and maximize results.
              </p>

              
            </div>
          </div>
        </div>

        <div className="container py-8 px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-30 p-2 -mx-2 rounded-2xl backdrop-blur-sm md:static md:p-0 md:backdrop-blur-none">
              <TabsList className="bg-slate-900/80 border border-slate-800 p-1 h-auto rounded-full shadow-lg">
                {categories.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-full px-6 py-2 text-slate-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all capitalize data-[state=active]:shadow-md"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Content Grid: one TabsContent per category (dynamically filtered) */}
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {(
                    category === "all"
                      ? videoData.all
                      : videoData.all.filter((v) => (v.category || "").toLowerCase() === category.toLowerCase())
                  ).map((video: Video, i: number) => (
                    <VideoCard key={`${category}-${i}`} video={video} index={i} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
    </AuthGuard>
  );
}

/**
 * buildEmbedSrc: handles YouTube and Google Drive embed/url normalization.
 * If the url is a local .mp4 (starts with /videos/ or ends with .mp4), this function returns iframeSrc=null and externalHref=local path.
 */
function buildEmbedSrc(originalUrl: string): { iframeSrc: string | null; externalHref: string } {
  const url = originalUrl?.trim() ?? "";
  let iframeSrc: string | null = null;
  let externalHref = url;

  // Quick local-file detection: treat local mp4s as externalHref only (we'll render <video> for preview)
  if (/\.mp4($|\?)/i.test(url) || url.startsWith("/videos/")) {
    return { iframeSrc: null, externalHref: url };
  }

  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const ytWatchMatch = url.match(/[?&]v=([^&]+)/);
      if (ytWatchMatch && ytWatchMatch[1]) {
        const id = ytWatchMatch[1];
        iframeSrc = `https://www.youtube.com/embed/${id}?rel=0&controls=1`;
        externalHref = `https://www.youtube.com/watch?v=${id}`;
      } else {
        const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
        if (shortMatch && shortMatch[1]) {
          iframeSrc = `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&controls=1`;
          externalHref = `https://www.youtube.com/watch?v=${shortMatch[1]}`;
        } else if (url.includes("/embed/")) {
          iframeSrc = url.split("?")[0] + "?rel=0&controls=1";
        } else {
          const parts = url.split("/");
          const maybeId = parts[parts.length - 1];
          if (maybeId && maybeId.length <= 20) {
            iframeSrc = `https://www.youtube.com/embed/${maybeId}?rel=0&controls=1`;
            externalHref = `https://www.youtube.com/watch?v=${maybeId}`;
          }
        }
      }
      return { iframeSrc, externalHref };
    }

    if (url.includes("drive.google.com")) {
      const driveMatch = url.match(/\/d\/([^/]+)/);
      if (driveMatch && driveMatch[1]) {
        const id = driveMatch[1];
        iframeSrc = `https://drive.google.com/file/d/${id}/preview`;
        externalHref = `https://drive.google.com/file/d/${id}/view`;
        return { iframeSrc, externalHref };
      }
      const idMatch = url.match(/[?&]id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        const id = idMatch[1];
        iframeSrc = `https://drive.google.com/file/d/${id}/preview`;
        externalHref = `https://drive.google.com/file/d/${id}/view`;
        return { iframeSrc, externalHref };
      }
      return { iframeSrc: null, externalHref: url };
    }
  } catch (err) {
    console.warn("buildEmbedSrc parse error", err);
    return { iframeSrc: null, externalHref: url };
  }

  return { iframeSrc: null, externalHref: url };
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  const { iframeSrc, externalHref } = buildEmbedSrc(video.url);

  // Determine if this is a local video file (mp4)
  const isLocalMp4 = /\.mp4($|\?)/i.test(video.url) || video.url.startsWith("/videos/");

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 shadow-lg hover:shadow-violet-900/20"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* open the file in a new tab if user wants; card click goes to externalHref */}
      <a href={externalHref} target="_blank" rel="noreferrer" className="flex-1 flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/40 transition-colors" />

          {isLocalMp4 ? (
            // local video preview (plays silently, loops). pointer-events-none so the card anchor still works.
            <video
              src={video.url}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
            />
          ) : iframeSrc ? (
            // YouTube / Drive preview
            <iframe
              src={iframeSrc}
              title={video.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              allow="autoplay; encrypted-media"
            ></iframe>
          ) : (
            // fallback placeholder
            <div className="w-full h-full flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <div className="text-sm text-slate-400">Preview not available</div>
                <div className="text-xs text-slate-500 line-clamp-2">{video.title}</div>
              </div>
            </div>
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-12 w-12 rounded-full bg-violet-600/90 backdrop-blur-sm flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="secondary" className="bg-slate-950/70 backdrop-blur text-xs border border-slate-800 text-slate-200 font-medium">
              {video.category}
            </Badge>
          </div>

          {/* Duration Pill */}
         
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1 space-y-3">
          <div>
            <h3 className="font-bold text-lg text-slate-100 line-clamp-1 group-hover:text-violet-400 transition-colors">
              {video.title}
            </h3>
          </div>

          
        </div>
      </a>
    </div>
  );
}
