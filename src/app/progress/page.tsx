"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Target,
  Star,
  BookOpen,
  MessageCircle,
  PenTool,
  Trophy,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface SkillProgress {
  skill: string
  current: number
  target: number
  improvement: number
  icon: React.ReactNode
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
  progress?: number
  target?: number
}

interface StudySession {
  date: string
  activity: string
  duration: number
  score?: number
  xpEarned: number
}

const skillsData: SkillProgress[] = [
  {
    skill: "Grammar",
    current: 89,
    target: 95,
    improvement: 12,
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    skill: "Vocabulary",
    current: 72,
    target: 85,
    improvement: 8,
    icon: <Star className="h-4 w-4" />,
  },
  {
    skill: "Writing",
    current: 78,
    target: 90,
    improvement: 15,
    icon: <PenTool className="h-4 w-4" />,
  },
  {
    skill: "Speaking",
    current: 65,
    target: 80,
    improvement: 10,
    icon: <MessageCircle className="h-4 w-4" />,
  },
]

const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: <BookOpen className="h-5 w-5" />,
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: "week-streak",
    title: "Week Warrior",
    description: "Maintain a 7-day study streak",
    icon: <Trophy className="h-5 w-5" />,
    earned: true,
    earnedDate: "2024-01-22",
  },
  {
    id: "grammar-master",
    title: "Grammar Master",
    description: "Score 90% or higher on 5 grammar quizzes",
    icon: <Target className="h-5 w-5" />,
    earned: true,
    earnedDate: "2024-01-28",
  },
  {
    id: "chat-champion",
    title: "Chat Champion",
    description: "Complete 20 chat sessions",
    icon: <MessageCircle className="h-5 w-5" />,
    earned: false,
    progress: 15,
    target: 20,
  },
  {
    id: "writing-wizard",
    title: "Writing Wizard",
    description: "Write 10,000 words total",
    icon: <PenTool className="h-5 w-5" />,
    earned: false,
    progress: 7500,
    target: 10000,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: <Star className="h-5 w-5" />,
    earned: false,
    progress: 0,
    target: 1,
  },
]

const recentSessions: StudySession[] = [
  {
    date: "2024-01-30",
    activity: "Grammar Quiz: Past Perfect",
    duration: 15,
    score: 92,
    xpEarned: 150,
  },
  {
    date: "2024-01-30",
    activity: "Chat Session: Business",
    duration: 25,
    xpEarned: 200,
  },
  {
    date: "2024-01-29",
    activity: "Writing: Email Template",
    duration: 30,
    score: 85,
    xpEarned: 250,
  },
  {
    date: "2024-01-29",
    activity: "Vocabulary Practice",
    duration: 10,
    score: 88,
    xpEarned: 100,
  },
  {
    date: "2024-01-28",
    activity: "Grammar Lesson: Conditionals",
    duration: 20,
    xpEarned: 180,
  },
]

const weeklyData = [
  { day: "Mon", xp: 320, time: 45 },
  { day: "Tue", xp: 280, time: 35 },
  { day: "Wed", xp: 450, time: 60 },
  { day: "Thu", xp: 380, time: 50 },
  { day: "Fri", xp: 520, time: 70 },
  { day: "Sat", xp: 300, time: 40 },
  { day: "Sun", xp: 420, time: 55 },
]

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalXP = 1247
  const currentStreak = 7
  const totalStudyTime = 1680 // minutes
  const averageScore = 87

  const maxXP = Math.max(...weeklyData.map((d) => d.xp))
  const maxTime = Math.max(...weeklyData.map((d) => d.time))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded-full p-2">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Progress Tracking</h1>
                  <p className="text-sm text-muted-foreground">Monitor your English learning journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{totalXP.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{Math.round(totalStudyTime / 60)}h</p>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{averageScore}%</p>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Weekly Progress</span>
                  </CardTitle>
                  <CardDescription>Your XP and study time this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                      <div key={day.day} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{day.day}</span>
                          <div className="flex space-x-4">
                            <span className="text-primary">{day.xp} XP</span>
                            <span className="text-muted-foreground">{day.time}min</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <Progress value={(day.xp / maxXP) * 100} className="h-2" />
                          </div>
                          <div className="flex-1">
                            <Progress value={(day.time / maxTime) * 100} className="h-2 bg-muted" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Learning Goals</span>
                  </CardTitle>
                  <CardDescription>Track your progress towards set goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Study Goal</span>
                        <span className="font-medium">5/7 days</span>
                      </div>
                      <Progress value={71} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">2 more days to reach your goal</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly XP Target</span>
                        <span className="font-medium">3,247/5,000</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">1,753 XP remaining this month</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Grammar Mastery</span>
                        <span className="font-medium">89/95%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Almost there! Keep practicing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSessions.slice(0, 5).map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{session.activity}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.date} • {session.duration} min
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {session.score && (
                          <Badge variant="secondary" className="text-xs">
                            {session.score}%
                          </Badge>
                        )}
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary">+{session.xpEarned} XP</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((skill, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-primary/10 rounded-full p-2">{skill.icon}</div>
                      <span>{skill.skill}</span>
                    </CardTitle>
                    <CardDescription>
                      Current level: {skill.current}% • Target: {skill.target}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{skill.current}%</span>
                      </div>
                      <Progress value={skill.current} className="h-3" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">+{skill.improvement}% this month</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.target - skill.current}% to goal
                      </Badge>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Practice {skill.skill}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skill Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span>Skill Balance</span>
                </CardTitle>
                <CardDescription>Overview of your skill development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="bg-primary/10 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{skill.skill}</p>
                        <p className="text-2xl font-bold text-primary">{skill.current}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? "border-primary/50 bg-primary/5" : "border-border"}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`rounded-full p-2 ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{achievement.title}</CardTitle>
                        <CardDescription className="text-sm">{achievement.description}</CardDescription>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {achievement.earned ? (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Earned on {achievement.earnedDate}</span>
                      </div>
                    ) : achievement.progress !== undefined && achievement.target !== undefined ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Keep learning to unlock this achievement!</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Study Sessions</span>
                </CardTitle>
                <CardDescription>Detailed log of your learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            {session.activity.includes("Quiz") ? (
                              <Target className="h-4 w-4 text-primary" />
                            ) : session.activity.includes("Chat") ? (
                              <MessageCircle className="h-4 w-4 text-primary" />
                            ) : session.activity.includes("Writing") ? (
                              <PenTool className="h-4 w-4 text-primary" />
                            ) : (
                              <BookOpen className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{session.activity}</p>
                            <p className="text-sm text-muted-foreground">{session.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{session.duration} min</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        {session.score && (
                          <div className="text-center">
                            <p className="text-sm font-medium">{session.score}%</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-sm font-medium text-primary">+{session.xpEarned}</p>
                          <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Streak Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Study Streak</span>
                </CardTitle>
                <CardDescription>Your daily learning consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => {
                    const isActive = i >= 21 // Last 7 days active
                    const isToday = i === 27
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                          isToday
                            ? "bg-primary text-primary-foreground font-bold"
                            : isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Study day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted rounded"></div>
                    <span>No activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
