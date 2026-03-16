import { useState, useEffect } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

const candidates = [
  { initials: 'RK', name: 'Rahul Kumar', role: 'Sr. Frontend Engineer', score: 94, status: 'Interview', color: 'from-indigo-500 to-purple-600' },
  { initials: 'SP', name: 'Sarah Park', role: 'Product Manager', score: 88, status: 'Screening', color: 'from-sky-500 to-indigo-500' },
  { initials: 'AM', name: 'Ananya Mehta', role: 'Data Scientist', score: 76, status: 'In Review', color: 'from-purple-500 to-pink-500' },
]

const statusColors = {
  'Interview': 'bg-emerald-500/15 text-emerald-400',
  'Screening': 'bg-sky-500/15 text-sky-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
}

const Hero = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen bg-[#05050f] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className={`max-w-6xl mx-auto px-6 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs text-indigo-300 font-medium">Powered by Claude AI</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
          Hire the right people<br />
          <span className="gradient-text">5x faster</span> with AI
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-8">
          HireFlow AI screens resumes, scores candidates, and manages your entire hiring pipeline — so your team focuses on the best fits, not the busywork.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <button onClick={scrollToDemo} className="btn-primary flex items-center gap-2">
            🚀 Start free trial
            <ArrowRight size={16} />
          </button>
            <button onClick={() => document.getElementById('demo')?.scrollIntoView({  behavior: 'smooth' })}
            className="btn-secondary flex items-center gap-2"
         >
            ▶ Watch demo
        </button>
            
          
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 mb-14">
          {[
            { num: '500+', label: 'Companies hiring' },
            { num: '5x', label: 'Faster screening' },
            { num: '92%', label: 'AI accuracy' },
            { num: '4.9★', label: 'Customer rating' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{num}</div>
              <div className="text-xs text-white/35 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard preview card */}
        <div className="max-w-lg mx-auto glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-indigo-400" />
              <span className="text-sm text-white/60 font-medium">Live candidate pipeline</span>
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-indigo-500/15 text-indigo-300 px-2 py-1 rounded-full">3 new today</span>
              <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded-full">AI active</span>
            </div>
          </div>

          <div className="space-y-2">
            {candidates.map((c) => (
              <div key={c.name} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                  {c.initials}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm text-white font-medium">{c.name}</div>
                  <div className="text-xs text-white/35">{c.role}</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${c.score >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>{c.score}%</div>
                  <div className="text-[10px] text-white/30">AI Score</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero