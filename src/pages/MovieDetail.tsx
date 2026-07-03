import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, User, ArrowLeft, Play, Ticket, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Movie, Showtime } from '../types';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      try {
        const { data: movieData, error: movieError } = await supabase
          .from('movies')
          .select('*')
          .eq('id', id)
          .single();
        if (movieError) throw movieError;
        setMovie(movieData);

        const { data: showtimesData, error: showtimesError } = await supabase
          .from('showtimes')
          .select(`
            *,
            halls(*)
          `)
          .eq('movie_id', id)
          .gte('show_time', new Date().toISOString())
          .order('show_time', { ascending: true });
        if (showtimesError) throw showtimesError;
        setShowtimes(showtimesData || []);
      } catch (err) {
        setError('Не удалось загрузить информацию о фильме');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'Фильм не найден'}</p>
          <Link to="/" className="px-6 py-2 bg-amber-500 text-slate-950 rounded-lg font-medium">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const groupedShowtimes = showtimes.reduce((acc, st) => {
    const date = new Date(st.show_time).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(st);
    return acc;
  }, {} as Record<string, Showtime[]>);

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop_url || movie.poster_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8">
          <Link
            to="/"
            className="absolute top-24 left-4 sm:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Назад</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl shadow-black/50">
              <img
                src={movie.poster_url || 'https://images.pexels.com/photos/723421/pexels-photo-723421.jpeg'}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase">
                {movie.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {movie.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {movie.age_rating}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-amber-500 font-bold">
                <Star className="w-5 h-5 fill-amber-500" />
                {movie.rating}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                {movie.duration_minutes} мин
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <User className="w-4 h-4" />
                {movie.director}
              </div>
            </div>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              {movie.description}
            </p>

            {movie.trailer_url && (
              <a
                href={movie.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors mb-10"
              >
                <Play className="w-4 h-4" />
                Смотреть трейлер
              </a>
            )}

            <div className="border-t border-slate-800/50 pt-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                Расписание сеансов
              </h2>

              {Object.keys(groupedShowtimes).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(groupedShowtimes).map(([date, sessions]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span className="text-white font-medium">{date}</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {sessions.map((session) => (
                          <div
                            key={session.id}
                            className="group flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-all cursor-pointer"
                          >
                            <div className="text-center">
                              <div className="text-white font-bold text-sm">
                                {new Date(session.show_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div className="w-px h-8 bg-slate-700" />
                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span>{session.halls?.name}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-700" />
                            <div className="text-amber-500 font-bold text-sm">
                              {session.price} ₽
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-800/30 rounded-2xl border border-slate-800/50">
                  <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">Нет доступных сеансов</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
