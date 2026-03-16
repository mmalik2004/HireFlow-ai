import { useState, useEffect } from 'react'
import { supabase } from '../supabase/config'
import Sidebar from '../components/Sidebar'
import { UserPlus, Trash2, Shield, User } from 'lucide-react'

const TeamManagement = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ email: '', role: 'member' })
  const [error, setError] = useState('')

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      if (!error) setMembers(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.email.trim()) {
      setError('Email is required')
      return
    }
    try {
      setAdding(true)
      const { error } = await supabase
        .from('users')
        .insert([{
          email: form.email,
          role: form.role,
        }])
      if (error) throw error
      setForm({ email: '', role: 'member' })
      setError('')
      await fetchMembers()
    } catch (err) {
      setError('Failed to add member')
    } finally {
      setAdding(false)
    }
  }

  const handleRemove = async (id) => {
    const ok = window.confirm('Remove this team member?')
    if (!ok) return
    await supabase.from('users').delete().eq('id', id)
    await fetchMembers()
  }

  return (
    <div className="flex min-h-screen bg-[#05050f]">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Team Management
          </h1>
          <p className="text-white/35 text-sm mt-1">
            Manage who has access to the admin portal
          </p>
        </div>

        {/* Add member */}
        <div className="glass rounded-2xl p-6 border border-white/[0.07] mb-6 max-w-2xl">
          <h2 className="text-sm font-medium text-white/70 mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-indigo-400" />
            Add Team Member
          </h2>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="teammate@company.com"
              className="input-dark flex-1"
            />
            <select
              value={form.role}
              onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
              className="input-dark sm:w-40"
            >
              <option value="member" className="bg-[#080812]">Member</option>
              <option value="superadmin" className="bg-[#080812]">Super Admin</option>
            </select>
            <button
              type="submit"
              disabled={adding}
              className="btn-primary px-5 whitespace-nowrap disabled:opacity-60"
            >
              {adding ? 'Adding...' : 'Add Member'}
            </button>
          </form>
          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}
        </div>

        {/* Members list */}
        <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden max-w-2xl">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-medium text-white/70">
              👥 Team Members ({members.length})
            </h2>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/25 text-sm">No team members yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {member.email?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {member.role === 'superadmin'
                          ? <Shield size={11} className="text-indigo-400" />
                          : <User size={11} className="text-white/30" />
                        }
                        <span className={`text-xs ${
                          member.role === 'superadmin'
                            ? 'text-indigo-400'
                            : 'text-white/35'
                        }`}>
                          {member.role === 'superadmin' ? 'Super Admin' : 'Member'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamManagement