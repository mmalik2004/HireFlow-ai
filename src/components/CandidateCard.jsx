import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLeads } from '../context/LeadContext'
import StatusBadge from './StatusBadge'

const STATUSES = ['New', 'Screening', 'Interview', 'Offer Sent', 'Hired', 'Rejected']

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA'
}

const getAvatarColor = (name) => {
  const colors = [
    'from-indigo-500 to-purple-600',
    'from-sky-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-red-500',
    'from-emerald-500 to-sky-500',
    'from-pink-500 to-rose-500',
  ]
  const index = (name?.charCodeAt(0) || 0) % colors.length
  return colors[index]
}

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate()
  const { isSuperAdmin } = useAuth()
  const { updateStatus } = useLeads()

  const handleStatusChange = async (e) => {
    e.stopPropagation()
    await updateStatus(candidate.id, e.target.value)
  }

  const scoreColor = candidate.aiScore >= 85
    ? 'text-emerald-400'
    : candidate.aiScore >= 70
    ? 'text-amber-400'
    : 'text-red-400'

  const scoreBg = candidate.aiScore >= 85
    ? 'bg-emerald-500'
    : candidate.aiScore >= 70
    ? 'bg-amber-500'
    : 'bg-red-500'

  return (
    <tr
      className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
      onClick={() => navigate(`/admin/candidate/${candidate.id}`)}
    >
      {/* Candidate */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(candidate.fullName)} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
            {getInitials(candidate.fullName)}
          </div>
          <div>
            <div className="text-sm font-medium text-white">{candidate.fullName}</div>
            <div className="text-xs text-white/35">{candidate.email}</div>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-4 py-3">
        <div className="text-sm text-white/70">{candidate.company}</div>
        <div className="text-xs text-white/35">{candidate.companySize} employees</div>
      </td>

      {/* AI Score */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${scoreBg}`}
              style={{ width: `${candidate.aiScore}%` }}
            />
          </div>
          <span className={`text-sm font-bold ${scoreColor}`}>
            {candidate.aiScore}%
          </span>
        </div>
      </td>

      {/* Submitted */}
      <td className="px-4 py-3 text-sm text-white/50">
        {candidate.submittedAt}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={candidate.status} />
      </td>

      {/* Action */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        {isSuperAdmin ? (
          <select
            value={candidate.status}
            onChange={handleStatusChange}
            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white/70 cursor-pointer focus:outline-none focus:border-indigo-500/50"
          >
            {STATUSES.map(s => (
              <option key={s} value={s} className="bg-[#080812]">{s}</option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-indigo-400">View only</span>
        )}
      </td>
    </tr>
  )
}

export default CandidateCard