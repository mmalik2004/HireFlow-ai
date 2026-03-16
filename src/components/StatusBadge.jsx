const STATUS_STYLES = {
  'New': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  'Screening': 'bg-sky-500/15 text-sky-300 border-sky-500/20',
  'Interview': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  'Offer Sent': 'bg-amber-500/15 text-amber-300 border-amber-500/20',
  'Hired': 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30',
  'Rejected': 'bg-red-500/15 text-red-300 border-red-500/20',
}

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES['New']

  return (
    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${style}`}>
      {status}
    </span>
  )
}

export default StatusBadge