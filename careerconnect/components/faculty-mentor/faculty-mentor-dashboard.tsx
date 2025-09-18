"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  CheckCircle,
  Clock,
  Calendar,
  MessageSquare,
  FileText,
  Star,
  TrendingUp,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  BookOpen,
  Award,
  Target,
} from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface FacultyMentorDashboardProps {
  user: UserType
}

// Mock data for approval requests
const mockApprovalRequests = [
  {
    id: "1",
    studentName: "Varad Chavan",
    studentId: "CS2021001",
    opportunity: "Software Engineer Intern",
    company: "TechCorp Inc.",
    requestType: "application_approval",
    submittedDate: "2024-01-20",
    status: "pending",
    documents: ["resume.pdf", "cover_letter.pdf"],
    gpa: "3.8",
    year: 3,
  },
  {
    id: "2",
    studentName: "Sarah Johnson",
    studentId: "CS2021002",
    opportunity: "Data Science Intern",
    company: "DataFlow Solutions",
    requestType: "interview_preparation",
    submittedDate: "2024-01-22",
    status: "pending",
    documents: ["portfolio.pdf"],
    gpa: "3.9",
    year: 4,
  },
  {
    id: "3",
    studentName: "Mike Wilson",
    studentId: "CS2021003",
    opportunity: "Full Stack Developer",
    company: "StartupXYZ",
    requestType: "recommendation_letter",
    submittedDate: "2024-01-18",
    status: "approved",
    documents: ["transcript.pdf"],
    gpa: "3.7",
    year: 4,
  },
]

// Mock mentee data
const mockMentees = [
  {
    id: "1",
    name: "Varad Chavan",
    studentId: "CS2021001",
    year: 3,
    gpa: "3.8",
    avatar: "/diverse-students-studying.png",
    applications: 3,
    interviews: 1,
    lastMeeting: "2024-01-15",
    progress: 75,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    studentId: "CS2021002",
    year: 4,
    gpa: "3.9",
    avatar: "/diverse-students-studying.png",
    applications: 5,
    interviews: 3,
    lastMeeting: "2024-01-18",
    progress: 90,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    studentId: "CS2021003",
    year: 4,
    gpa: "3.7",
    avatar: "/diverse-students-studying.png",
    applications: 2,
    interviews: 1,
    lastMeeting: "2024-01-10",
    progress: 60,
    status: "needs_attention",
  },
]

// Mock interview schedule
const mockInterviews = [
  {
    id: "1",
    studentName: "Varad Chavan",
    company: "TechCorp Inc.",
    position: "Software Engineer Intern",
    date: "2024-02-05",
    time: "2:00 PM",
    type: "Technical Interview",
    status: "scheduled",
    preparationStatus: "in_progress",
  },
  {
    id: "2",
    studentName: "Sarah Johnson",
    company: "DataFlow Solutions",
    position: "Data Science Intern",
    date: "2024-02-08",
    time: "10:00 AM",
    type: "HR Interview",
    status: "scheduled",
    preparationStatus: "completed",
  },
  {
    id: "3",
    studentName: "Mike Wilson",
    company: "StartupXYZ",
    position: "Full Stack Developer",
    date: "2024-02-03",
    time: "3:30 PM",
    type: "Final Round",
    status: "completed",
    preparationStatus: "completed",
  },
]

