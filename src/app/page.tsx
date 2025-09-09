'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  MessageCircle,
  PenTool,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary rounded-full p-3">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                English Teacher AI
              </h1>
              <p className="text-muted-foreground mt-2">
                Your personal AI-powered English learning companion
              </p>
            </div>
          </div>

          {/* Authentication Tabs */}
          <Card className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one to start learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setIsAuthenticated(true)}
                  >
                    Sign In
                  </Button>
                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">English Level</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setIsAuthenticated(true)}
                  >
                    Create Account
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-2">
              <MessageCircle className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">AI Chat Tutor</p>
            </div>
            <div className="space-y-2">
              <PenTool className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Writing Assistant</p>
            </div>
            <div className="space-y-2">
              <BookOpen className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Grammar Lessons</p>
            </div>
            <div className="space-y-2">
              <Trophy className="h-6 w-6 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Progress Tracking</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard (placeholder for now)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-primary rounded-full p-2">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  English Teacher AI
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, Sarah!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to continue learning?
          </h2>
          <p className="text-muted-foreground">
            You're doing great! Keep up the momentum.
          </p>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Your Progress</span>
            </CardTitle>
            <CardDescription>
              Track your English learning journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Intermediate Level
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Grammar Mastery</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Excellent progress!
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Vocabulary</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground">Keep practicing</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/progress">
                <Button variant="outline">View Detailed Progress</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Lessons Done</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">1,247</p>
                  <p className="text-xs text-muted-foreground">XP Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">#12</p>
                  <p className="text-xs text-muted-foreground">Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Features */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Recommended for You</span>
                </CardTitle>
                <CardDescription>
                  Personalized activities based on your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/chat">
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <MessageCircle className="h-5 w-5 text-primary mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">
                              Practice Conversation
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Job Interview Scenario
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                15 min
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Intermediate
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/lessons">
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <BookOpen className="h-5 w-5 text-primary mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">Grammar Quiz</h4>
                            <p className="text-sm text-muted-foreground">
                              Past Perfect Tense
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                10 min
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Review
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Main Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/chat">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>AI Chat Tutor</span>
                    </CardTitle>
                    <CardDescription>
                      Practice conversations with your AI tutor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Recent Topics:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Travel
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Business
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Daily Life
                        </Badge>
                      </div>
                      <Button className="w-full">Continue Chatting</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/writing">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <PenTool className="h-5 w-5" />
                      <span>Writing Assistant</span>
                    </CardTitle>
                    <CardDescription>
                      Get help with grammar and writing style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Last essay score:
                        </span>
                        <span className="font-medium ml-2">8.5/10</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Essays
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Emails
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Reports
                        </Badge>
                      </div>
                      <Button className="w-full">Start Writing</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/lessons">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <BookOpen className="h-5 w-5" />
                      <span>Lessons & Quizzes</span>
                    </CardTitle>
                    <CardDescription>
                      Structured learning with instant feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Next lesson:
                        </span>
                        <span className="font-medium ml-2">Conditionals</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Quiz accuracy:</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Button className="w-full">Take Quiz</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/progress">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <Award className="h-5 w-5" />
                      <span>Progress Tracking</span>
                    </CardTitle>
                    <CardDescription>
                      Track your milestones and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span className="text-sm">Grammar Master</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">7-Day Streak</span>
                      </div>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        View Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-1">
                      <BookOpen className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Completed Grammar Quiz
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-1">
                      <MessageCircle className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Chat Session: Travel
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-1">
                      <PenTool className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Essay Review</p>
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Weekly Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">5/7</p>
                  <p className="text-sm text-muted-foreground">
                    Days completed
                  </p>
                </div>
                <Progress value={71} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  2 more days to reach your weekly goal!
                </p>
              </CardContent>
            </Card>

            {/* Word of the Day */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Word of the Day</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-bold text-lg text-primary">
                    Serendipity
                  </h4>
                  <p className="text-sm text-muted-foreground italic">noun</p>
                </div>
                <p className="text-sm">
                  The occurrence of events by chance in a happy way.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  Practice This Word
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
