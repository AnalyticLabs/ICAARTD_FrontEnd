import { motion } from "framer-motion";
import { FileTextIcon, ClipboardListIcon, UploadCloudIcon } from "lucide-react";

const sections = [
  {
    title: "Paper Submission Guidelines",
    icon: FileTextIcon,
    points: [
      "All submitted papers must present original research not previously published or currently under review elsewhere.",
      "Papers should clearly describe the research motivation, methodology, results, and conclusions.",
      "Submissions must adhere to the formatting guidelines and be written in clear, concise English.",
    ],
    color: "from-teal-100 via-white to-teal-50",
  },
  {
    title: "Submission Requirements",
    icon: ClipboardListIcon,
    points: [
      "Only PDF format is accepted. Ensure your submission complies with formatting standards.",
      "Full papers should not exceed 8 pages (including references). Abstracts: max 300 words.",
    ],
    color: "from-indigo-100 via-white to-indigo-50",
  },
  {
    title: "Submission Process",
    icon: UploadCloudIcon,
    points: [
      "Papers must be submitted via the official portal. Email submissions will not be accepted.",
      `For technical issues, contact: `,
    ],
    color: "from-yellow-100 via-white to-amber-50",
    email: "solutions.wybbleai@gmail.com",
  },
];

export default function Guidelines() {
  return (
    <div className="relative w-full py-16 px-6 md:px-16 overflow-hidden bg-white">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute top-20 left-10 w-[400px] h-[400px] bg-sky-300 opacity-25 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="absolute bottom-16 right-10 w-[420px] h-[420px] bg-rose-300 opacity-25 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute top-[50%] left-[45%] w-[360px] h-[360px] bg-emerald-300 opacity-20 blur-[100px] rounded-full z-0"
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-14"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Submission Guidelines
        </h1>
        <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Please review the following requirements before submitting your paper
          to ensure it meets the conference standards.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 grid gap-10 md:grid-cols-3">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${section.color} rounded-2xl shadow-xl p-6 border border-white/60 backdrop-blur-lg transition-transform duration-300`}
          >
            <div className="flex items-center mb-4">
              <section.icon className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-3 text-sm">
              {section.points.map((point, i) => (
                <li key={i}>
                  {section.title === "Submission Process" && i === 1 ? (
                    <>
                      For technical issues, contact:{" "}
                      <a
                        href={`mailto:${section.email}`}
                        className="text-indigo-600 underline"
                      >
                        {section.email}
                      </a>
                    </>
                  ) : (
                    point
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
