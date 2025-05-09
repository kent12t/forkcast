export type QuizResult = {
  id: number
  created_at: string
  personality_type: string
  // Optional fields for drop-off analytics
  session_id?: string
  completed: boolean
}

export type Database = {
  public: {
    Tables: {
      quiz_results: {
        Row: QuizResult
        Insert: Omit<QuizResult, 'id' | 'created_at'>
        Update: Partial<Omit<QuizResult, 'id' | 'created_at'>>
      }
    }
  }
} 