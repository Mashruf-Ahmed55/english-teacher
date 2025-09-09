"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Bot, User, Settings, Volume2, RotateCcw, Lightbulb, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  corrections?: Array<{
    original: string
    corrected: string
    explanation: string
  }>
  suggestions?: string[]
}

const scenarios = [
  { id: "travel", name: "Travel & Tourism", description: "Airport, hotel, restaurant conversations" },
  { id: "business", name: "Business English", description: "Meetings, presentations, networking" },
  { id: "daily", name: "Daily Conversations", description: "Shopping, small talk, social situations" },
  { id: "interview", name: "Job Interview", description: "Practice interview questions and responses" },
  { id: "academic", name: "Academic English", description: "University discussions, presentations" },
  { id: "medical", name: "Medical Situations", description: "Doctor visits, health conversations" },
]

const difficultyLevels = [
  { id: "beginner", name: "Beginner", description: "Simple vocabulary, basic grammar" },
  { id: "intermediate", name: "Intermediate", description: "Moderate complexity, varied topics" },
  { id: "advanced", name: "Advanced", description: "Complex discussions, nuanced language" },
]

export default function ChatTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI English tutor. I'm here to help you practice conversations and improve your English skills. What would you like to talk about today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Let's practice ordering food at a restaurant",
        "I'd like to practice job interview questions",
        "Can we have a casual conversation?",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedScenario, setSelectedScenario] = useState("daily")
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate")
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateAIResponse = (userMessage: string): Message => {
    // Simulate AI processing with corrections and suggestions
    const corrections = []
    const suggestions = []

    // Simple grammar correction simulation
    if (userMessage.toLowerCase().includes("i are")) {
      corrections.push({
        original: "I are",
        corrected: "I am",
        explanation: "Use 'I am' instead of 'I are'. The verb 'to be' conjugates as 'I am'.",
      })
    }

    // Add contextual suggestions based on scenario
    if (selectedScenario === "travel") {
      suggestions.push("Try asking about local attractions", "Practice asking for directions")
    } else if (selectedScenario === "business") {
      suggestions.push("Let's discuss your professional goals", "Practice presenting an idea")
    }

    const responses = [
      "That's a great question! Let me help you with that. Can you tell me more about your experience?",
      "I understand what you're saying. Here's how I would approach that situation...",
      "Excellent! Your English is improving. Let's try using some more advanced vocabulary.",
      "That's a good start. Let me suggest a more natural way to express that idea.",
      "Perfect! You're using the grammar correctly. Now let's work on pronunciation.",
    ]

    return {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: "ai",
      timestamp: new Date(),
      corrections: corrections.length > 0 ? corrections : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(inputMessage)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetConversation = () => {
    setMessages([
      {
        id: "1",
        content: `Great! Let's start a new conversation. I've set the scenario to "${scenarios.find((s) => s.id === selectedScenario)?.name}" at ${difficultyLevels.find((d) => d.id === selectedDifficulty)?.name} level. How can I help you practice today?`,
        sender: "ai",
        timestamp: new Date(),
        suggestions: [
          "Let's begin with a roleplay",
          "I have a specific question",
          "Can you give me a conversation starter?",
        ],
      },
    ])
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
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">AI Chat Tutor</h1>
                  <p className="text-sm text-muted-foreground">
                    {scenarios.find((s) => s.id === selectedScenario)?.name} •{" "}
                    {difficultyLevels.find((d) => d.id === selectedDifficulty)?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetConversation}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className={`lg:col-span-1 space-y-4 ${showSettings ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scenario</label>
                  <div className="space-y-2">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          id={scenario.id}
                          name="scenario"
                          value={scenario.id}
                          checked={selectedScenario === scenario.id}
                          onChange={(e) => setSelectedScenario(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={scenario.id} className="text-sm font-medium cursor-pointer">
                            {scenario.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{scenario.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                  <div className="space-y-2">
                    {difficultyLevels.map((level) => (
                      <div key={level.id} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          id={level.id}
                          name="difficulty"
                          value={level.id}
                          checked={selectedDifficulty === level.id}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={level.id} className="text-sm font-medium cursor-pointer">
                            {level.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Messages sent:</span>
                  <span className="font-medium">{messages.filter((m) => m.sender === "user").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Corrections made:</span>
                  <span className="font-medium">
                    {messages.reduce((acc, m) => acc + (m.corrections?.length || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Session time:</span>
                  <span className="font-medium">12 min</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex space-x-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <Avatar className="h-8 w-8">
                          {message.sender === "ai" ? (
                            <>
                              <div className="bg-primary rounded-full p-1">
                                <Bot className="h-4 w-4 text-primary-foreground" />
                              </div>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/user-avatar.jpg" />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div className="space-y-2">
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>

                          {/* Grammar Corrections */}
                          {message.corrections && message.corrections.length > 0 && (
                            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 space-y-2">
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="h-4 w-4 text-accent" />
                                <span className="text-sm font-medium">Grammar Correction</span>
                              </div>
                              {message.corrections.map((correction, index) => (
                                <div key={index} className="text-sm">
                                  <p>
                                    <span className="line-through text-muted-foreground">{correction.original}</span>
                                    {" → "}
                                    <span className="text-accent font-medium">{correction.corrected}</span>
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">{correction.explanation}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* AI Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Lightbulb className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Suggestions</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-auto py-1 px-2 bg-transparent"
                                    onClick={() => setInputMessage(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex space-x-3 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <div className="bg-primary rounded-full p-1">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Press Enter to send, Shift+Enter for new line</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
