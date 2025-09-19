"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"
import { StudentDashboard } from "@/components/student/student-dashboard"
import { PlacementStaffDashboard } from "@/components/placement-staff/placement-staff-dashboard"
import { FacultyMentorDashboard } from "@/components/faculty-mentor/faculty-mentor-dashboard"
import { RecruiterDashboard } from "@/components/recruiter/recruiter-dashboard"
import { RealTimeAnalytics } from "@/components/analytics/real-time-analytics"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3 } from "lucide-react"
import { mockUsers, type User } from "@/lib/auth"

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleLogin = (email: string, role: string) => {
    // Find a mock user with the selected role
    const user = mockUsers.find((u) => u.role === role) || mockUsers[0]
    console.log("[v0] User logging in:", user.name, user.role)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    console.log("[v0] Logout initiated for user:", currentUser?.name)
    try {
      // Clear all state
      setCurrentUser(null)
      setShowAnalytics(false)

      // Clear any cached data (localStorage, sessionStorage)
      if (typeof window !== "undefined") {
        localStorage.removeItem("campus-placement-user")
        sessionStorage.clear()
      }

      console.log("[v0] Logout completed successfully")

      // Force a small delay to ensure state updates are processed
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">Welcome back, {currentUser.name}!</h1>
              <p className="text-muted-foreground text-pretty">
                {currentUser.role === "student" && "Track your applications and discover new opportunities."}
                {currentUser.role === "placement_staff" && "Manage placements and monitor student progress."}
                {currentUser.role === "faculty_mentor" && "Guide students and review their applications."}
                {currentUser.role === "recruiter" && "Find talented candidates and manage your job postings."}
              </p>
            </div>
            {currentUser.role === "placement_staff" && (
              <Button
                variant={showAnalytics ? "default" : "outline"}
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {showAnalytics ? "Hide Analytics" : "Show Analytics"}
              </Button>
            )}
          </div>

          {currentUser.role === "placement_staff" && showAnalytics ? (
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <PlacementStaffDashboard user={currentUser} />
              </TabsContent>
              <TabsContent value="analytics">
                <RealTimeAnalytics user={currentUser} />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {currentUser.role === "student" && <StudentDashboard user={currentUser} />}
              {currentUser.role === "placement_staff" && <PlacementStaffDashboard user={currentUser} />}
              {currentUser.role === "faculty_mentor" && <FacultyMentorDashboard user={currentUser} />}
              {currentUser.role === "recruiter" && <RecruiterDashboard user={currentUser} />}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
