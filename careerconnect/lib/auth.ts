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

export const mockUsers: User[] = [
  {
    id: "1",
    email: "varad.chavan@university.edu",
    name: "Varad Chavan",
    role: "student",
    department: "Computer Science",
    year: 3,
    avatar: "/diverse-student-profiles.png",
  },
  {
    id: "2",
    email: "sarah.johnson@university.edu",
    name: "Sarah Johnson",
    role: "placement_staff",
    department: "Placement Cell",
    avatar: "/placement-officer.jpg",
  },
  {
    id: "3",
    email: "dr.michael.brown@university.edu",
    name: "Dr. Michael Brown",
    role: "faculty_mentor",
    department: "Computer Science",
    avatar: "/professor-mentor.jpg",
  },
  {
    id: "4",
    email: "emily.davis@techcorp.com",
    name: "Emily Davis",
    role: "recruiter",
    company: "TechCorp Inc.",
    avatar: "/corporate-recruiter.jpg",
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
  // Mock logout
  console.log("User logged out")
}
