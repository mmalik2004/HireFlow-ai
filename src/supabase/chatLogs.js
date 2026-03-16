import { supabase } from './config'

export const createChatSession = async () => {
  const { data, error } = await supabase
    .from('chat_logs')
    .insert([{
      visitor_id: `visitor_${Date.now()}`,
      messages: []
    }])
    .select()
  if (error) throw error
  return data[0].id
}

export const addMessageToSession = async (sessionId, message) => {
  const { data: existing, error: fetchError } = await supabase
    .from('chat_logs')
    .select('messages')
    .eq('id', sessionId)
    .single()
  if (fetchError) throw fetchError

  const updatedMessages = [
    ...existing.messages,
    { ...message, timestamp: new Date().toISOString() }
  ]

  const { error } = await supabase
    .from('chat_logs')
    .update({ messages: updatedMessages })
    .eq('id', sessionId)
  if (error) throw error
}

export const getAllChatSessions = async () => {
  const { data, error } = await supabase
    .from('chat_logs')
    .select('*')
    .order('started_at', { ascending: false })
  if (error) throw error
  return data.map(session => ({
    id: session.id,
    visitorId: session.visitor_id,
    messages: session.messages || [],
    startedAt: new Date(session.started_at).toLocaleString()
  }))
}