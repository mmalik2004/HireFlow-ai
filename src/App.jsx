import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LeadProvider } from './context/LeadContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CandidateDetail from './pages/CandidateDetail'
import ChatLogs from './pages/ChatLogs'
import TeamManagement from './pages/TeamManagement'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeadProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/candidate/:id" element={
              <ProtectedRoute>
                <CandidateDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin/chatlogs" element={
              <ProtectedRoute>
                <ChatLogs />
              </ProtectedRoute>
            } />
            <Route path="/admin/team" element={
              <ProtectedRoute requireSuperAdmin={true}>
                <TeamManagement />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LeadProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App