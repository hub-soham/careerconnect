"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, BookOpen, Building2, Sparkles } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string, role: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && selectedRole) {
      onLogin(email, selectedRole)
    }
  }

  const roleOptions = [
    { value: "student", label: "Student", icon: GraduationCap, description: "Access your placement dashboard" },
    { value: "placement_staff", label: "Placement Staff", icon: Users, description: "Manage placements and students" },
    { value: "faculty_mentor", label: "Faculty Mentor", icon: BookOpen, description: "Guide and mentor students" },
    { value: "recruiter", label: "Recruiter", icon: Building2, description: "Find and hire talent" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-2xl font-bold text-balance">CareerConnect</CardTitle>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <CardDescription className="text-pretty">Your comprehensive campus placement portal</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="role" className="text-sm font-medium">
                Select Your Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your role to continue" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => {
                    const Icon = role.icon
                    return (
                      <SelectItem key={role.value} value={role.value} className="py-3">
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your institutional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium">
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">Demo Access</p>
              <p className="text-xs text-muted-foreground text-pretty">
                Use any email address with your selected role to explore the platform
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