export function FacultyMentorDashboard({ user }: FacultyMentorDashboardProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "needs_attention":
        return "bg-orange-100 text-orange-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <ThumbsDown className="w-4 h-4" />
      case "needs_attention":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleApproval = (requestId: string, action: "approve" | "reject") => {
    console.log(`${action} request ${requestId}`)
    // In a real app, this would update the backend
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
                <p className="text-2xl font-bold">{mockMentees.length}</p>
                <p className="text-sm text-muted-foreground">Active Mentees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockApprovalRequests.filter((req) => req.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockInterviews.filter((interview) => interview.status === "scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="approvals">Approval Requests</TabsTrigger>
          <TabsTrigger value="mentees">My Mentees</TabsTrigger>
          <TabsTrigger value="interviews">Interview Calendar</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Approval Requests
              </CardTitle>
              <CardDescription>Review and approve student applications and requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockApprovalRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-balance">{request.studentName}</h3>
                            <Badge variant="outline">{request.studentId}</Badge>
                            <Badge className={getStatusColor(request.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(request.status)}
                                {request.status.toUpperCase()}
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p>
                                <strong>Position:</strong> {request.opportunity}
                              </p>
                              <p>
                                <strong>Company:</strong> {request.company}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>GPA:</strong> {request.gpa}
                              </p>
                              <p>
                                <strong>Year:</strong> {request.year}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              <strong>Request Type:</strong> {request.requestType.replace("_", " ").toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Submitted:</strong> {request.submittedDate}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Documents:</p>
                            <div className="flex gap-2 mt-1">
                              {request.documents.map((doc) => (
                                <Badge key={doc} variant="secondary" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        {request.status === "pending" && (
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={() => handleApproval(request.id, "reject")}>
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" onClick={() => handleApproval(request.id, "approve")}>
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Mentees
              </CardTitle>
              <CardDescription>Track and guide your assigned students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockMentees.map((mentee) => (
                  <Card key={mentee.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} />
                          <AvatarFallback>
                            {mentee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-balance">{mentee.name}</h3>
                            <Badge className={getStatusColor(mentee.status)}>
                              {mentee.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{mentee.studentId}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <p>
                              <strong>Year:</strong> {mentee.year}
                            </p>
                            <p>
                              <strong>GPA:</strong> {mentee.gpa}
                            </p>
                            <p>
                              <strong>Applications:</strong> {mentee.applications}
                            </p>
                            <p>
                              <strong>Interviews:</strong> {mentee.interviews}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{mentee.progress}%</span>
                        </div>
                        <Progress value={mentee.progress} className="w-full" />
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">Last meeting: {mentee.lastMeeting}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Schedule
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
                Interview Calendar
              </CardTitle>
              <CardDescription>Manage interview schedules and preparation sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInterviews.map((interview) => (
                  <Card key={interview.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-balance">{interview.studentName}</h3>
                          <p className="text-muted-foreground">{interview.position}</p>
                          <p className="text-sm text-muted-foreground">{interview.company}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(interview.status)}>{interview.status.toUpperCase()}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{interview.type}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p className="text-sm text-muted-foreground">
                            {interview.date} at {interview.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Preparation Status</p>
                          <Badge
                            variant="outline"
                            className={
                              interview.preparationStatus === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {interview.preparationStatus.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Prep Session
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Send Tips
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Provide Feedback
                </CardTitle>
                <CardDescription>Evaluate student performance and provide guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-select">Select Student</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMentees.map((mentee) => (
                        <SelectItem key={mentee.id} value={mentee.id}>
                          {mentee.name} ({mentee.studentId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evaluation-type">Evaluation Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evaluation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interview_prep">Interview Preparation</SelectItem>
                      <SelectItem value="resume_review">Resume Review</SelectItem>
                      <SelectItem value="skill_assessment">Skill Assessment</SelectItem>
                      <SelectItem value="career_guidance">Career Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Overall Rating</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate performance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                      <SelectItem value="2">⭐⭐ Below Average</SelectItem>
                      <SelectItem value="1">⭐ Needs Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-text">Detailed Feedback</Label>
                  <Textarea
                    id="feedback-text"
                    placeholder="Provide detailed feedback and recommendations..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action-items">Action Items</Label>
                  <Textarea id="action-items" placeholder="List specific action items for improvement..." rows={3} />
                </div>

                <Button className="w-full">
                  <Award className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recent Evaluations
                </CardTitle>
                <CardDescription>Track feedback history and student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-l-green-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-balance">Varad Chavan - Interview Preparation</h3>
                        <p className="text-sm text-muted-foreground">January 20, 2024</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                    <p className="text-sm text-pretty">
                      Excellent technical knowledge and communication skills. Needs to work on confidence during
                      behavioral questions.
                    </p>
                  </div>

                  <div className="border-l-4 border-l-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-balance">Sarah Johnson - Resume Review</h3>
                        <p className="text-sm text-muted-foreground">January 18, 2024</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">5.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-pretty">
                      Outstanding resume with strong project portfolio. Ready for senior-level positions.
                    </p>
                  </div>

                  <div className="border-l-4 border-l-orange-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-balance">Mike Wilson - Skill Assessment</h3>
                        <p className="text-sm text-muted-foreground">January 15, 2024</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">3.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-pretty">
                      Good foundational knowledge but needs more practice with advanced algorithms and system design.
                    </p>
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
