// Authentication and user role management
export type UserRole = "student" | "placement_staff" | "faculty_mentor" | "recruiter"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  department?: string
  year?: number // For students
  company?: string // For recruiters
}

// Mock authentication - in a real app, this would connect to your auth provider
export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.student@university.edu",
    name: "John Smith",
    role: "student",
    department: "Computer Science",
    year: 3,
    avatar: "/diverse-students-studying.png",
  },
  {
    id: "2",
    email: "sarah.staff@university.edu",
    name: "Sarah Johnson",
    role: "placement_staff",
    department: "Placement Cell",
    avatar: "/diverse-office-staff.png",
  },
  {
    id: "3",
    email: "dr.mentor@university.edu",
    name: "Dr. Michael Brown",
    role: "faculty_mentor",
    department: "Computer Science",
    avatar: "/diverse-professor-lecturing.png",
  },
  {
    id: "4",
    email: "recruiter@techcorp.com",
    name: "Emily Davis",
    role: "recruiter",
    company: "TechCorp Inc.",
    avatar: "/recruiter-meeting.png",
  },
]

export const getCurrentUser = (): User | null => {
  // In a real app, this would get the current user from your auth system
  // For demo purposes, we'll return the first student
  return mockUsers[0]
}

export const login = async (email: string, password: string): Promise<User | null> => {
  // Mock login - in a real app, this would authenticate with your backend
  const user = mockUsers.find((u) => u.email === email)
  return user || null
}

export const logout = async (): Promise<void> => {
  try {
    console.log("[v0] Auth logout function called")

    // Clear any stored authentication data
    if (typeof window !== "undefined") {
      localStorage.removeItem("campus-placement-user")
      localStorage.removeItem("campus-placement-token")
      sessionStorage.clear()
    }

    // In a real app, this would call your backend logout endpoint
    // await fetch('/api/auth/logout', { method: 'POST' })

    console.log("[v0] User logged out successfully")
  } catch (error) {
    console.error("[v0] Logout error:", error)
    throw error
  }
}
