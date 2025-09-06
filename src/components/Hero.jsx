import { motion, useAnimation } from 'framer-motion';
import { Megaphone } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleSubmitPaper = () => {
    navigate('/submit-paper');
  };

  const handleGuideline = () => {
    navigate('/guidelines');
  };

  const scrollControls = useAnimation();

  useEffect(() => {
    // Start the scrolling animation
    scrollControls.start({
      x: '-100vw',
      transition: { repeat: Infinity, duration: 15, ease: 'linear' },
    });
  }, [scrollControls]);

  const handleMouseEnter = () => {
    scrollControls.stop();
  };

  const handleMouseLeave = () => {
    scrollControls.start({
      x: '-100%',
      transition: { repeat: Infinity, duration: 15, ease: 'linear' },
    });
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-indigo-600 to-white overflow-hidden">
      {/* Decorative blurred background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-white rounded-full opacity-30 blur-2xl"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h4 className="text-base sm:text-lg md:text-xl font-medium tracking-wide italic text-white/90 drop-shadow-md mb-2 text-center">
            <span className="block">
              1<sup>st</sup> International Conference On Advancements in Applied
              Research & Technological Development
            </span>
            <span className="block">Bengaluru, India, 2025</span>
            <span className="block text-yellow-300 font-bold tracking-wide">
              Proceedings to be Submitted for Publication in IEEE Xplore Digital
              Library
            </span>
          </h4>

          <h1 className="text-3xl sm:text-6xl font-extrabold text-white drop-shadow-md leading-tight">
            Share Your Innovations with the World at{' '}
            <span className="text-yellow-400">ICAARTD</span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-5 text-lg sm:text-xl text-center text-gray-100 max-w-3xl mx-auto px-6 font-medium leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          We invite groundbreaking research in{' '}
          <span className="text-blue-800 font-semibold">
            Artificial Intelligence
          </span>
          ,{' '}
          <span className="text-blue-800 font-semibold">Machine Learning</span>,{' '}
          <span className="text-blue-800 font-semibold">
            Sustainable Energy
          </span>
          ,{' '}
          <span className="text-blue-800 font-semibold">
            Smart Manufacturing
          </span>
          , <span className="text-blue-800 font-semibold">IoT</span>,{' '}
          <span className="text-blue-800 font-semibold">Cybersecurity</span>,
          and{' '}
          <span className="text-blue-800 font-semibold">
            Healthcare Technologies
          </span>
          . Join ICAARTD to connect, collaborate, and contribute to shaping a
          sustainable, tech-driven future.
        </motion.p>

        <motion.div
          className="mt-5 flex justify-center flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleSubmitPaper}
            className="cursor-pointer px-8 py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
          >
            🚀 Submit Paper
          </button>

          <button
            onClick={handleGuideline}
            className="cursor-pointer px-8 py-4 bg-white text-indigo-700 text-lg font-semibold rounded-xl border border-indigo-300 shadow hover:scale-105 transition-all duration-300 hover:bg-indigo-50"
          >
            📘 View Guidelines
          </button>
        </motion.div>
      </div>
      <div className="mt-12 w-full overflow-hidden">
        <p className="whitespace-nowrap text-red-600 text-2xl md:text-xl font-bold py-2 flex items-center cursor-pointer marquee pause">
          <Megaphone
            className="w-5 h-5 mr-2 flex-shrink-0"
            stroke="red"
            strokeWidth={3}
          />
          Abstract Submission Deadline - 15th Oct 2025 | Full Paper Submission -
          31st Oct 2025 | Proceedings Submitted to IEEE Xplore, Scopus & Web of
          Science | Conference Date - Last Saturday, December 2025 | Mode:
          Hybrid (Virtual & Offline)
        </p>
      </div>
      {/* IEEE Publication Section */}
      <section className="mt-12 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">
          Publication & Indexing
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          All accepted and presented papers will be submitted for inclusion in
          the <span className="font-semibold">IEEE Xplore Digital Library</span>{' '}
          and indexed by <span className="font-semibold">Scopus</span> &
          <span className="font-semibold"> Web of Science</span>. Papers must
          follow the official IEEE conference paper format.
        </p>
      </section>
    </section>
  );
}
