import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!
)

// Start a new quiz attempt
export const startQuizAttempt = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        personality_type: '',
        session_id: sessionId,
        completed: false
      })
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error starting quiz:', error)
    return false
  }
}

// Complete a quiz attempt
export const completeQuizAttempt = async (
  sessionId: string,
  personalityType: string,
) => {
  try {
    const { error } = await supabase
      .from('quiz_results')
      .update({ 
        personality_type: personalityType,
        completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
      .eq('completed', false)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error completing quiz:', error)
    return false
  }
} 