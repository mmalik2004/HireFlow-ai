import { supabase } from './config'

export const addLead = async (leadData) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      full_name: leadData.fullName,
      email: leadData.email,
      company: leadData.company,
      phone: leadData.phone || '',
      company_size: leadData.companySize,
      message: leadData.message,
      status: 'New',
      ai_score: Math.floor(Math.random() * 40) + 60,
    }])
    .select()
  if (error) throw error
  return data[0].id
}

export const getAllLeads = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('submitted_at', { ascending: false })
  if (error) throw error
  return data.map(lead => ({
    id: lead.id,
    fullName: lead.full_name,
    email: lead.email,
    company: lead.company,
    phone: lead.phone,
    companySize: lead.company_size,
    message: lead.message,
    status: lead.status,
    aiScore: lead.ai_score,
    submittedAt: new Date(lead.submitted_at).toLocaleDateString()
  }))
}

export const getLeadById = async (id) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    companySize: data.company_size,
    message: data.message,
    status: data.status,
    aiScore: data.ai_score,
    submittedAt: new Date(data.submitted_at).toLocaleDateString()
  }
}

export const updateLeadStatus = async (id, status) => {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}