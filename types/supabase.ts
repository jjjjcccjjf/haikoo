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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      hashtags: {
        Row: {
          created_at: string
          haiku_id: number
          hashtag: string
          id: number
        }
        Insert: {
          created_at?: string
          haiku_id: number
          hashtag: string
          id?: number
        }
        Update: {
          created_at?: string
          haiku_id?: number
          hashtag?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "hashtags_haiku_id_fkey"
            columns: ["haiku_id"]
            referencedRelation: "haikus"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          status: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          status?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
