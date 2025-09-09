"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Save,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  FileText,
  Mail,
  Briefcase,
  GraduationCap,
  BookOpen,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface Suggestion {
  id: string
  type: "grammar" | "style" | "vocabulary" | "clarity"
  text: string
  suggestion: string
  explanation: string
  position: { start: number; end: number }
  severity: "error" | "warning" | "suggestion"
}

interface WritingTemplate {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  template: string
  category: string
}

const writingTemplates: WritingTemplate[] = [
  {
    id: "essay",
    name: "Academic Essay",
    description: "Structured essay with introduction, body, and conclusion",
    icon: <GraduationCap className="h-4 w-4" />,
    category: "Academic",
    template: `Introduction:
[State your thesis and main argument here]

Body Paragraph 1:
[First supporting point with evidence]

Body Paragraph 2:
[Second supporting point with evidence]

Body Paragraph 3:
[Third supporting point with evidence]

Conclusion:
[Summarize your arguments and restate thesis]`,
  },
  {
    id: "email",
    name: "Professional Email",
    description: "Business email template with proper structure",
    icon: <Mail className="h-4 w-4" />,
    category: "Business",
    template: `Subject: [Clear and specific subject line]

Dear [Recipient's name],

[Opening paragraph - state the purpose]

[Body paragraph - provide details and context]

[Closing paragraph - call to action or next steps]

Best regards,
[Your name]`,
  },
  {
    id: "report",
    name: "Business Report",
    description: "Professional report format with sections",
    icon: <Briefcase className="h-4 w-4" />,
    category: "Business",
    template: `Executive Summary:
[Brief overview of key findings and recommendations]

Introduction:
[Background and purpose of the report]

Methodology:
[How the information was gathered]

Findings:
[Main results and data]

Recommendations:
[Suggested actions based on findings]

Conclusion:
[Summary and final thoughts]`,
  },
  {
    id: "story",
    name: "Creative Writing",
    description: "Story structure with character and plot development",
    icon: <BookOpen className="h-4 w-4" />,
    category: "Creative",
    template: `Setting:
[Describe when and where your story takes place]

Characters:
[Introduce your main characters]

Plot:
[Beginning - Set up the situation]
[Middle - Develop conflict and tension]
[End - Resolve the conflict]

Theme:
[What message or lesson does your story convey?]`,
  },
]

export default function WritingAssistantPage() {
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [writingScore, setWritingScore] = useState<number | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)
    setReadingTime(Math.ceil(words.length / 200)) // Average reading speed: 200 words per minute
  }, [text])

  const analyzeText = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions: Suggestion[] = []

      // Grammar suggestions
      if (text.includes("there is many")) {
        mockSuggestions.push({
          id: "1",
          type: "grammar",
          text: "there is many",
          suggestion: "there are many",
          explanation: "Use 'there are' with plural nouns instead of 'there is'",
          position: { start: text.indexOf("there is many"), end: text.indexOf("there is many") + 13 },
          severity: "error",
        })
      }

      // Style suggestions
      if (text.includes("very good")) {
        mockSuggestions.push({
          id: "2",
          type: "style",
          text: "very good",
          suggestion: "excellent",
          explanation: "Consider using more specific adjectives instead of 'very + adjective'",
          position: { start: text.indexOf("very good"), end: text.indexOf("very good") + 9 },
          severity: "suggestion",
        })
      }

      // Vocabulary suggestions
      if (text.includes("big")) {
        mockSuggestions.push({
          id: "3",
          type: "vocabulary",
          text: "big",
          suggestion: "substantial, significant, or considerable",
          explanation: "Consider using more precise vocabulary to enhance your writing",
          position: { start: text.indexOf("big"), end: text.indexOf("big") + 3 },
          severity: "suggestion",
        })
      }

      setSuggestions(mockSuggestions)
      setWritingScore(Math.floor(Math.random() * 30) + 70) // Random score between 70-100
      setIsAnalyzing(false)
    }, 2000)
  }

  const applySuggestion = (suggestion: Suggestion) => {
    const newText =
      text.substring(0, suggestion.position.start) + suggestion.suggestion + text.substring(suggestion.position.end)
    setText(newText)
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id))
  }

  const loadTemplate = (template: WritingTemplate) => {
    setText(template.template)
    setSelectedTemplate(template.id)
    setSuggestions([])
    setWritingScore(null)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "text-destructive"
      case "warning":
        return "text-accent"
      case "suggestion":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-4 w-4" />
      case "warning":
        return <AlertCircle className="h-4 w-4" />
      case "suggestion":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
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
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Writing Assistant</h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedTemplate ? writingTemplates.find((t) => t.id === selectedTemplate)?.name : "Free Writing"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Templates & Tools */}
          <div className="lg:col-span-1 space-y-4">
            {/* Writing Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Writing Templates</CardTitle>
                <CardDescription>Choose a template to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {writingTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => loadTemplate(template)}
                  >
                    <div className="flex items-start space-x-2">
                      {template.icon}
                      <div className="text-left">
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Writing Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Writing Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Word Count:</span>
                  <span className="font-medium">{wordCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reading Time:</span>
                  <span className="font-medium">{readingTime} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Characters:</span>
                  <span className="font-medium">{text.length}</span>
                </div>
                {writingScore && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Writing Score:</span>
                        <span className="font-medium">{writingScore}/100</span>
                      </div>
                      <Progress value={writingScore} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {writingScore >= 90
                          ? "Excellent!"
                          : writingScore >= 80
                            ? "Very Good"
                            : writingScore >= 70
                              ? "Good"
                              : "Needs Improvement"}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={analyzeText}
                  disabled={!text.trim() || isAnalyzing}
                >
                  {isAnalyzing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
                  {isAnalyzing ? "Analyzing..." : "Analyze Text"}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Check Plagiarism
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Readability Score
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Writing Area */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Your Writing</CardTitle>
                  <div className="flex items-center space-x-2">
                    {suggestions.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {suggestions.length} suggestions
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full pb-4">
                <Textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start writing here... Choose a template from the sidebar or begin with your own ideas."
                  className="h-full resize-none border-0 focus-visible:ring-0 text-base leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Suggestions</span>
                </CardTitle>
                <CardDescription>
                  {suggestions.length > 0
                    ? `${suggestions.length} improvements found`
                    : "Write some text and click 'Analyze' to get suggestions"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-full px-4 pb-4">
                  {suggestions.length > 0 ? (
                    <div className="space-y-4">
                      {suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="border border-border rounded-lg p-3 space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className={getSeverityColor(suggestion.severity)}>
                              {getSeverityIcon(suggestion.severity)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {suggestion.type}
                                </Badge>
                                <Badge
                                  variant={suggestion.severity === "error" ? "destructive" : "secondary"}
                                  className="text-xs capitalize"
                                >
                                  {suggestion.severity}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium mb-1">
                                "<span className="line-through text-muted-foreground">{suggestion.text}</span>"{" → "}"
                                <span className="text-primary">{suggestion.suggestion}</span>"
                              </p>
                              <p className="text-xs text-muted-foreground mb-2">{suggestion.explanation}</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs bg-transparent"
                                onClick={() => applySuggestion(suggestion)}
                              >
                                Apply Fix
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No suggestions yet. Start writing and analyze your text to get personalized feedback.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
