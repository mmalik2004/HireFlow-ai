import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Zap } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    try {
      setLoading(true)
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05050f] flex items-center justify-center px-4">
      {/* Background orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Hire<span className="text-indigo-400">Flow</span> AI
          </h1>
          <p className="text-white/40 text-sm mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-7 border border-white/[0.07]">
          <h2 className="text-lg font-semibold text-white mb-1">Welcome back</h2>
          <p className="text-white/40 text-sm mb-6">Sign in to your admin account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@hireflow.ai"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-dark"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign in →'}
            </button>
          </form>

          {/* Test credentials hint */}
          <div className="mt-5 p-3 bg-indigo-500/8 border border-indigo-500/15 rounded-xl">
            <p className="text-indigo-400 text-xs font-medium mb-1.5">Test credentials</p>
            <p className="text-white/40 text-xs">Super Admin: admin@hireflow.ai</p>
            <p className="text-white/40 text-xs">Member: member@hireflow.ai</p>
            <p className="text-white/40 text-xs">Password: hireflow2026</p>
          </div>
        </div>

        <p className="text-center mt-5">
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login