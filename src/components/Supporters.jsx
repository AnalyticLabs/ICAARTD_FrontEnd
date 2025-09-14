import { motion } from 'framer-motion';
import WybbleAI from '../assets/logo.png';
import AnalyticLabs from '../assets/AL_logo.png';
import Fluxx from '../assets/fluxx.png';
import EPlato from '../assets/E-Plato.png';
import Eupeep from '../assets/Eupeep.png';
import CloudHub from '../assets/CloudHub.webp';

const supporters = [
  {
    src: WybbleAI,
    label: 'WybbleAI',
    bgColor: 'bg-[#159abb]',
    url: 'https://wybbleai.com',
  },
  {
    src: CloudHub,
    label: 'CloudHub',
    bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-300',
    url: 'https://cloudhubs.nl',
  },
  {
    src: AnalyticLabs,
    label: 'AnalyticLabs',
    bgColor: 'bg-gradient-to-br from-purple-500 to-blue-400',
    url: 'https://analyticlabs.co.in',
  },
  {
    src: Fluxx,
    label: 'Fluxx',
    bgColor: 'bg-blue-600',
    url: 'https://www.fluxxelectric.com',
  },
  { src: EPlato, label: 'EPlato', url: 'https://e-plato.com' },
  { src: Eupeep, label: 'Eupeep', url: 'https://www.eupep.com' },
];

export default function Supporters({ title }) {
  const handleImage = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <section className="w-full px-6 py-12 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 transition duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {supporters.map((supporter, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => handleImage(supporter.url)}
              className={`cursor-pointer flex flex-col items-center p-4 rounded-xl shadow-xl backdrop-blur-md border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1 ${
                supporter.bgColor || 'bg-slate-700'
              }`}
            >
              <img
                src={supporter.src}
                alt={supporter.label}
                className="h-16 w-auto object-contain mb-3"
              />
              <span className="text-sm font-semibold text-white">
                {supporter.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
