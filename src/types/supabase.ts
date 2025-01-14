export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          role: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          email: string;
          role?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          role?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      cleaners: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          photo_url: string | null;
          services: string[] | null;
          rating: number | null;
          availability: string[] | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          photo_url?: string | null;
          services?: string[] | null;
          rating?: number | null;
          availability?: string[] | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          photo_url?: string | null;
          services?: string[] | null;
          rating?: number | null;
          availability?: string[] | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          base_price: number;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          base_price: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          base_price?: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      bookings: {
        Row: {
          id: string;
          client_id: string | null;
          cleaner_id: string | null;
          service_id: string | null;
          booking_date: string;
          status: string | null;
          total_price: number;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          client_id?: string | null;
          cleaner_id?: string | null;
          service_id?: string | null;
          booking_date: string;
          status?: string | null;
          total_price: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string | null;
          cleaner_id?: string | null;
          service_id?: string | null;
          booking_date?: string;
          status?: string | null;
          total_price?: number;
          created_at?: string | null;
          updated_at?: string | null;
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