const testimonials = [
  {
    quote: "HireFlow AI cut our time-to-hire from 6 weeks to under 10 days. The AI scoring is scary accurate — we've made better hires than ever before.",
    name: 'Sarah Chen',
    role: 'Head of Talent, DataFlow Inc',
    initials: 'SC',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    quote: "We scaled from 10 to 80 employees in one year. Couldn't have done it without HireFlow AI's pipeline automation and team tools.",
    name: 'Rahul Mehta',
    role: 'CEO, Buildstack',
    initials: 'RM',
    color: 'from-sky-500 to-indigo-500',
  },
  {
    quote: "The AI interview questions feature alone saved our hiring managers 3+ hours per candidate. Absolutely worth every penny.",
    name: 'Priya Nair',
    role: 'HR Director, TechVault',
    initials: 'PN',
    color: 'from-emerald-500 to-sky-500',
  },
  {
    quote: "Finally a hiring tool that actually uses AI properly. The candidate scores are remarkably accurate and our team trusts them completely.",
    name: 'James Park',
    role: 'CTO, Loopworks',
    initials: 'JP',
    color: 'from-amber-500 to-red-500',
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#05050f] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">✦ Testimonials</p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Trusted by hiring teams worldwide
          </h2>
          <p className="text-white/40 text-base">
            Join 500+ companies hiring smarter with AI
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 border border-white/[0.07] hover:border-indigo-500/20 transition-all">
              <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-white/65 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/35 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials