import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Zap } from 'lucide-react'
import { createChatSession, addMessageToSession } from '../supabase/chatLogs'

const SYSTEM_PROMPT = `You are HireFlow AI's product assistant. You help visitors understand HireFlow AI — an AI-powered recruitment platform that helps companies hire 5x faster.

You can answer questions about:
- Features: AI resume screening, candidate scoring (0-100%), interview question generation, pipeline automation, team collaboration, hiring analytics
- Pricing: Starter plan at $79/month (3 roles, 100 screenings), Growth plan at $199/month (unlimited everything)
- How it works: Post role → AI screens resumes → Review top candidates → Hire faster
- Integrations, security, onboarding, ROI, and general hiring topics

If someone asks something completely unrelated to HireFlow AI or hiring (like weather, coding help, general knowledge, writing poems, etc.), politely redirect them back to hiring topics.

Keep responses concise, friendly, and helpful. Use bullet points when listing features. Always end with an offer to help further or suggest requesting a demo.`

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m the HireFlow AI assistant. Ask me anything about our platform — features, pricing, or how it works!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && !sessionId) {
      createChatSession().then(id => setSessionId(id))
    }
  }, [open])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    if (sessionId) {
      await addMessageToSession(sessionId, userMessage)
    }

    try {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 400,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        })),
        { role: 'user', content: userMessage.content }
      ]
    })
  })

  const data = await response.json()
  console.log('Groq response:', data)

  if (data.error) {
    throw new Error(data.error.message)
  }

  const botMessage = {
    role: 'assistant',
    content: data.choices[0].message.content
  }

  setMessages(prev => [...prev, botMessage])

  if (sessionId) {
    await addMessageToSession(sessionId, botMessage)
  }

} catch (err) {
  console.error('Chat error:', err)
  setMessages(prev => [...prev, {
    role: 'assistant',
    content: `Error: ${err.message}`
  }])
} finally {
  setLoading(false)
} 
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {open && (
        <div
          className="mb-4 w-80 bg-[#0d0d1f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '420px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">HireFlow AI</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-white/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] text-xs leading-relaxed px-3 py-2 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/[0.07] text-white/80 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.07] px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/[0.07] flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-indigo-500 transition-colors"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform ml-auto"
      >
        {open
          ? <X size={20} className="text-white" />
          : <MessageSquare size={20} className="text-white" />
        }
      </button>
    </div>
  )
}

export default ChatWidget
