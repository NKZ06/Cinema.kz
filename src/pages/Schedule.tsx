import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Movie, Showtime } from '../types';

export default function Schedule() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: moviesData } = await supabase.from('movies').select('*').order('rating', { ascending: false });
        const { data: showtimesData } = await supabase
          .from('showtimes')
          .select('*, halls(*)')
          .gte('show_time', new Date().toISOString())
          .order('show_time', { ascending: true });
        setMovies(moviesData || []);
        setShowtimes(showtimesData || []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const dates = Array.from(new Set(showtimes.map((st) => st.show_time.split('T')[0]))).sort();

  const filteredShowtimes = showtimes.filter((st) => {
    const movie = movies.find((m) => m.id === st.movie_id);
    if (!movie) return false;
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchDate = selectedDate === 'all' || st.show_time.startsWith(selectedDate);
    const matchGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchSearch && matchDate && matchGenre;
  });

  const groupedByDate = filteredShowtimes.reduce((acc, st) => {
    const dateKey = st.show_time.split('T')[0];
    const dateLabel = new Date(dateKey).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(st);
    return acc;
  }, {} as Record<string, Showtime[]>);

  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Расписание</h1>
          <p className="text-slate-400">Все сеансы в одном месте</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Поиск фильма..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-amber-500/50 cursor-pointer min-w-[160px]"
              >
                <option value="all">Все даты</option>
                {dates.map((d) => {
                  const label = new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
                  return <option key={d} value={d}>{label}</option>;
                })}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-amber-500/50 cursor-pointer min-w-[160px]"
              >
                <option value="all">Все жанры</option>
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedByDate).map(([dateLabel, sessions]) => (
            <motion.div
              key={dateLabel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold text-white">{dateLabel}</h2>
              </div>

              <div className="space-y-3">
                {sessions.map((session) => {
                  const movie = movies.find((m) => m.id === session.movie_id);
                  if (!movie) return null;
                  return (
                    <Link
                      key={session.id}
                      to={`/movie/${movie.id}`}
                      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-slate-900/50 hover:bg-slate-900 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-all"
                    >
                      <div className="w-full sm:w-16 h-24 sm:h-16 shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={movie.poster_url || ''}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="text-white font-semibold text-lg group-hover:text-amber-500 transition-colors">
                            {movie.title}
                          </h3>
                          <span className="text-amber-500 font-bold text-sm shrink-0">
                            {session.price} ₽
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(session.show_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {session.halls?.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-500" />
                            {movie.genre}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-500" />
                            {movie.duration_minutes} мин
                          </span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center shrink-0">
                        <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-amber-500 flex items-center justify-center transition-colors">
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {Object.keys(groupedByDate).length === 0 && (
            <div className="text-center py-20">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-2">Сеансы не найдены</p>
              <p className="text-slate-600 text-sm">Попробуйте изменить параметры фильтра</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
