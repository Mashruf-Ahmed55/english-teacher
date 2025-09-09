"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, Trophy, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  type: "multiple-choice" | "fill-blank" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  userAnswer?: string | number
  isCorrect?: boolean
}

interface QuizData {
  id: string
  title: string
  description: string
  timeLimit: number
  questions: Question[]
}

const sampleQuiz: QuizData = {
  id: "past-perfect-quiz",
  title: "Past Perfect Tense Quiz",
  description: "Test your understanding of past perfect tense usage and formation",
  timeLimit: 20,
  questions: [
    {
      id: "1",
      type: "multiple-choice",
      question: "Choose the correct past perfect form: 'By the time I arrived, they _____ already left.'",
      options: ["have", "had", "has", "having"],
      correctAnswer: 1,
      explanation: "We use 'had' + past participle to form the past perfect tense.",
    },
    {
      id: "2",
      type: "fill-blank",
      question: "Fill in the blank: 'She _____ never _____ such a beautiful sunset before.'",
      correctAnswer: "had seen",
      explanation: "Past perfect is formed with 'had' + past participle. 'Seen' is the past participle of 'see'.",
    },
    {
      id: "3",
      type: "true-false",
      question: "True or False: Past perfect is used for actions that happened before another past action.",
      correctAnswer: 0, // 0 for true, 1 for false
      explanation: "True. Past perfect shows that one action was completed before another action in the past.",
    },
    {
      id: "4",
      type: "multiple-choice",
      question: "Which sentence uses past perfect correctly?",
      options: [
        "I had finished my homework when my friend called.",
        "I have finished my homework when my friend called.",
        "I finished my homework when my friend had called.",
        "I was finishing my homework when my friend called.",
      ],
      correctAnswer: 0,
      explanation: "The first sentence correctly shows that finishing homework was completed before the friend called.",
    },
    {
      id: "5",
      type: "fill-blank",
      question: "Complete the sentence: 'The movie _____ already _____ when we got to the theater.'",
      correctAnswer: "had started",
      explanation: "Use 'had' + past participle to show the movie started before they arrived at the theater.",
    },
  ],
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz] = useState<QuizData>(sampleQuiz)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>([])
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60) // Convert to seconds
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState<string | number>("")

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, quizCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string | number) => {
    setCurrentAnswer(answer)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = currentAnswer
    setUserAnswers(newAnswers)
    setCurrentAnswer("")

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(userAnswers[currentQuestion - 1] || "")
    }
  }

  const calculateResults = () => {
    const results = quiz.questions.map((question, index) => {
      const userAnswer = userAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer
      return {
        ...question,
        userAnswer,
        isCorrect,
      }
    })

    const correctCount = results.filter((q) => q.isCorrect).length
    const score = Math.round((correctCount / quiz.questions.length) * 100)

    return { results, correctCount, score }
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(quiz.timeLimit * 60)
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowResults(false)
    setCurrentQuestion(0)
    setUserAnswers([])
    setCurrentAnswer("")
    setTimeLeft(quiz.timeLimit * 60)
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/lessons">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-2xl font-bold">{quiz.questions.length}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-2xl font-bold">{quiz.timeLimit}</p>
                    <p className="text-sm text-muted-foreground">Minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Instructions:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Read each question carefully before answering</li>
                    <li>• You can navigate between questions using the Previous/Next buttons</li>
                    <li>• Your progress is saved automatically</li>
                    <li>• Submit your quiz before time runs out</li>
                  </ul>
                </div>

                <Button className="w-full" size="lg" onClick={startQuiz}>
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted && !showResults) {
    const { results, correctCount, score } = calculateResults()

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/lessons">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">Quiz Results</h1>
                <p className="text-sm text-muted-foreground">{quiz.title}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Results Summary */}
            <Card>
              <CardHeader className="text-center">
                <div
                  className={`rounded-full p-4 w-16 h-16 mx-auto mb-4 ${score >= 70 ? "bg-green-100" : "bg-red-100"}`}
                >
                  {score >= 70 ? (
                    <Trophy className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-3xl font-bold">{score}%</CardTitle>
                <CardDescription>
                  You got {correctCount} out of {quiz.questions.length} questions correct
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={score} className="h-3" />
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setShowResults(true)}>Review Answers</Button>
                  <Button variant="outline" onClick={restartQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const { results } = calculateResults()

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/lessons">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Lessons
                  </Button>
                </Link>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Answer Review</h1>
                  <p className="text-sm text-muted-foreground">{quiz.title}</p>
                </div>
              </div>
              <Button variant="outline" onClick={restartQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {results.map((question, index) => (
              <Card
                key={question.id}
                className={`border-l-4 ${question.isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">Question {index + 1}</CardTitle>
                      <CardDescription className="mt-2">{question.question}</CardDescription>
                    </div>
                    {question.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.type === "multiple-choice" && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded border ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-100 border-green-300"
                              : optionIndex === question.userAnswer
                                ? "bg-red-100 border-red-300"
                                : "bg-muted border-border"
                          }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <Badge variant="secondary" className="ml-2">
                              Correct
                            </Badge>
                          )}
                          {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && (
                            <Badge variant="destructive" className="ml-2">
                              Your Answer
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "fill-blank" && (
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-green-100 border border-green-300">
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                      </div>
                      {question.userAnswer && question.userAnswer !== question.correctAnswer && (
                        <div className="p-2 rounded bg-red-100 border border-red-300">
                          <strong>Your Answer:</strong> {question.userAnswer}
                        </div>
                      )}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-2">
                      <div
                        className={`p-2 rounded border ${question.correctAnswer === 0 ? "bg-green-100 border-green-300" : "bg-muted border-border"}`}
                      >
                        True{" "}
                        {question.correctAnswer === 0 && (
                          <Badge variant="secondary" className="ml-2">
                            Correct
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`p-2 rounded border ${question.correctAnswer === 1 ? "bg-green-100 border-green-300" : "bg-muted border-border"}`}
                      >
                        False{" "}
                        {question.correctAnswer === 1 && (
                          <Badge variant="secondary" className="ml-2">
                            Correct
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-sm">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-lg font-bold text-foreground">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeLeft < 300 ? "text-red-500 font-medium" : ""}>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {question.type === "multiple-choice" && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        currentAnswer === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {question.type === "fill-blank" && (
                <div>
                  <input
                    type="text"
                    value={currentAnswer as string}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              {question.type === "true-false" && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleAnswerSelect(0)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      currentAnswer === 0 ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleAnswerSelect(1)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      currentAnswer === 1 ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                  >
                    False
                  </button>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button onClick={handleNextQuestion} disabled={currentAnswer === ""}>
                  {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
