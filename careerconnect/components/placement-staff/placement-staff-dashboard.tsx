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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Users,
  Building2,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface PlacementStaffDashboardProps {
  user: UserType
}

// Mock data for analytics
const placementStats = [
  { month: "Jan", applications: 45, placements: 12 },
  { month: "Feb", applications: 52, placements: 18 },
  { month: "Mar", applications: 38, placements: 15 },
  { month: "Apr", applications: 61, placements: 22 },
  { month: "May", applications: 55, placements: 19 },
  { month: "Jun", applications: 67, placements: 28 },
]

const departmentData = [
  { name: "Computer Science", value: 35, color: "#15803d" },
  { name: "Electronics", value: 25, color: "#84cc16" },
  { name: "Mechanical", value: 20, color: "#dc2626" },
  { name: "Civil", value: 15, color: "#6366f1" },
  { name: "Others", value: 5, color: "#f59e0b" },
]

// Mock opportunities data
const mockOpportunities = [
  {
    id: "1",
    title: "Software Engineer Intern",
    company: "TechCorp Inc.",
    type: "Internship",
    applications: 24,
    deadline: "2024-02-15",
    status: "active",
    postedDate: "2024-01-10",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataFlow Solutions",
    type: "Internship",
    applications: 18,
    deadline: "2024-02-20",
    status: "active",
    postedDate: "2024-01-15",
  },
  {
    id: "3",
    title: "Marketing Associate",
    company: "BrandCorp",
    type: "Full-time",
    applications: 31,
    deadline: "2024-01-30",
    status: "closed",
    postedDate: "2024-01-05",
  },
]

// Mock student applications data
const mockStudentApplications = [
  {
    id: "1",
    studentName: "Varad Chavan",
    studentId: "CS2021001",
    department: "Computer Science",
    year: 3,
    gpa: "3.8",
    opportunity: "Software Engineer Intern",
    company: "TechCorp Inc.",
    status: "under_review",
    appliedDate: "2024-01-15",
  },
  {
    id: "2",
    studentName: "Sarah Johnson",
    studentId: "CS2021002",
    department: "Computer Science",
    year: 4,
    gpa: "3.9",
    opportunity: "Data Science Intern",
    company: "DataFlow Solutions",
    status: "accepted",
    appliedDate: "2024-01-20",
  },
  {
    id: "3",
    studentName: "Mike Wilson",
    studentId: "EC2021001",
    department: "Electronics",
    year: 3,
    gpa: "3.7",
    opportunity: "Software Engineer Intern",
    company: "TechCorp Inc.",
    status: "rejected",
    appliedDate: "2024-01-18",
  },
]

export function PlacementStaffDashboard({ user }: PlacementStaffDashboardProps) {
  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredApplications = mockStudentApplications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.opportunity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "under_review":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "closed":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
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
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Active Companies</p>
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
                <p className="text-2xl font-bold">73</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">Placements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Opportunities</CardTitle>
                  <CardDescription>Post and manage job opportunities for students</CardDescription>
                </div>
                <Dialog open={isCreateOpportunityOpen} onOpenChange={setIsCreateOpportunityOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Opportunity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Opportunity</DialogTitle>
                      <DialogDescription>
                        Fill in the details to post a new job or internship opportunity
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" placeholder="e.g., Software Engineer Intern" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="e.g., TechCorp Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Job description and requirements..." rows={4} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., Mumbai, India" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stipend">Stipend/Salary</Label>
                        <Input id="stipend" placeholder="e.g., Rs.50,000/month" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsCreateOpportunityOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateOpportunityOpen(false)}>Post Opportunity</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-balance">{opportunity.title}</h3>
                          <p className="text-muted-foreground">{opportunity.company}</p>
                          <p className="text-sm text-muted-foreground">Posted: {opportunity.postedDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(opportunity.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(opportunity.status)}
                              {opportunity.status.toUpperCase()}
                            </div>
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{opportunity.applications} applications</span>
                          <span>Deadline: {opportunity.deadline}</span>
                          <Badge variant="outline">{opportunity.type}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
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
              <CardTitle>Student Applications</CardTitle>
              <CardDescription>Monitor and manage student applications across all opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by student name, opportunity, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{application.studentName}</p>
                            <p className="text-sm text-muted-foreground">{application.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{application.department}</TableCell>
                        <TableCell>{application.gpa}</TableCell>
                        <TableCell className="text-balance">{application.opportunity}</TableCell>
                        <TableCell>{application.company}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(application.status)}
                              {application.status.replace("_", " ").toUpperCase()}
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Monthly applications and successful placements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={placementStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#84cc16" name="Applications" />
                    <Bar dataKey="placements" fill="#15803d" name="Placements" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Placement distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Application Success Rate</CardTitle>
                <CardDescription>Track the success rate of applications over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={placementStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="placements"
                      stroke="#15803d"
                      strokeWidth={2}
                      name="Successful Placements"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Announcements
                </CardTitle>
                <CardDescription>Communicate with students, faculty, and recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_students">All Students</SelectItem>
                      <SelectItem value="final_year">Final Year Students</SelectItem>
                      <SelectItem value="faculty">Faculty Members</SelectItem>
                      <SelectItem value="recruiters">Recruiters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter announcement subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message..." rows={6} />
                </div>
                <Button className="w-full">Send Announcement</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Events
                </CardTitle>
                <CardDescription>Organize placement drives and information sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="e.g., TechCorp Placement Drive" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input id="event-location" placeholder="e.g., Auditorium A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea id="event-description" placeholder="Event details..." rows={4} />
                </div>
                <Button className="w-full">Schedule Event</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Track recent announcements and scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h3 className="font-semibold text-balance">Placement Drive Announcement</h3>
                  <p className="text-sm text-muted-foreground">Sent to Final Year Students • 2 hours ago</p>
                  <p className="text-sm text-pretty">TechCorp Inc. will be conducting interviews on February 15th...</p>
                </div>
                <div className="border-l-4 border-l-green-500 pl-4">
                  <h3 className="font-semibold text-balance">Resume Workshop Scheduled</h3>
                  <p className="text-sm text-muted-foreground">Event scheduled • 1 day ago</p>
                  <p className="text-sm text-pretty">
                    Professional resume writing workshop on February 8th at 2:00 PM...
                  </p>
                </div>
                <div className="border-l-4 border-l-purple-500 pl-4">
                  <h3 className="font-semibold text-balance">Application Deadline Reminder</h3>
                  <p className="text-sm text-muted-foreground">Sent to All Students • 3 days ago</p>
                  <p className="text-sm text-pretty">
                    Reminder: DataFlow Solutions internship applications due February 20th...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
