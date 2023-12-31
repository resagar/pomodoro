yarn run v1.22.19
$ C:\Users\rsamu\OneDrive\Desktop\develop\test\todo-list\node_modules\.bin\supabase gen types typescript --project-id bwlmoowxaicrqxgvcodh
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
      config_timer: {
        Row: {
          created_at: string
          id: string
          large: number
          short: number
          user_id: string
          work: number
        }
        Insert: {
          created_at?: string
          id?: string
          large: number
          short: number
          user_id?: string
          work: number
        }
        Update: {
          created_at?: string
          id?: string
          large?: number
          short?: number
          user_id?: string
          work?: number
        }
        Relationships: [
          {
            foreignKeyName: "config_timer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          firstname: string
          id: string
          lastname: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          firstname: string
          id?: string
          lastname: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          firstname?: string
          id?: string
          lastname?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
Done in 1.55s.
