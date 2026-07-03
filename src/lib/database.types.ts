export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          poster_url: string | null;
          backdrop_url: string | null;
          year: number;
          rating: number | null;
          genre: string;
          director: string | null;
          duration_minutes: number;
          trailer_url: string | null;
          age_rating: string | null;
          is_featured: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          poster_url?: string | null;
          backdrop_url?: string | null;
          year: number;
          rating?: number | null;
          genre: string;
          director?: string | null;
          duration_minutes: number;
          trailer_url?: string | null;
          age_rating?: string | null;
          is_featured?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          poster_url?: string | null;
          backdrop_url?: string | null;
          year?: number;
          rating?: number | null;
          genre?: string;
          director?: string | null;
          duration_minutes?: number;
          trailer_url?: string | null;
          age_rating?: string | null;
          is_featured?: boolean | null;
          created_at?: string | null;
        };
      };
      halls: {
        Row: {
          id: string;
          name: string;
          capacity: number;
          format: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          capacity: number;
          format?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          capacity?: number;
          format?: string | null;
          created_at?: string | null;
        };
      };
      showtimes: {
        Row: {
          id: string;
          movie_id: string;
          hall_id: string;
          show_time: string;
          price: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          movie_id: string;
          hall_id: string;
          show_time: string;
          price: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          movie_id?: string;
          hall_id?: string;
          show_time?: string;
          price?: number;
          created_at?: string | null;
        };
      };
    };
  };
};
