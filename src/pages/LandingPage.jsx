import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import DemoForm from '../components/DemoForm'
import ChatWidget from '../components/ChatWidget'
import { Zap } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#05050f]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <DemoForm />

      {/* Footer */}
      <footer className="bg-[#03030a] border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">
              Hire<span className="text-indigo-400">Flow</span> AI
            </span>
          </div>
          <p className="text-white/25 text-xs">
            © 2026 HireFlow AI · Built for Accelerate AI Assessment
          </p>
          <a
            href="/login"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Admin Portal →
          </a>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}

export default LandingPage