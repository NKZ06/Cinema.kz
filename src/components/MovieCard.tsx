import { Link } from 'react-router-dom';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="group block bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/50 hover:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_url || 'https://images.pexels.com/photos/723421/pexels-photo-723421.jpeg'}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-amber-500 text-xs font-bold">
            <Star className="w-3 h-3 fill-amber-500" />
            {movie.rating}
          </div>

          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-white text-xs font-medium">
            {movie.age_rating}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
              <ChevronRight className="w-6 h-6 text-slate-950" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold text-base truncate group-hover:text-amber-500 transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-slate-500 text-sm">{movie.genre}</span>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              {movie.duration_minutes} мин
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
