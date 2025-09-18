"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  FileText,
  Search,
  Calendar,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Upload,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface StudentDashboardProps {
  user: UserType
}

// Mock data for opportunities
const mockOpportunities = [
  {
    id: "1",
    title: "Software Engineer Intern",
    company: "TechCorp Inc.",
    location: "Mumbai, India",
    type: "Internship",
    duration: "3 months",
    stipend: "Rs.50,000/month",
    deadline: "2024-02-15",
    skills: ["React", "Node.js", "TypeScript"],
    description: "Join our engineering team to build scalable web applications.",
    status: "open",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataFlow Solutions",
    location: "Bangalore, India",
    type: "Internship",
    duration: "6 months",
    stipend: "Rs.45,000/month",
    deadline: "2024-02-20",
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Work on cutting-edge ML projects with real-world impact.",
    status: "open",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Pune, India",
    type: "Full-time",
    duration: "Permanent",
    stipend: "Rs.8,50,000/year",
    deadline: "2024-02-10",
    skills: ["JavaScript", "React", "MongoDB"],
    description: "Build the next generation of fintech applications.",
    status: "open",
  },
]

// Mock application data
const mockApplications = [
  {
    id: "1",
    opportunityId: "1",
    title: "Software Engineer Intern",
    company: "TechCorp Inc.",
    appliedDate: "2024-01-15",
    status: "under_review",
    nextStep: "Technical Interview",
    nextStepDate: "2024-02-05",
  },
  {
    id: "2",
    opportunityId: "2",
    title: "Data Science Intern",
    company: "DataFlow Solutions",
    appliedDate: "2024-01-20",
    status: "accepted",
    nextStep: "Onboarding",
    nextStepDate: "2024-02-01",
  },
  {
    id: "3",
    opportunityId: "3",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    appliedDate: "2024-01-10",
    status: "rejected",
    nextStep: null,
    nextStepDate: null,
  },
]

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [profile, setProfile] = useState({
    skills: ["React", "Node.js", "TypeScript", "Python"],
    resume: "resume.pdf",
    coverLetter: "cover-letter.pdf",
    gpa: "3.8",
    projects: 5,
  })

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || opp.type.toLowerCase() === selectedType
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "under_review":
        return <AlertCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockApplications.length}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockApplications.filter((app) => app.status === "accepted").length}
                </p>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockApplications.filter((app) => app.status === "under_review").length}
                </p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Profile Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Opportunities
              </CardTitle>
              <CardDescription>Discover internships and job opportunities tailored for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internship">Internships</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-balance">{opportunity.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-4 h-4" />
                            <span>{opportunity.company}</span>
                            <MapPin className="w-4 h-4 ml-2" />
                            <span>{opportunity.location}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{opportunity.type}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 text-pretty">{opportunity.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{opportunity.stipend}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {opportunity.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {opportunity.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track the status of your job and internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockApplications.map((application) => (
                  <Card key={application.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-balance">{application.title}</h3>
                          <p className="text-muted-foreground">{application.company}</p>
                          <p className="text-sm text-muted-foreground">Applied: {application.appliedDate}</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.replace("_", " ").toUpperCase()}
                          </div>
                        </Badge>
                      </div>

                      {application.nextStep && (
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-medium text-sm">Next Step: {application.nextStep}</p>
                          {application.nextStepDate && (
                            <p className="text-sm text-muted-foreground">Scheduled for: {application.nextStepDate}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value="Varad Chavan" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={user.department || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" value={user.year?.toString() || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Resume</Label>
                  <div className="flex items-center gap-2">
                    <Input value={profile.resume} readOnly />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Letter</Label>
                  <div className="flex items-center gap-2">
                    <Input value={profile.coverLetter} readOnly />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Add Skill
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Profile Completion</Label>
                  <Progress value={85} className="w-full" />
                  <p className="text-sm text-muted-foreground">85% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your interviews, deadlines, and important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-balance">Technical Interview - TechCorp Inc.</h3>
                        <p className="text-muted-foreground">Software Engineer Intern Position</p>
                        <p className="text-sm text-muted-foreground">February 5, 2024 at 2:00 PM</p>
                      </div>
                      <Badge variant="outline">Interview</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-balance">Application Deadline - StartupXYZ</h3>
                        <p className="text-muted-foreground">Full Stack Developer Position</p>
                        <p className="text-sm text-muted-foreground">February 10, 2024</p>
                      </div>
                      <Badge variant="destructive">Deadline</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-balance">Onboarding Session - DataFlow Solutions</h3>
                        <p className="text-muted-foreground">Data Science Intern Position</p>
                        <p className="text-sm text-muted-foreground">February 1, 2024 at 10:00 AM</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Onboarding</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
