export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          email: string;
          role: string;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          full_name: string;
          email: string;
          role: string;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string;
          email?: string;
          role?: string;
          avatar_url?: string | null;
        };
      };
      policies: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          content: string;
          status: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          content: string;
          status: string;
          created_by: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          content?: string;
          status?: string;
          created_by?: string;
        };
      };
      compliance_tasks: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          due_date: string;
          status: string;
          assigned_to: string;
          policy_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          due_date: string;
          status: string;
          assigned_to: string;
          policy_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          due_date?: string;
          status?: string;
          assigned_to?: string;
          policy_id?: string | null;
        };
      };
      whistleblowing_reports: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          status: string;
          tracking_id: string;
          evidence_urls: string[] | null;
          assigned_to: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          status: string;
          tracking_id: string;
          evidence_urls?: string[] | null;
          assigned_to?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          status?: string;
          tracking_id?: string;
          evidence_urls?: string[] | null;
          assigned_to?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
