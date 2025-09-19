"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Building2, Briefcase, CheckCircle, Clock, Activity } from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface RealTimeAnalyticsProps {
  user: UserType
}

// Mock real-time data
const mockRealTimeData = {
  activeUsers: 247,
  onlineRecruiters: 12,
  todayApplications: 18,
  interviewsScheduled: 5,
  placementsThisWeek: 3,
  systemHealth: 98,
}

const applicationTrends = [
  { time: "00:00", applications: 0, interviews: 0 },
  { time: "04:00", applications: 2, interviews: 0 },
  { time: "08:00", applications: 8, interviews: 1 },
  { time: "12:00", applications: 15, interviews: 3 },
  { time: "16:00", applications: 18, interviews: 5 },
  { time: "20:00", applications: 16, interviews: 4 },
  { time: "24:00", applications: 12, interviews: 2 },
]

const departmentActivity = [
  { name: "Computer Science", applications: 45, color: "#15803d" },
  { name: "Electronics", applications: 28, color: "#84cc16" },
  { name: "Mechanical", applications: 22, color: "#dc2626" },
  { name: "Business", applications: 18, color: "#6366f1" },
  { name: "Civil", applications: 12, color: "#f59e0b" },
]

const placementMetrics = [
  { month: "Jan", target: 50, achieved: 42, efficiency: 84 },
  { month: "Feb", target: 60, achieved: 55, efficiency: 92 },
  { month: "Mar", target: 45, achieved: 38, efficiency: 84 },
  { month: "Apr", target: 70, achieved: 68, efficiency: 97 },
  { month: "May", target: 55, achieved: 52, efficiency: 95 },
  { month: "Jun", target: 80, achieved: 75, efficiency: 94 },
]

export function RealTimeAnalytics({ user }: RealTimeAnalyticsProps) {
  const [liveData, setLiveData] = useState(mockRealTimeData)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        todayApplications: prev.todayApplications + Math.floor(Math.random() * 3),
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + Math.random() * 2 - 1)),
      }))
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "users":
        return <Users className="w-5 h-5" />
      case "applications":
        return <Briefcase className="w-5 h-5" />
      case "interviews":
        return <Clock className="w-5 h-5" />
      case "placements":
        return <CheckCircle className="w-5 h-5" />
      case "health":
        return <Activity className="w-5 h-5" />
      default:
        return <TrendingUp className="w-5 h-5" />
    }
  }

  const getChangeIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    const isPositive = change > 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span className="text-xs font-medium">{Math.abs(change).toFixed(1)}%</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Real-time Status Bar */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">System Status: Live</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {liveData.systemHealth}% Uptime
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">{getMetricIcon("users")}</div>
              <div>
                <p className="text-2xl font-bold">{liveData.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
                {getChangeIndicator(liveData.activeUsers, 240)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{liveData.onlineRecruiters}</p>
                <p className="text-sm text-muted-foreground">Online Recruiters</p>
                {getChangeIndicator(liveData.onlineRecruiters, 10)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">{getMetricIcon("applications")}</div>
              <div>
                <p className="text-2xl font-bold">{liveData.todayApplications}</p>
                <p className="text-sm text-muted-foreground">Today's Applications</p>
                {getChangeIndicator(liveData.todayApplications, 15)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">{getMetricIcon("interviews")}</div>
              <div>
                <p className="text-2xl font-bold">{liveData.interviewsScheduled}</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                {getChangeIndicator(liveData.interviewsScheduled, 4)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">{getMetricIcon("placements")}</div>
              <div>
                <p className="text-2xl font-bold">{liveData.placementsThisWeek}</p>
                <p className="text-sm text-muted-foreground">This Week's Placements</p>
                {getChangeIndicator(liveData.placementsThisWeek, 2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Today's Activity
            </CardTitle>
            <CardDescription>Real-time application and interview trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stackId="1"
                  stroke="#15803d"
                  fill="#15803d"
                  fillOpacity={0.6}
                  name="Applications"
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stackId="1"
                  stroke="#84cc16"
                  fill="#84cc16"
                  fillOpacity={0.6}
                  name="Interviews"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Activity</CardTitle>
            <CardDescription>Application distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentActivity}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="applications"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentActivity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Performance</CardTitle>
          <CardDescription>Monthly targets vs achievements with efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={placementMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              <Bar dataKey="achieved" fill="#15803d" name="Achieved" />
              <Line type="monotone" dataKey="efficiency" stroke="#84cc16" strokeWidth={2} name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Database Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Query Response Time</span>
                <span className="text-sm font-medium">45ms</span>
              </div>
              <Progress value={85} className="w-full" />
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Server Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <Progress value={32} className="w-full" />
              <p className="text-xs text-muted-foreground">Normal load</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Rating</span>
                <span className="text-sm font-medium">4.7/5</span>
              </div>
              <Progress value={94} className="w-full" />
              <p className="text-xs text-muted-foreground">Highly satisfied users</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
