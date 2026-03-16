const steps = [
  {
    num: '01',
    title: 'Post a Role',
    desc: 'Define your job requirements and let AI learn what a great candidate looks like for your team.',
    icon: '📝',
  },
  {
    num: '02',
    title: 'AI Screens',
    desc: 'Our AI reads every resume and scores candidates 0–100% based on fit, skills, and experience.',
    icon: '🤖',
  },
  {
    num: '03',
    title: 'Review Top Fits',
    desc: 'Your team only sees the highest-scoring candidates — saving hours of manual review.',
    icon: '🎯',
  },
  {
    num: '04',
    title: 'Hire Faster',
    desc: 'Schedule interviews, send offers, and close roles 5x faster than traditional hiring.',
    icon: '🚀',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#05050f] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">✦ Process</p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            How HireFlow AI works
          </h2>
          <p className="text-white/40 text-base">
            From job post to hire in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {/* Number circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-5 text-white font-bold text-sm relative z-10">
                {step.num}
              </div>
              <div className="text-2xl mb-3">{step.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks