import { motion } from "framer-motion";
import {
  PresentationIcon,
  VideoIcon,
  MicIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const presentations = [
  {
    icon: <MicIcon className="text-white w-6 h-6" />,
    title: "Oral Presentation",
    description:
      "Deliver your research in a 15-minute live talk followed by a Q&A. Best suited for impactful, completed works.",
  },
  {
    icon: <LayoutDashboardIcon className="text-white w-6 h-6" />,
    title: "Poster Presentation",
    description:
      "Visually present your work through posters and engage in interactive discussions during the session.",
  },
  {
    icon: <VideoIcon className="text-white w-6 h-6" />,
    title: "Virtual Presentation",
    description:
      "Remote authors can submit pre-recorded videos and join live Q&A sessions for a seamless virtual experience.",
  },
  {
    icon: <PresentationIcon className="text-white w-6 h-6" />,
    title: "General Guidelines",
    description:
      "Prepare clear slides or posters. Templates and timing instructions will be shared after paper acceptance.",
  },
];

export default function Presentation() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-sky-50 to-white py-8 px-6 md:px-16 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute top-0 left-10 w-[400px] h-[400px] bg-sky-200 opacity-25 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[360px] h-[360px] bg-emerald-300 opacity-20 blur-[100px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-rose-300 opacity-25 blur-[120px] rounded-full z-0"
      />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Presentation Formats
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Showcase your research through multiple engaging formats
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {presentations.map((item, idx) => (
          <motion.div
            key={idx}
            className={`relative p-6 rounded-xl shadow-md bg-white border-l-8 ${
              idx % 2 === 0 ? "border-teal-500" : "border-sky-500"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="absolute -top-5 left-5 bg-gradient-to-br from-teal-500 to-sky-500 p-3 rounded-full shadow-lg">
              {item.icon}
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
