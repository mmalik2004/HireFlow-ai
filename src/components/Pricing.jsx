const plans = [
  {
    name: 'Starter',
    price: '$79',
    desc: 'Perfect for small teams just getting started',
    features: [
      'Up to 3 open roles',
      '100 AI screenings/month',
      'Basic candidate scoring',
      'Email support',
      'Pipeline management',
    ],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$199',
    desc: 'For scaling teams that hire consistently',
    features: [
      'Unlimited open roles',
      'Unlimited AI screenings',
      'Advanced candidate scoring',
      'AI interview questions',
      'Team collaboration',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Get started',
    popular: true,
  },
]

const Pricing = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="bg-[#080812] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">
            ✦ Pricing
          </p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-white/40 text-base">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '32px',
                background: plan.popular
                ? 'rgba(99,102,241,0.08)'
                : 'rgba(0,0,0,0.3)',
                border: plan.popular
                ? '1px solid rgba(99,102,241,0.25)'
                : '1px solid rgba(255,255,255,0.07)',
                  
                  
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap',
                }}>
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                  {plan.name}
                </h3>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                  {plan.price}
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>/mo</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{plan.desc}</p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '12px',
                  }}>
                    <span style={{ color: '#818cf8', fontWeight: '700' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToDemo}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: plan.popular
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'rgba(255,255,255,0.05)',
                  color: plan.popular ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing