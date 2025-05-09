import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!
)

export const logQuizResult = async (
  personalityType: string,
  sessionId?: string,
  completed: boolean = true
) => {
  try {
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        personality_type: personalityType,
        session_id: sessionId,
        completed
      })
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error logging quiz result:', error)
    return false
  }
} 