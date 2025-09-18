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
import { BarChart3, Sparkles } from "lucide-react"
import { mockUsers, type User } from "@/lib/auth"

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleLogin = (email: string, role: string) => {
    // Find a mock user with the selected role
    const user = mockUsers.find((u) => u.role === role) || mockUsers[0]
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setShowAnalytics(false)
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "student":
        return "Track your applications, discover new opportunities, and manage your placement journey."
      case "placement_staff":
        return "Manage placements, monitor student progress, and coordinate with companies."
      case "faculty_mentor":
        return "Guide students through their placement process and review applications."
      case "recruiter":
        return "Find talented candidates, manage job postings, and streamline your hiring process."
      default:
        return "Welcome to your personalized dashboard."
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-balance">Welcome back, {currentUser.name}!</h1>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-pretty max-w-2xl">{getRoleDescription(currentUser.role)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Role:</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                  {currentUser.role.replace("_", " ")}
                </span>
                {currentUser.department && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{currentUser.department}</span>
                  </>
                )}
              </div>
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
