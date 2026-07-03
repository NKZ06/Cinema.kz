import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Star, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie } from '../types';

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const prev = () => setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  const next = () => setCurrent((prev) => (prev + 1) % movies.length);

  if (movies.length === 0) return null;
  const movie = movies[current];

  return (
    <div className="relative h-screen max-h-[800px] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop_url || movie.poster_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20 lg:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                {movie.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                {movie.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                {movie.rating}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 line-clamp-3">
              {movie.description}
            </p>

            <div className="flex items-center gap-6 mb-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {movie.duration_minutes} мин
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {movie.age_rating}
              </div>
              {movie.director && <span>Режиссер: {movie.director}</span>}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={`/movie/${movie.id}`}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              >
                Купить билет
              </Link>
              {movie.trailer_url && (
                <a
                  href={movie.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Трейлер
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {movies.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-amber-500' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
