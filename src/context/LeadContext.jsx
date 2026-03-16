import { createContext, useContext, useEffect, useState } from 'react'
import { 
  getAllLeads, 
  addLead, 
  updateLeadStatus 
} from '../supabase/leads'

const LeadContext = createContext()

export const useLeads = () => {
  return useContext(LeadContext)
}

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const data = await getAllLeads()
      setLeads(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const submitLead = async (leadData) => {
    try {
      const id = await addLead(leadData)
      await fetchLeads()
      return id
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await updateLeadStatus(id, status)
      setLeads(prev => prev.map(lead => 
        lead.id === id ? { ...lead, status } : lead
      ))
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const getStatusCount = (status) => {
    return leads.filter(lead => lead.status === status).length
  }

  const value = {
    leads,
    loading,
    error,
    submitLead,
    updateStatus,
    fetchLeads,
    getStatusCount,
    totalLeads: leads.length,
  }

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  )
}