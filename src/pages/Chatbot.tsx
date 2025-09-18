import React, { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, BookOpen, Brain } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: 'Hi, I am StudyBuddy. Ask me to summarize a topic, generate flashcards, or create a quiz.' }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) })

  const addAssistant = (text: string) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', text }])
  const addUser = (text: string) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text }])

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return
    addUser(content)
    setInput('')
    setTimeout(() => {
      if (/flashcard/i.test(content)) {
        addAssistant('Here are 3 example flashcards. You can save from the Flashcards page.')
      } else if (/quiz/i.test(content)) {
        addAssistant('I prepared a 10-question quiz. Go to the Quiz page to take it!')
      } else if (/summar/i.test(content)) {
        addAssistant('Summary generated. You can review key points and then take a quiz or create cards.')
      } else {
        addAssistant('I can summarize topics, generate flashcards, and create quizzes. Try the quick actions below!')
      }
    }, 500)
  }

  const quick = [
    { label: 'Summarize', icon: Sparkles, text: 'Summarize the topic: ' },
    { label: 'Flashcards', icon: BookOpen, text: 'Generate flashcards for: ' },
    { label: 'Quiz', icon: Brain, text: 'Create a 10-question quiz on: ' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">StudyBuddy</h1>
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-xl ${m.role==='user'?'bg-primary text-primary-foreground':'bg-secondary text-secondary-foreground'}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2 mb-2">
              {quick.map(q => (
                <button key={q.label} onClick={() => handleSend(q.text)} className="text-xs px-3 py-1 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors flex items-center gap-1">
                  <q.icon size={14} /> {q.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-3 py-2 rounded-md border border-border bg-background" />
              <button onClick={()=>handleSend()} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


