"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Clock, MessageSquare, Calendar, Briefcase, X, Settings } from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface NotificationCenterProps {
  user: UserType
}

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  category: "application" | "interview" | "deadline" | "system" | "message"
}

// Mock notifications based on user role
const getNotificationsForRole = (role: string): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Application Submitted",
      message: "Your application for Software Engineer Intern at TechCorp has been submitted successfully.",
      timestamp: "2 hours ago",
      read: false,
      category: "application",
    },
    {
      id: "2",
      type: "info",
      title: "Interview Scheduled",
      message: "Technical interview scheduled for February 5th at 2:00 PM with TechCorp Inc.",
      timestamp: "1 day ago",
      read: false,
      category: "interview",
    },
    {
      id: "3",
      type: "warning",
      title: "Application Deadline Approaching",
      message: "DataFlow Solutions internship application deadline is in 3 days.",
      timestamp: "2 days ago",
      read: true,
      category: "deadline",
    },
  ]

  switch (role) {
    case "student":
      return [
        ...baseNotifications,
        {
          id: "4",
          type: "success",
          title: "Profile Updated",
          message: "Your resume has been successfully uploaded and verified.",
          timestamp: "3 days ago",
          read: true,
          category: "system",
        },
      ]
    case "placement_staff":
      return [
        {
          id: "1",
          type: "info",
          title: "New Company Registration",
          message: "StartupXYZ has registered and posted 2 new job openings.",
          timestamp: "1 hour ago",
          read: false,
          category: "system",
        },
        {
          id: "2",
          type: "warning",
          title: "Pending Approvals",
          message: "5 student applications are waiting for faculty mentor approval.",
          timestamp: "3 hours ago",
          read: false,
          category: "application",
        },
        {
          id: "3",
          type: "success",
          title: "Placement Drive Completed",
          message: "TechCorp placement drive completed with 8 successful hires.",
          timestamp: "1 day ago",
          read: true,
          category: "system",
        },
      ]
    case "faculty_mentor":
      return [
        {
          id: "1",
          type: "warning",
          title: "Approval Request",
          message: "John Smith needs approval for Software Engineer Intern application.",
          timestamp: "30 minutes ago",
          read: false,
          category: "application",
        },
        {
          id: "2",
          type: "info",
          title: "Interview Preparation",
          message: "Sarah Johnson has scheduled interview prep session for tomorrow.",
          timestamp: "2 hours ago",
          read: false,
          category: "interview",
        },
        {
          id: "3",
          type: "success",
          title: "Student Placement",
          message: "Mike Wilson successfully placed at StartupXYZ as Full Stack Developer.",
          timestamp: "1 day ago",
          read: true,
          category: "application",
        },
      ]
    case "recruiter":
      return [
        {
          id: "1",
          type: "info",
          title: "New Applications",
          message: "3 new applications received for Software Engineer Intern position.",
          timestamp: "1 hour ago",
          read: false,
          category: "application",
        },
        {
          id: "2",
          type: "success",
          title: "Interview Completed",
          message: "Technical interview with John Smith completed successfully.",
          timestamp: "4 hours ago",
          read: false,
          category: "interview",
        },
        {
          id: "3",
          type: "warning",
          title: "Application Deadline",
          message: "Data Science Intern position deadline is tomorrow.",
          timestamp: "1 day ago",
          read: true,
          category: "deadline",
        },
      ]
    default:
      return baseNotifications
  }
}

export function NotificationCenter({ user }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(getNotificationsForRole(user.role))
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string, category: string) => {
    switch (category) {
      case "application":
        return <Briefcase className="w-4 h-4" />
      case "interview":
        return <Calendar className="w-4 h-4" />
      case "deadline":
        return <Clock className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      case "info":
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div key={notification.id} className="relative">
                  <DropdownMenuItem
                    className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type, notification.category)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-balance">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-pretty">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                    </div>
                  </DropdownMenuItem>
                  {notification.id !== notifications[notifications.length - 1].id && <Separator />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
