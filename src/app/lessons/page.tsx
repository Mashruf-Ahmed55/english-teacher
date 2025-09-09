"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Play, CheckCircle, Clock, Star, Trophy, Target, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  completed: boolean
  score?: number
  topics: string[]
  content: {
    explanation: string
    examples: string[]
    rules: string[]
  }
}

interface Quiz {
  id: string
  lessonId: string
  title: string
  questions: number
  timeLimit: number
  completed: boolean
  score?: number
  attempts: number
}

const lessons: Lesson[] = [
  {
    id: "present-simple",
    title: "Present Simple Tense",
    description: "Learn the basics of present simple tense for daily activities and facts",
    category: "Grammar",
    difficulty: "beginner",
    duration: 15,
    completed: true,
    score: 92,
    topics: ["Daily routines", "Facts", "Habits"],
    content: {
      explanation: "The present simple tense is used to describe habits, general truths, and repeated actions.",
      examples: ["I work every day.", "She speaks English fluently.", "The sun rises in the east."],
      rules: [
        "Add -s or -es to the verb for third person singular (he, she, it)",
        "Use the base form for I, you, we, they",
        "Use 'do/does' for questions and negatives",
      ],
    },
  },
  {
    id: "past-perfect",
    title: "Past Perfect Tense",
    description: "Master the past perfect tense for actions completed before another past action",
    category: "Grammar",
    difficulty: "intermediate",
    duration: 20,
    completed: false,
    topics: ["Sequence of events", "Time expressions", "Storytelling"],
    content: {
      explanation: "The past perfect tense shows that an action was completed before another action in the past.",
      examples: [
        "I had finished my homework before I watched TV.",
        "She had already left when he arrived.",
        "They had never seen such a beautiful sunset.",
      ],
      rules: [
        "Form: had + past participle",
        "Use for actions completed before another past action",
        "Often used with time expressions like 'before', 'after', 'already'",
      ],
    },
  },
  {
    id: "conditionals",
    title: "Conditional Sentences",
    description: "Understand different types of conditional sentences and their uses",
    category: "Grammar",
    difficulty: "advanced",
    duration: 25,
    completed: false,
    topics: ["If clauses", "Hypothetical situations", "Probability"],
    content: {
      explanation: "Conditional sentences express hypothetical situations and their consequences.",
      examples: [
        "If it rains, I will stay home. (First conditional)",
        "If I were rich, I would travel the world. (Second conditional)",
        "If I had studied harder, I would have passed. (Third conditional)",
      ],
      rules: [
        "First conditional: If + present simple, will + base verb",
        "Second conditional: If + past simple, would + base verb",
        "Third conditional: If + past perfect, would have + past participle",
      ],
    },
  },
  {
    id: "business-vocabulary",
    title: "Business Vocabulary",
    description: "Essential vocabulary for professional communication",
    category: "Vocabulary",
    difficulty: "intermediate",
    duration: 18,
    completed: true,
    score: 87,
    topics: ["Meetings", "Presentations", "Negotiations"],
    content: {
      explanation: "Learn key vocabulary used in business contexts and professional communication.",
      examples: [
        "Let's schedule a meeting to discuss the proposal.",
        "The quarterly report shows significant growth.",
        "We need to negotiate better terms with our suppliers.",
      ],
      rules: [
        "Use formal language in business contexts",
        "Be clear and concise in communication",
        "Learn industry-specific terminology",
      ],
    },
  },
]

