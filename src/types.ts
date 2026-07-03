export interface Movie {
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
}

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  format: string | null;
  created_at: string | null;
}

export interface Showtime {
  id: string;
  movie_id: string;
  hall_id: string;
  show_time: string;
  price: number;
  created_at: string | null;
  movies?: Movie | null;
  halls?: Hall | null;
}
