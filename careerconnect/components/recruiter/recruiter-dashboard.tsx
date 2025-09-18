"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Plus,
  Search,
  MessageSquare,
  Eye,
  Download,
  Calendar,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface RecruiterDashboardProps {
  user: UserType
}

// Mock job postings data
const mockJobPostings = [
  {
    id: "1",
    title: "Software Engineer Intern",
    department: "Engineering",
    type: "Internship",
    location: "Mumbai, India",
    salary: "Rs.50,000/month",
    applications: 24,
    shortlisted: 8,
    interviewed: 3,
    hired: 0,
    deadline: "2024-02-15",
    status: "active",
    postedDate: "2024-01-10",
    requirements: ["React", "Node.js", "TypeScript"],
  },
  {
    id: "2",
    title: "Data Science Intern",
    department: "Analytics",
    type: "Internship",
    location: "Bangalore, India",
    salary: "Rs.45,000/month",
    applications: 18,
    shortlisted: 6,
    interviewed: 4,
    hired: 1,
    deadline: "2024-02-20",
    status: "active",
    postedDate: "2024-01-15",
    requirements: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: "3",
    title: "Marketing Associate",
    department: "Marketing",
    type: "Full-time",
    location: "Delhi, India",
    salary: "Rs.6,50,000/year",
    applications: 31,
    shortlisted: 12,
    interviewed: 8,
    hired: 2,
    deadline: "2024-01-30",
    status: "closed",
    postedDate: "2024-01-05",
    requirements: ["Digital Marketing", "Analytics", "Communication"],
  },
]

// Mock candidate data
const mockCandidates = [
  {
    id: "1",
    name: "Varad Chavan",
    studentId: "CS2021001",
    department: "Computer Science",
    year: 3,
    gpa: "3.8",
    avatar: "/diverse-students-studying.png",
    skills: ["React", "Node.js", "TypeScript", "Python"],
    appliedPosition: "Software Engineer Intern",
    applicationDate: "2024-01-15",
    status: "shortlisted",
    resumeScore: 85,
    projects: 5,
    internships: 2,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    studentId: "CS2021002",
    department: "Computer Science",
    year: 4,
    gpa: "3.9",
    avatar: "/diverse-students-studying.png",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    appliedPosition: "Data Science Intern",
    applicationDate: "2024-01-20",
    status: "interviewed",
    resumeScore: 92,
    projects: 7,
    internships: 3,
  },
  {
    id: "3",
    name: "Mike Wilson",
    studentId: "EC2021001",
    department: "Electronics",
    year: 3,
    gpa: "3.7",
    avatar: "/diverse-students-studying.png",
    skills: ["JavaScript", "React", "MongoDB", "AWS"],
    appliedPosition: "Software Engineer Intern",
    applicationDate: "2024-01-18",
    status: "applied",
    resumeScore: 78,
    projects: 3,
    internships: 1,
  },
  {
    id: "4",
    name: "Shreya Chipde",
    studentId: "BM2021001",
    department: "Business Management",
    year: 4,
    gpa: "3.6",
    avatar: "/diverse-students-studying.png",
    skills: ["Digital Marketing", "Analytics", "SEO", "Content Strategy"],
    appliedPosition: "Marketing Associate",
    applicationDate: "2024-01-12",
    status: "hired",
    resumeScore: 88,
    projects: 4,
    internships: 2,
  },
]

