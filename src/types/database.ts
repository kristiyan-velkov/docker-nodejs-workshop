export type UserRole = "participant" | "admin";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TaskProgressRow {
  id: string;
  user_id: string;
  task_id: number;
  elapsed_time: number;
  completed: boolean;
  completion_time: number | null;
  updated_at: string;
}

export interface WorkshopQuestion {
  id: string;
  user_id: string;
  task_id: number | null;
  message: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      task_progress: {
        Row: TaskProgressRow;
        Insert: {
          id?: string;
          user_id: string;
          task_id: number;
          elapsed_time?: number;
          completed?: boolean;
          completion_time?: number | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          task_id?: number;
          elapsed_time?: number;
          completed?: boolean;
          completion_time?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      workshop_questions: {
        Row: WorkshopQuestion;
        Insert: {
          id?: string;
          user_id: string;
          task_id?: number | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          task_id?: number | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
