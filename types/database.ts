/**
 * Hand-written to match supabase/migrations/0001_init.sql. No Supabase CLI
 * project is linked yet to codegen this from `supabase gen types` — once
 * one is, this file can be regenerated and this comment removed.
 *
 * Row/Insert/Update MUST be written as inline object literals directly
 * inside `Tables` below, not as references to separately-declared named
 * interfaces (and never as `Partial<XInsert>`). Verified in isolation:
 * with 2+ tables, @supabase/supabase-js's structural check of `Tables`
 * against `Record<string, GenericTable>` silently fails — every query
 * builder call collapses to `never` with no error at the definition site
 * — the moment a table's Row/Insert/Update comes from a named interface
 * instead of an inline literal. This matches what `supabase gen types`
 * actually outputs; it's not a stylistic choice.
 */

export type PropertyTypeRow = "Residential" | "Commercial" | "Hospitality" | "Development";

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          location: string;
          property_type: PropertyTypeRow;
          summary: string;
          description: string;
          cover_image_url: string | null;
          cover_gradient: string | null;
          cover_label: string | null;
          walkthrough_video_url: string | null;
          featured: boolean;
          published: boolean;
          has_360: boolean;
          has_dollhouse: boolean;
          has_floor_plan: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          location: string;
          property_type: PropertyTypeRow;
          summary: string;
          description?: string;
          cover_image_url?: string | null;
          cover_gradient?: string | null;
          cover_label?: string | null;
          walkthrough_video_url?: string | null;
          featured?: boolean;
          published?: boolean;
          has_360?: boolean;
          has_dollhouse?: boolean;
          has_floor_plan?: boolean;
        };
        Update: {
          slug?: string;
          title?: string;
          location?: string;
          property_type?: PropertyTypeRow;
          summary?: string;
          description?: string;
          cover_image_url?: string | null;
          cover_gradient?: string | null;
          cover_label?: string | null;
          walkthrough_video_url?: string | null;
          featured?: boolean;
          published?: boolean;
          has_360?: boolean;
          has_dollhouse?: boolean;
          has_floor_plan?: boolean;
        };
        Relationships: [];
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          alt: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          project_id: string;
          url: string;
          alt?: string | null;
          sort_order?: number;
        };
        Update: {
          project_id?: string;
          url?: string;
          alt?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          project_id: string | null;
          quote: string;
          name: string;
          role: string | null;
          created_at: string;
        };
        Insert: {
          project_id?: string | null;
          quote: string;
          name: string;
          role?: string | null;
        };
        Update: {
          project_id?: string | null;
          quote?: string;
          name?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          property_type: string | null;
          property_location: string | null;
          message: string | null;
          source: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          property_type?: string | null;
          property_location?: string | null;
          message?: string | null;
          source?: string | null;
          status?: string;
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          property_type?: string | null;
          property_location?: string | null;
          message?: string | null;
          source?: string | null;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

// Convenience aliases derived FROM the already-correct Database type above
// (safe — these are indexed-access aliases, not the named-interface pattern
// that breaks the structural check described above).
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
export type TestimonialInsert = Database["public"]["Tables"]["testimonials"]["Insert"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
