import Hero from '../components/Hero';
import Features from '../components/Features';
import { motion } from 'framer-motion';
import Supporters from '../components/Supporters';
import {
  Lightbulb,
  FileText,
  Layers,
  ClipboardCheck,
  PhoneCall,
} from 'lucide-react';
import Speakers from '@/components/Speakers';

const sections = [
  {
    icon: <Lightbulb className="text-indigo-600" size={28} />,
    title: 'Welcome to ICAARTD Forum',
    content: (
      <>
        ICAARTD is your gateway to presenting pioneering research and
        breakthrough innovations across applied sciences and technology. Whether
        your work explores AI, sustainable energy, healthcare tech, smart
        manufacturing, or next-gen materials, this platform connects thinkers
        and innovators to shape a sustainable, tech-driven future.
      </>
    ),
  },
  {
    icon: <FileText className="text-indigo-600" size={28} />,
    title: 'Publication & Indexing',
    content: (
      <>
        Accepted papers will be published in the{' '}
        <a
          href="/dashboard"
          className="text-indigo-600 font-medium underline underline-offset-4"
        >
          ICAARTD Dashboard
        </a>{' '}
        and other recognized academic databases. Select high-quality research
        may be invited for publication in partnered international journals.
      </>
    ),
  },
  {
    icon: <Layers className="text-indigo-600" size={28} />,
    title: 'Submission Tracks',
    content: (
      <>
        We welcome submissions in (but not limited to):
        <ul className="list-disc list-inside mt-2">
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Sustainable Energy & Environmental Solutions</li>
          <li>Smart Manufacturing & Industry 4.0</li>
          <li>Applied Physics & Material Sciences</li>
          <li>IoT, Cybersecurity & Embedded Systems</li>
          <li>Healthcare Technologies & Biomedical Engineering</li>
        </ul>
      </>
    ),
  },
  {
    icon: <ClipboardCheck className="text-indigo-600" size={28} />,
    title: 'Submission Guidelines',
    content: (
      <>
        Submissions must be in PDF format, in clear English, and follow the
        required template. All papers go through a double-blind peer review.
        Visit the{' '}
        <a
          href="/guidelines"
          className="text-indigo-600 font-medium underline underline-offset-4"
        >
          Submission Guidelines
        </a>{' '}
        page for details.
      </>
    ),
  },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-b from-purple-700 to-indigo-600">
        <Hero />
      </div>
      <Speakers />
      <Features />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 py-10 px-4 sm:px-8 lg:px-16">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-gray-100 rounded-full">{section.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h3>
            </div>

            <div className="text-gray-700 text-[15px] leading-relaxed">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pt-6">
        <Supporters title="Supported By" />
      </div>
    </motion.div>
  );
}
