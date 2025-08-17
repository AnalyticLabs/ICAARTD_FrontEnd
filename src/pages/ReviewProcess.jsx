import { motion } from "framer-motion";

const reviewSteps = [
  {
    title: "1. Initial Screening",
    description:
      "All submitted papers undergo an initial screening to check for completeness, adherence to formatting guidelines, and originality using plagiarism detection tools.",
  },
  {
    title: "2. Peer Review",
    description:
      "Each submission is reviewed by at least two independent reviewers based on criteria such as relevance, technical quality, novelty, clarity, and significance of results.",
  },
  {
    title: "3. Revision (if required)",
    description:
      "Authors of papers that require improvements will be invited to submit revised versions addressing the reviewers' comments and suggestions.",
  },
  {
    title: "4. Final Decision",
    description:
      "The Program Committee makes the final decision on each paper based on reviewer feedback, overall quality, and contribution to the conference theme.",
  },
  {
    title: "5. Camera-Ready Submission",
    description:
      "Accepted papers must be resubmitted in their final, camera-ready format by the specified deadline, incorporating any final editorial suggestions.",
  },
];

export default function ReviewProcess() {
  return (
    <div className="relative w-full overflow-hidden py-8 px-4 md:px-8 lg:px-16 text-gray-700">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 16 }}
        className="absolute top-10 left-10 w-[400px] h-[400px] bg-sky-300 opacity-20 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute bottom-20 right-10 w-[420px] h-[420px] bg-rose-300 opacity-20 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 22 }}
        className="absolute top-[45%] left-[50%] w-[360px] h-[360px] bg-emerald-300 opacity-15 blur-[120px] rounded-full z-0"
      />

      {/* Content Section */}
      <div className="relative z-10 mx-auto max-w-[100rem]">
        <div className="relative z-10 text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent"
          >
            Review Process
          </motion.h1>
          <motion.div
            className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
            Learn how your paper will be evaluated through each step of our
            rigorous review process.
          </p>
        </div>

        <div className="space-y-5">
          {reviewSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 border border-teal-200 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h2 className="text-xl font-semibold text-teal-700 mb-2">
                {step.title}
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