export function RecruiterDashboard({ user }: RecruiterDashboardProps) {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      candidate.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || candidate.department === departmentFilter
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800"
      case "interviewed":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-purple-100 text-purple-800"
      case "applied":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "hired":
        return <CheckCircle className="w-4 h-4" />
      case "interviewed":
        return <MessageSquare className="w-4 h-4" />
      case "shortlisted":
        return <Star className="w-4 h-4" />
      case "applied":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const totalApplications = mockJobPostings.reduce((sum, job) => sum + job.applications, 0)
  const totalShortlisted = mockJobPostings.reduce((sum, job) => sum + job.shortlisted, 0)
  const totalHired = mockJobPostings.reduce((sum, job) => sum + job.hired, 0)

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockJobPostings.filter((job) => job.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalApplications}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalShortlisted}</p>
                <p className="text-sm text-muted-foreground">Shortlisted</p>
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
                <p className="text-2xl font-bold">{totalHired}</p>
                <p className="text-sm text-muted-foreground">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="candidates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="postings">Job Postings</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Candidate Pool
              </CardTitle>
              <CardDescription>Browse and filter candidates based on skills and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by name, skills, or position..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Business Management">Business Management</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Applied Position</TableHead>
                      <TableHead>Resume Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-sm text-muted-foreground">{candidate.studentId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.department}</TableCell>
                        <TableCell>{candidate.gpa}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-balance">{candidate.appliedPosition}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: `${candidate.resumeScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{candidate.resumeScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(candidate.status)}
                              {candidate.status.toUpperCase()}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="postings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Job Postings
                  </CardTitle>
                  <CardDescription>Manage your job openings and track applications</CardDescription>
                </div>
                <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Job Posting</DialogTitle>
                      <DialogDescription>Fill in the details for your new job opening</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" placeholder="e.g., Software Engineer Intern" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="e.g., Engineering" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="job-type">Job Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., Mumbai, India" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary/Stipend</Label>
                        <Input id="salary" placeholder="e.g., Rs.50,000/month" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea id="description" placeholder="Describe the role and responsibilities..." rows={4} />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="requirements">Required Skills</Label>
                        <Input id="requirements" placeholder="e.g., React, Node.js, TypeScript (comma-separated)" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsCreateJobOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateJobOpen(false)}>Post Job</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobPostings.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-balance">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Posted: {job.postedDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(job.status)}>{job.status.toUpperCase()}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{job.applications}</p>
                          <p className="text-xs text-muted-foreground">Applications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{job.shortlisted}</p>
                          <p className="text-xs text-muted-foreground">Shortlisted</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-600">{job.interviewed}</p>
                          <p className="text-xs text-muted-foreground">Interviewed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{job.hired}</p>
                          <p className="text-xs text-muted-foreground">Hired</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {job.requirements.map((req) => (
                            <Badge key={req} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            View Applications
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Schedule Interviews
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

        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Interview Schedule
              </CardTitle>
              <CardDescription>Manage upcoming interviews and candidate evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-balance">Varad Chavan - Technical Interview</h3>
                        <p className="text-muted-foreground">Software Engineer Intern Position</p>
                        <p className="text-sm text-muted-foreground">February 5, 2024 at 2:00 PM</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Send Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-balance">Sarah Johnson - Final Round</h3>
                        <p className="text-muted-foreground">Data Science Intern Position</p>
                        <p className="text-sm text-muted-foreground">February 8, 2024 at 10:00 AM</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Final Round</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Send Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Award className="w-4 h-4 mr-1" />
                        Prepare Offer
                      </Button>
                      <Button size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-balance">Shreya Chipde - Interview Completed</h3>
                        <p className="text-muted-foreground">Marketing Associate Position</p>
                        <p className="text-sm text-muted-foreground">Completed on February 1, 2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Hired</Badge>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>Interview Notes:</strong> Excellent communication skills and strong portfolio.
                        Recommended for hire.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Hiring Funnel
                </CardTitle>
                <CardDescription>Track candidate progression through your hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Applications Received</span>
                    <span className="text-2xl font-bold">{totalApplications}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shortlisted</span>
                    <span className="text-2xl font-bold">{totalShortlisted}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(totalShortlisted / totalApplications) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Interviewed</span>
                    <span className="text-2xl font-bold">
                      {mockJobPostings.reduce((sum, job) => sum + job.interviewed, 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (mockJobPostings.reduce((sum, job) => sum + job.interviewed, 0) / totalApplications) * 100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hired</span>
                    <span className="text-2xl font-bold">{totalHired}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(totalHired / totalApplications) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recruitment Metrics</CardTitle>
                <CardDescription>Key performance indicators for your recruitment process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((totalShortlisted / totalApplications) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Shortlist Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round(
                        (mockJobPostings.reduce((sum, job) => sum + job.interviewed, 0) / totalShortlisted) * 100,
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">Interview Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((totalHired / totalApplications) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Hire Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">12</p>
                    <p className="text-sm text-muted-foreground">Avg. Days to Hire</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
