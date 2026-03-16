import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLeadById } from '../supabase/leads'
import { useAuth } from '../context/AuthContext'
import { useLeads } from '../context/LeadContext'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import { ArrowLeft, Mail, Phone, Building, Users } from 'lucide-react'

const STATUSES = ['New', 'Screening', 'Interview', 'Offer Sent', 'Hired', 'Rejected']

const CandidateDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSuperAdmin } = useAuth()
  const { updateStatus } = useLeads()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const data = await getLeadById(id)
      setCandidate(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    await updateStatus(id, newStatus)
    setCandidate(prev => ({ ...prev, status: newStatus }))
  }

  const scoreColor = candidate?.aiScore >= 85
    ? 'text-emerald-400'
    : candidate?.aiScore >= 70
    ? 'text-amber-400'
    : 'text-red-400'

  const scoreBg = candidate?.aiScore >= 85
    ? 'from-emerald-500 to-teal-500'
    : candidate?.aiScore >= 70
    ? 'from-amber-500 to-orange-500'
    : 'from-red-500 to-rose-500'

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#05050f]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen bg-[#05050f]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40">Candidate not found</p>
        </div>
      </div>
    )
  }

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA'

  return (
    <div className="flex min-h-screen bg-[#05050f]">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="max-w-3xl">
          {/* Header card */}
          <div className="glass rounded-2xl p-6 border border-white/[0.07] mb-5">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                  {getInitials(candidate.fullName)}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{candidate.fullName}</h1>
                  <p className="text-white/40 text-sm mt-0.5">{candidate.company}</p>
                  <div className="mt-2">
                    <StatusBadge status={candidate.status} />
                  </div>
                </div>
              </div>

              {/* AI Score */}
              <div className="text-center">
                <div className={`text-4xl font-bold ${scoreColor}`}>
                  {candidate.aiScore}%
                </div>
                <div className="text-xs text-white/35 mt-1">AI Match Score</div>
                <div className="w-24 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${scoreBg}`}
                    style={{ width: `${candidate.aiScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {[
              { icon: Mail, label: 'Email', value: candidate.email },
              { icon: Phone, label: 'Phone', value: candidate.phone || 'Not provided' },
              { icon: Building, label: 'Company', value: candidate.company },
              { icon: Users, label: 'Company Size', value: `${candidate.companySize} employees` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <Icon size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/35">{label}</div>
                    <div className="text-sm text-white font-medium mt-0.5">{value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="glass rounded-2xl p-5 border border-white/[0.07] mb-5">
            <h3 className="text-sm font-medium text-white/60 mb-3">
              💬 Hiring Needs
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {candidate.message || 'No message provided'}
            </p>
          </div>

          {/* Status update */}
          {isSuperAdmin && (
            <div className="glass rounded-2xl p-5 border border-white/[0.07]">
              <h3 className="text-sm font-medium text-white/60 mb-3">
                ⚡ Update Status
              </h3>
              <select
                value={candidate.status}
                onChange={handleStatusChange}
                className="input-dark max-w-xs"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s} className="bg-[#080812]">{s}</option>
                ))}
              </select>
              <p className="text-white/25 text-xs mt-2">
                Only Super Admins can update candidate status
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidateDetail