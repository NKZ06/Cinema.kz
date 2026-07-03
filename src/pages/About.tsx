import { motion } from 'framer-motion';
import { Film, Monitor, Volume2, Armchair, Wifi, Coffee, Car, Baby } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Monitor, title: 'IMAX и 3D', desc: 'Погружение в мир кино с передовыми технологиями' },
    { icon: Volume2, title: 'Dolby Atmos', desc: 'Объемный звук, который вы чувствуете всем телом' },
    { icon: Armchair, title: 'Комфортные кресла', desc: 'Откидные спинки и подставки для ног в каждом зале' },
    { icon: Wifi, title: 'Бесплатный Wi-Fi', desc: 'Быстрый интернет на всей территории кинотеатра' },
    { icon: Coffee, title: 'Кафе и бар', desc: 'Попкорн, напитки и закуски для просмотра' },
    { icon: Car, title: 'Парковка', desc: 'Бесплатная парковка для всех гостей' },
    { icon: Baby, title: 'Детский зал', desc: 'Специальные сеансы для семей с детьми' },
    { icon: Film, title: 'Классика кино', desc: 'Показы легендарных фильмов в оригинальном формате' },
  ];

  return (
    <div className="bg-slate-950 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">О кинотеатре CineMar</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Мы создаем незабываемые кинематографические впечатления с 2015 года. Самые современные технологии и внимание к каждой детали.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-video"
          >
            <img
              src="https://images.pexels.com/photos/723421/pexels-photo-723421.jpeg"
              alt="Кинозал"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Наша история</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              CineMar открылся в 2015 году как первый кинотеатр в городе с полностью цифровым оборудованием. С тех пор мы постоянно развиваемся, внедряя новые технологии и расширяя залы.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Сегодня у нас 8 современных залов, включая флагманский IMAX и залы с Dolby Atmos. Мы показываем не только новинки, но и классику кино, организуем кинофестивали и специальные мероприятия.
            </p>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Почему выбирают нас
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '500K+', label: 'Зрителей в год' },
            { number: '8', label: 'Кинозалов' },
            { number: '2000+', label: 'Показов фильмов' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50"
            >
              <div className="text-3xl font-bold text-amber-500 mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
