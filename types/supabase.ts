export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      haikus: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: number
        }
        Insert: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: number
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "haikus_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