const quizzes: Quiz[] = [
  {
    id: "present-simple-quiz",
    lessonId: "present-simple",
    title: "Present Simple Quiz",
    questions: 10,
    timeLimit: 15,
    completed: true,
    score: 92,
    attempts: 2,
  },
  {
    id: "past-perfect-quiz",
    lessonId: "past-perfect",
    title: "Past Perfect Quiz",
    questions: 12,
    timeLimit: 20,
    completed: false,
    attempts: 0,
  },
  {
    id: "conditionals-quiz",
    lessonId: "conditionals",
    title: "Conditionals Quiz",
    questions: 15,
    timeLimit: 25,
    completed: false,
    attempts: 0,
  },
  {
    id: "business-vocab-quiz",
    lessonId: "business-vocabulary",
    title: "Business Vocabulary Quiz",
    questions: 20,
    timeLimit: 30,
    completed: true,
    score: 87,
    attempts: 1,
  },
]

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [activeTab, setActiveTab] = useState("lessons")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const totalLessons = lessons.length
  const averageScore =
    lessons.filter((lesson) => lesson.score).reduce((acc, lesson) => acc + (lesson.score || 0), 0) /
    lessons.filter((lesson) => lesson.score).length

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedLesson(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="bg-primary rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-foreground">{selectedLesson.title}</h1>
                    <p className="text-sm text-muted-foreground">
                      {selectedLesson.category} • {selectedLesson.duration} min
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getDifficultyColor(selectedLesson.difficulty)}>{selectedLesson.difficulty}</Badge>
                {selectedLesson.completed && (
                  <Badge variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lesson Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Content</CardTitle>
                  <CardDescription>{selectedLesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Explanation */}
                  <div>
                    <h3 className="font-semibold mb-2">Explanation</h3>
                    <p className="text-muted-foreground">{selectedLesson.content.explanation}</p>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="font-semibold mb-2">Examples</h3>
                    <div className="space-y-2">
                      {selectedLesson.content.examples.map((example, index) => (
                        <div key={index} className="bg-muted p-3 rounded-lg">
                          <p className="font-mono">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="font-semibold mb-2">Key Rules</h3>
                    <ul className="space-y-2">
                      {selectedLesson.content.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">{rule}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Practice Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Practice & Assessment</CardTitle>
                  <CardDescription>Test your understanding with interactive exercises</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href={`/quiz/${quizzes.find((q) => q.lessonId === selectedLesson.id)?.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 rounded-full p-2">
                              <Target className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Take Quiz</h4>
                              <p className="text-sm text-muted-foreground">
                                {quizzes.find((q) => q.lessonId === selectedLesson.id)?.questions} questions
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Play className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Practice Exercises</h4>
                            <p className="text-sm text-muted-foreground">Interactive practice</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedLesson.completed ? (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium">Lesson Completed!</p>
                      {selectedLesson.score && (
                        <p className="text-sm text-muted-foreground">Score: {selectedLesson.score}%</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="font-medium">Ready to Learn</p>
                      <p className="text-sm text-muted-foreground">Estimated time: {selectedLesson.duration} min</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Topics Covered */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Topics Covered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Quiz */}
              {quizzes.find((q) => q.lessonId === selectedLesson.id) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Related Quiz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const quiz = quizzes.find((q) => q.lessonId === selectedLesson.id)!
                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Questions:</span>
                            <span>{quiz.questions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Limit:</span>
                            <span>{quiz.timeLimit} min</span>
                          </div>
                          {quiz.completed && quiz.score && (
                            <div className="flex justify-between text-sm">
                              <span>Best Score:</span>
                              <span className="font-medium">{quiz.score}%</span>
                            </div>
                          )}
                          <Link href={`/quiz/${quiz.id}`}>
                            <Button className="w-full" size="sm">
                              {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                            </Button>
                          </Link>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Lessons & Quizzes</h1>
                  <p className="text-sm text-muted-foreground">Structured learning with instant feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {completedLessons}/{totalLessons}
                  </p>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{Math.round(averageScore)}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
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
                  <p className="text-xl font-bold">{quizzes.filter((q) => q.completed).length}</p>
                  <p className="text-sm text-muted-foreground">Quizzes Passed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1">{lesson.title}</CardTitle>
                        <CardDescription className="text-sm">{lesson.description}</CardDescription>
                      </div>
                      {lesson.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration} min</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {lesson.topics.slice(0, 2).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {lesson.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{lesson.topics.length - 2} more
                        </Badge>
                      )}
                    </div>

                    {lesson.completed && lesson.score && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-medium">{lesson.score}%</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{lesson.category}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => {
                const lesson = lessons.find((l) => l.id === quiz.lessonId)
                return (
                  <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-1">{quiz.title}</CardTitle>
                            <CardDescription className="text-sm">Based on: {lesson?.title}</CardDescription>
                          </div>
                          {quiz.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Questions:</span>
                            <p className="font-medium">{quiz.questions}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <p className="font-medium">{quiz.timeLimit} min</p>
                          </div>
                        </div>

                        {quiz.completed && quiz.score && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Best Score:</span>
                              <span className="font-medium">{quiz.score}%</span>
                            </div>
                            <Progress value={quiz.score} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Attempts: {quiz.attempts}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
