import { useState } from 'react'
import { Zap, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05050f]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">
            Hire<span className="text-indigo-400">Flow</span> AI
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['features', 'how-it-works', 'pricing', 'testimonials'].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-white/50 hover:text-white transition-colors capitalize"
            >
              {id.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
            Sign in
          </a>
          <button
            onClick={() => scrollTo('demo')}
            className="btn-primary text-sm py-2 px-4"
          >
            Get Demo
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080812] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {['features', 'how-it-works', 'pricing', 'testimonials'].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-white/60 hover:text-white text-left capitalize"
            >
              {id.replace('-', ' ')}
            </button>
          ))}
          <button
            onClick={() => scrollTo('demo')}
            className="btn-primary text-sm py-2 text-center"
          >
            Get Demo
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar