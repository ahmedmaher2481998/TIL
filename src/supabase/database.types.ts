export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_tags: {
        Row: {
          blog_id: number
          tag_id: number
        }
        Insert: {
          blog_id: number
          tag_id: number
        }
        Update: {
          blog_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_tags_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_id: number
          content: string
          createdat: string
          description: string
          id: number
          image: string
          image_id: string | null
          read_count: number
          slug: string
          title: string
          tldr: string
          updatedat: string | null
        }
        Insert: {
          author_id: number
          content: string
          createdat?: string
          description: string
          id?: number
          image: string
          image_id?: string | null
          read_count?: number
          slug: string
          title: string
          tldr: string
          updatedat?: string | null
        }
        Update: {
          author_id?: number
          content?: string
          createdat?: string
          description?: string
          id?: number
          image?: string
          image_id?: string | null
          read_count?: number
          slug?: string
          title?: string
          tldr?: string
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: number | null
          blog_id: number
          content: string
          createdat: string
          id: number
          updatedat: string | null
        }
        Insert: {
          author_id?: number | null
          blog_id: number
          content: string
          createdat?: string
          id?: number
          updatedat?: string | null
        }
        Update: {
          author_id?: number | null
          blog_id?: number
          content?: string
          createdat?: string
          id?: number
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          slug: string
          title: string
        }
        Insert: {
          id?: number
          slug: string
          title: string
        }
        Update: {
          id?: number
          slug?: string
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string
          createdat: string
          email: string
          id: number
          name: string
          updatedat: string | null
        }
        Insert: {
          avatar: string
          createdat?: string
          email: string
          id?: number
          name: string
          updatedat?: string | null
        }
        Update: {
          avatar?: string
          createdat?: string
          email?: string
          id?: number
          name?: string
          updatedat?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_blog_with_tags: {
        Args: {
          blog_title: string
          blog_slug: string
          blog_description: string
          blog_tldr: string
          blog_content: string
          blog_image_url: string
          blog_image_id: string
          blog_author_id: number
          blog_tag_ids: number[]
        }
        Returns: {
          id: number
          title: string
          slug: string
          description: string
          tldr: string
          content: string
          image: string
          image_id: string
          read_count: number
          author_id: number
          createdat: string
          updatedat: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
