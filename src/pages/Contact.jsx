import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Share2,
  Linkedin,
  Instagram,
  MessageCircle,
  BookOpen,
  FileText,
  GraduationCap,
  Globe,
} from "lucide-react";

const contactData = [
  {
    title: "Email",
    icon: Mail,
    data: [
      {
        title: "nimai.analyticlabs@gmail.com",
        value: "mailto:nimai.analyticlabs@gmail.com",
      },
      {
        title: "solutions.analyticlabs@gmail.com",
        value: "mailto:solutions.analyticlabs@gmail.com",
      },
      {
        title: "solutions.wybbleai@gmail.com",
        value: "mailto:solutions.wybbleai@gmail.com",
      },
    ],
  },
  {
    title: "Phone",
    icon: Phone,
    data: [
      { title: "+91 9591957282", value: "tel:+919591957282" },
      { title: "+91 8460578783", value: "tel:+918460578783" },
    ],
  },
  {
    title: "Socials",
    icon: Share2,
    data: [
      {
        title: "WhatsApp",
        value: "https://wa.me/+919591957282",
        icon: <MessageCircle className="text-green-600" size={18} />,
      },
      {
        title: "LinkedIn",
        value: "https://www.linkedin.com/in/nimai-chand-das-adhikari-932396ba",
        icon: <Linkedin className="text-blue-700" size={18} />,
      },
      {
        title: "Google Scholar",
        value: "https://scholar.google.co.in/citations?user=JDq-uwwAAAAJ&hl=en",
        icon: <BookOpen className="text-purple-700" size={18} />,
      },
      {
        title: "ResearchGate",
        value: "https://www.researchgate.net/profile/Nimai-Das-Adhikari-2",
        icon: <GraduationCap className="text-green-700" size={18} />,
      },
      {
        title: "IEEE",
        value:
          "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=nimai%20chand%20das%20adhikari",
        icon: <Globe className="text-gray-800" size={18} />,
      },
      {
        title: "SlideShare",
        value: "https://www.slideshare.net/NimaiChandDasAdhikar",
        icon: <FileText className="text-orange-500" size={18} />,
      },
      {
        title: "Instagram",
        value: "https://www.instagram.com/chand_nimai?igsh=NmdsYThvaGV5eHhh",
        icon: <Instagram className="text-pink-500" size={18} />,
      },
    ],
  },
];

export default function Contact() {
  return (
    <div className="relative w-full min-h-screen px-6 py-16 md:px-20 bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-hidden">
      {/* 🎨 Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute top-32 left-10 w-[400px] h-[400px] bg-indigo-300 opacity-25 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-pink-300 opacity-25 blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 22 }}
        className="absolute top-[50%] left-[45%] w-[360px] h-[360px] bg-emerald-200 opacity-25 blur-[100px] rounded-full z-0"
      />

      {/* 🎯 Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center mb-15"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 text-transparent bg-clip-text">
          Let’s Get in Touch
        </h1>
        <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Have questions or ideas? Connect with us through the options below.
        </p>
        <div className="mt-4 h-[4px] w-24 mx-auto bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 rounded-full" />
      </motion.div>

      {/* 🧊 Contact Cards */}
      <div className="relative z-10 grid gap-10 md:grid-cols-3">
        {contactData.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.04 }}
            className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-6 transition-all duration-300 hover:shadow-indigo-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-indigo-600 p-3 rounded-full shadow-md hover:scale-110 transition-transform">
                <section.icon className="text-white" size={22} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {section.title}
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700 text-[15px] pl-1">
              {section.data.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-indigo-600 transition font-medium"
                  >
                    {"icon" in item && item.icon}
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
