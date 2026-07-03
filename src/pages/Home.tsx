import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featured, setFeatured] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const genres = ['all', 'Sci-Fi', 'Action', 'Crime', 'Musical', 'Thriller'];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .order('rating', { ascending: false });

        if (error) throw error;
        setMovies(data || []);
        setFeatured(data?.filter((m) => m.is_featured) || []);
      } catch (err) {
        setError('Не удалось загрузить фильмы');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = filter === 'all' ? movies : movies.filter((m) => m.genre === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 text-slate-950 rounded-lg font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950">
      <Hero movies={featured} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Сейчас в кино</h2>
            <p className="text-slate-400">Лучшие фильмы этого месяца</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === genre
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {genre === 'all' ? 'Все' : genre}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredMovies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Фильмы в этом жанре не найдены</p>
          </div>
        )}
      </section>

      <section className="bg-slate-900/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '8', label: 'Кинозалов', desc: 'IMAX, 3D и Dolby Atmos' },
              { number: '4K', label: 'Качество', desc: 'Проекторы последнего поколения' },
              { number: '500', label: 'Мест', desc: 'Комфортные кресла с откидной спинкой' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50"
              >
                <div className="text-4xl font-bold text-amber-500 mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-slate-400 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
