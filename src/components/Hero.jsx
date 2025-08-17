import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleSubmitPaper = () => {
    navigate("/submit-paper");
  };

  const handleGuideline = () => {
    navigate("/guidelines");
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
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-md leading-tight">
            Share Your Innovations with the World at{" "}
            <span className="text-yellow-400">ICAARTD</span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-5 text-lg sm:text-xl text-center text-gray-100 max-w-3xl mx-auto px-6 font-medium leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          We invite groundbreaking research in{" "}
          <span className="text-blue-800 font-semibold">
            Artificial Intelligence
          </span>
          ,{" "}
          <span className="text-blue-800 font-semibold">Machine Learning</span>,{" "}
          <span className="text-blue-800 font-semibold">
            Sustainable Energy
          </span>
          ,{" "}
          <span className="text-blue-800 font-semibold">
            Smart Manufacturing
          </span>
          , <span className="text-blue-800 font-semibold">IoT</span>,{" "}
          <span className="text-blue-800 font-semibold">Cybersecurity</span>,
          and{" "}
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
    </section>
  );
}
