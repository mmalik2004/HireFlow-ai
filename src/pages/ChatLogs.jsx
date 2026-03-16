import { useEffect, useState } from 'react'
import { getAllChatSessions } from '../supabase/chatLogs'
import Sidebar from '../components/Sidebar'
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

const ChatLogs = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllChatSessions()
      setSessions(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const toggleExpand = (id) => {
    setExpanded(prev => prev === id ? null : id)
  }

  return (
    <div className="flex min-h-screen bg-[#05050f]">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Chat Logs
          </h1>
          <p className="text-white/35 text-sm mt-1">
            All chatbot conversations from your landing page
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="glass rounded-2xl p-12 border border-white/[0.06] text-center">
            <MessageSquare size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No chat sessions yet</p>
            <p className="text-white/20 text-xs mt-1">
              Conversations will appear here when visitors use the chatbot
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="glass rounded-2xl border border-white/[0.06] overflow-hidden"
              >
                {/* Session header */}
                <button
                  onClick={() => toggleExpand(session.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <MessageSquare size={16} className="text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">
                        Session {session.id.slice(0, 8)}...
                      </div>
                      <div className="text-xs text-white/35 mt-0.5">
                        {session.startedAt} · {session.messages?.length || 0} messages
                      </div>
                    </div>
                  </div>
                  {expanded === session.id
                    ? <ChevronUp size={16} className="text-white/40" />
                    : <ChevronDown size={16} className="text-white/40" />
                  }
                </button>

                {/* Messages */}
                {expanded === session.id && (
                  <div className="px-5 pb-5 border-t border-white/[0.05]">
                    <div className="space-y-3 mt-4 max-h-80 overflow-y-auto">
                      {session.messages?.length === 0 ? (
                        <p className="text-white/25 text-xs text-center py-4">
                          No messages in this session
                        </p>
                      ) : (
                        session.messages?.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-indigo-600/30 text-white/80 rounded-br-sm'
                                : 'bg-white/[0.05] text-white/65 rounded-bl-sm'
                            }`}>
                              <div className="text-[10px] mb-1 opacity-50">
                                {msg.role === 'user' ? 'Visitor' : 'HireFlow AI'} · {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                              </div>
                              {msg.content}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatLogs