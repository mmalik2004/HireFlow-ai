const features = [
  {
    icon: '🤖',
    title: 'AI Resume Screening',
    desc: 'Automatically screen hundreds of resumes in seconds with 92% accuracy. No more manual filtering.',
    color: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: '📊',
    title: 'Candidate Scoring',
    desc: 'Every candidate gets an AI score 0–100% based on skills match, experience, and culture fit.',
    color: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: '❓',
    title: 'Interview Questions',
    desc: 'AI generates custom interview questions tailored to each candidate\'s unique profile and role.',
    color: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: '⚡',
    title: 'Pipeline Automation',
    desc: 'Auto-move candidates through stages, trigger follow-up emails, and never miss a step.',
    color: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: '👥',
    title: 'Team Collaboration',
    desc: 'Share notes, scores, and feedback with your entire hiring team in real time.',
    color: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: '📈',
    title: 'Hiring Analytics',
    desc: 'Track time-to-hire, pipeline health, and team performance with live dashboards.',
    color: 'bg-pink-500/10 border-pink-500/20',
  },
]

const Features = () => {
  return (
    <section id="features" className="bg-[#080812] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">✦ Features</p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Everything you need to hire smarter
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            From resume to offer letter — AI handles the heavy lifting
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={`glass rounded-2xl p-6 border hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 ${f.color}`}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features