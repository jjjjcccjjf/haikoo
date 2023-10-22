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
      haiku_hashtags: {
        Row: {
          created_at: string
          haiku_id: number
          hashtag_id: number
          id: number
        }
        Insert: {
          created_at?: string
          haiku_id: number
          hashtag_id: number
          id?: number
        }
        Update: {
          created_at?: string
          haiku_id?: number
          hashtag_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "haiku_hashtags_haiku_id_fkey"
            columns: ["haiku_id"]
            referencedRelation: "haikus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "haiku_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          }
        ]
      }
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
      hashtags: {
        Row: {
          created_at: string
          hashtag: string
          id: number
        }
        Insert: {
          created_at?: string
          hashtag: string
          id?: number
        }
        Update: {
          created_at?: string
          hashtag?: string
          id?: number
        }
        Relationships: []
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
