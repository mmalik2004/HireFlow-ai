import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  UserCog, 
  LogOut,
  Zap
} from 'lucide-react'

const Sidebar = () => {
  const { currentUser, isSuperAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/chatlogs', icon: MessageSquare, label: 'Chat Logs' },
    ...(isSuperAdmin ? [{ to: '/admin/team', icon: UserCog, label: 'Team' }] : []),
  ]

  const getInitials = (email) => {
    return email?.substring(0, 2).toUpperCase() || 'AD'
  }

  return (
    <div className="w-56 min-h-screen bg-[#080812] border-r border-white/[0.06] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">
            Hire<span className="text-indigo-400">Flow</span> AI
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        <p className="text-[10px] text-white/25 uppercase tracking-widest px-3 mb-2 mt-2">
          Main
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all ${
                isActive
                  ? 'bg-indigo-500/12 text-indigo-400 font-medium'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            {getInitials(currentUser?.email)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-white font-medium truncate">
              {currentUser?.email}
            </div>
            <div className="text-[10px] mt-0.5">
              <span className={`px-1.5 py-0.5 rounded-md ${
                isSuperAdmin 
                  ? 'bg-indigo-500/15 text-indigo-400' 
                  : 'bg-white/10 text-white/40'
              }`}>
                {isSuperAdmin ? 'Super Admin' : 'Member'}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Sidebar