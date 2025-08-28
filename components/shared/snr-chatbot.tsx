"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bot, Send, User, Sparkles } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"

interface Message {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: string
}

interface SNRChatbotProps {
  userRole: 'employee' | 'executive'
}

export function SNRChatbot({ userRole }: SNRChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm SNR AI, your intelligent assistant. I'm here to help you with ${userRole === 'employee' ? 'task management, content creation, and workflow optimization' : 'strategic decisions, team insights, and business analytics'}. What can I help you with today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const suggestedQuestions = userRole === 'employee' 
    ? [
        "How do I create an engaging Instagram Reel script?",
        "What are the best practices for client testimonial videos?",
        "How can I improve my task completion rate?",
        "What equipment do I need for outdoor shoots?"
      ]
    : [
        "What's our current lead conversion rate?",
        "Which team member has the highest productivity?",
        "How can we improve our revenue per client?",
        "What are the latest market trends in our industry?"
      ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const getCurrentTime = () => {
      const now = new Date()
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: getCurrentTime()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = userRole === 'employee' 
        ? [
            "Great question! For Instagram Reels, focus on a strong hook in the first 3 seconds, keep it under 30 seconds, and always include a clear call-to-action. Would you like me to help you draft a script?",
            "I can help you optimize your workflow! Based on your current tasks, I recommend prioritizing the TechCorp script first, then moving to the video editing. Would you like me to create a detailed schedule?",
            "For client testimonials, ensure good lighting, ask open-ended questions about results, and capture genuine emotions. I can provide you with a question template if needed.",
            "I notice you have several pending tasks. Would you like me to help prioritize them based on deadlines and importance?"
          ]
        : [
            "Based on current data, your lead conversion rate is 23.7%, which is above industry average. The top performing source is LinkedIn with 34% conversion. Would you like a detailed breakdown?",
            "Sarah Johnson in the Creative team has the highest productivity at 94.2% efficiency. She's completed 47 tasks this month with an average turnaround of 1.2 days. Would you like to see her full performance report?",
            "To improve revenue per client, I recommend focusing on upselling automation packages and extending contract terms. Current average is $85K per client. Would you like specific strategies?",
            "Current market trends show 67% increase in AI content demand and 45% growth in video marketing. This presents opportunities for service expansion. Shall I prepare a market analysis report?"
          ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: randomResponse,
        timestamp: getCurrentTime()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black shadow-lg z-50"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <div className="relative overflow-hidden">
          <BorderBeam duration={20} size={150} colorFrom="#FFD700" colorTo="#FFA500" />
          
          <DialogHeader className="p-6 border-b bg-gradient-to-r from-yellow-50 to-orange-50">
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                <Bot className="h-6 w-6 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold">SNR AI Assistant</span>
                <p className="text-sm text-gray-600 font-normal">
                  Your intelligent {userRole} support system
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-b bg-gray-50">
              <p className="text-sm font-medium mb-3">Suggested questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-3 text-xs"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <Sparkles className="h-3 w-3 mr-2 text-yellow-600" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 h-[300px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'bot' && (
                    <Avatar className="h-8 w-8 border-2 border-yellow-400">
                      <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl p-3 ${
                      message.type === 'user' 
                        ? 'bg-yellow-500 text-black ml-auto' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <Avatar className="h-8 w-8 border-2 border-gray-300">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 border-2 border-yellow-400">
                    <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%]">
                    <div className="rounded-2xl p-3 bg-gray-100">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Ask SNR AI anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-gray-300 focus:border-yellow-500"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}