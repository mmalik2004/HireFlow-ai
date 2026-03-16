import { useState } from 'react'
import { useLeads } from '../context/LeadContext'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import CandidateCard from '../components/CandidateCard'
import { Users, Bot, Calendar, CheckCircle, Download } from 'lucide-react'

const STATUSES = ['All', 'New', 'Screening', 'Interview', 'Offer Sent', 'Hired', 'Rejected']

const Dashboard = () => {
  const { leads, loading, getStatusCount } = useLeads()
  const { isSuperAdmin } = useAuth()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = leads.filter(lead => {
    const matchStatus = filter === 'All' || lead.status === filter
    const matchSearch =
      lead.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const metrics = [
    {
      label: 'Total Candidates',
      value: leads.length,
      icon: Users,
      color: 'text-indigo-400',
      trend: '+14 this week',
      trendUp: true,
    },
    {
      label: 'AI Screened',
      value: leads.filter(l => l.aiScore).length,
      icon: Bot,
      color: 'text-sky-400',
      trend: `${Math.round((leads.filter(l => l.aiScore).length / (leads.length || 1)) * 100)}% of total`,
      trendUp: true,
    },
    {
      label: 'Interviews Scheduled',
      value: getStatusCount('Interview'),
      icon: Calendar,
      color: 'text-emerald-400',
      trend: '+5 new',
      trendUp: true,
    },
    {
      label: 'Hired This Month',
      value: getStatusCount('Hired'),
      icon: CheckCircle,
      color: 'text-amber-400',
      trend: 'Great progress!',
      trendUp: true,
    },
  ]

  const pipelineStages = [
    { label: 'New', color: 'bg-indigo-500', count: getStatusCount('New') },
    { label: 'Screening', color: 'bg-sky-500', count: getStatusCount('Screening') },
    { label: 'Interview', color: 'bg-emerald-500', count: getStatusCount('Interview') },
    { label: 'Offer Sent', color: 'bg-amber-500', count: getStatusCount('Offer Sent') },
    { label: 'Hired', color: 'bg-green-500', count: getStatusCount('Hired') },
    { label: 'Rejected', color: 'bg-red-500', count: getStatusCount('Rejected') },
  ]

  const total = leads.length || 1

  return (
    <div className="flex min-h-screen bg-[#05050f]">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Hiring Dashboard
            </h1>
            <p className="text-white/35 text-sm mt-1">
              March 2026 · {leads.length} total candidates
            </p>
          </div>
          {isSuperAdmin && (
            <button className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-xl hover:bg-white/8 transition-all">
              <Download size={15} />
              Export CSV
            </button>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map(({ label, value, icon: Icon, color, trend, trendUp }) => (
            <div key={label} className="glass rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/35">{label}</span>
                <Icon size={16} className={color} />
              </div>
              <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
              <div className={`text-xs ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {trend}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline bar */}
        <div className="glass rounded-2xl p-5 border border-white/[0.06] mb-6">
          <p className="text-sm text-white/50 font-medium mb-3">
            📊 Candidate Pipeline
          </p>
          <div className="flex rounded-lg overflow-hidden h-2.5 gap-px mb-3">
            {pipelineStages.map(({ label, color, count }) => (
              <div
                key={label}
                className={`${color} opacity-80 transition-all`}
                style={{ width: `${(count / total) * 100}%`, minWidth: count > 0 ? '4px' : '0' }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {pipelineStages.map(({ label, color, count }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-sm ${color}`} />
                <span className="text-xs text-white/40">{label} ({count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
          {/* Table header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-white/[0.06]">
            <h2 className="text-sm font-medium text-white/70">
              👥 All Candidates
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search candidates..."
                className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/60 placeholder-white/25 focus:outline-none focus:border-indigo-500/40 w-44"
              />
              {/* Filter pills */}
              <div className="flex flex-wrap gap-1.5">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      filter === s
                        ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                        : 'bg-white/[0.04] text-white/35 border border-white/[0.06] hover:text-white/60'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table content */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/25 text-sm">No candidates found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {['Candidate', 'Company', 'AI Score', 'Submitted', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-white/30 font-normal uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard