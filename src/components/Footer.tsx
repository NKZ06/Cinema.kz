import { Film, MapPin, Phone, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-500 rounded-lg rotate-3" />
                <Film className="relative w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Cine<span className="text-amber-500">Mar</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Лучший кинотеатр вашего города. Современные залы, передовые технологии и незабываемые впечатления.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Навигация</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-400 hover:text-amber-500 transition-colors text-sm">Главная</Link>
              <Link to="/schedule" className="block text-slate-400 hover:text-amber-500 transition-colors text-sm">Расписание</Link>
              <Link to="/about" className="block text-slate-400 hover:text-amber-500 transition-colors text-sm">О кинотеатре</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>ул. Кино, 42, Москва</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Ежедневно 10:00 — 02:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Социальные сети</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 CineMar. Все права защищены.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-amber-500 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Правила посещения</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
