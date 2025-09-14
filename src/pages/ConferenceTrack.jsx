import { motion } from 'framer-motion';

const tracks = [
  {
    title:
      'Track 1: Advanced Materials, Manufacturing, and Construction Technologies',
    topics: [
      'Smart composites, bio-materials, and surface engineering',
      'Additive and sustainable manufacturing',
      'Innovative and green construction technologies',
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    title:
      'Track 2: Artificial Intelligence, Machine Learning, AR/VR, and Digital Technologies',
    topics: [
      'AI/ML in engineering design, tribology, and process optimization',
      'AR/VR applications in education, healthcare, and industry',
      'Digital image processing, computer vision, and pattern recognition',
    ],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Track 3: Electronics, VLSI, and Embedded Systems',
    topics: [
      'VLSI design and next-gen semiconductor technologies',
      'Embedded systems for automotive, healthcare, and industrial automation',
      'IoT, cyber-physical systems, and smart sensing technologies',
    ],
    color: 'from-emerald-500 to-green-600',
  },
  {
    title: 'Track 4: Sustainable Energy, Mobility, and Automation',
    topics: [
      'EV technologies, drivetrain innovations, and tribology enhancements',
      'Renewable energy systems, storage, and smart grid solutions',
      'Robotics, automation, and Industry 4.0 applications',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function ConferenceTrack() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
          Conference Tracks
        </h1>
        <p className="mt-4 text-lg text-gray-700 font-medium leading-relaxed">
          <span className="font-bold">
            Advancements in Applied Research & Technological Development
          </span>{' '}
          brings together cutting-edge research across multiple disciplines.
          Explore the specialized tracks below.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-2xl shadow-xl p-6 bg-gradient-to-r ${track.color} text-white overflow-hidden group transition-all`}
          >
            <h2 className="text-xl font-bold mb-4">{track.title}</h2>
            <ul className="space-y-2">
              {track.topics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm md:text-base"
                >
                  <span className="text-yellow-300 font-bold">•</span>
                  {topic}
                </li>
              ))}
            </ul>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
