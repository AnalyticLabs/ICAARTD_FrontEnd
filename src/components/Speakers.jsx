import { motion } from 'framer-motion';
import AnurupGuha from '../assets/Anurup Guha.jpeg';
import DileepBhoi from '../assets/Dileep Bhoi.jpeg';
import AnirbanNag from '../assets/Anirban Nag.jpeg';
import PavanKumarSeggoju from '../assets/Pavan Kumar Seggoju.jpeg';
import BijonGuha from '../assets/Bijon Guha.jpg';
import SiddharthSameer from '../assets/Siddharth Sameer.jpeg';
import SusantMallick from '../assets/Susant Mallick.jpeg';
import ArpanaAlka from '../assets/Arpana Alka.jpg';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import { useRef } from 'react';

const speakers = [
  {
    name: 'Anurup Guha',
    src: AnurupGuha,
    role: 'Acoustic Engineer, Apple',
    linkedin: 'https://www.linkedin.com/in/anurup-guha/',
    title:
      'Senior Acoustic Engineer at Apple, specializing in novel acoustic sensor design, ultrasonic sensing, and audio system innovation.',
  },
  {
    name: 'Dileep Bhoi',
    src: DileepBhoi,
    role: 'Engineering Manager, Bosch',
    linkedin: 'https://www.linkedin.com/in/dileep-bhoi/',
    title:
      'Engineering Manager at Bosch, driving global projects at the intersection of automotive and electronics engineering.',
  },
  {
    name: 'Anirban Nag',
    src: AnirbanNag,
    role: 'Senior Data Scientist, Netradyne',
    linkedin: 'https://www.linkedin.com/in/anirban-nag/',
    title:
      'Data Science Lead at Netradyne, building AI/ML solutions for driver safety and smart fleet analytics.',
  },
  {
    name: 'Pavan Kumar Seggoju',
    src: PavanKumarSeggoju,
    role: 'Senior Data Scientist, Microsoft',
    linkedin: 'https://www.linkedin.com/in/pavan-kumar-seggoju-92905632/',
    title:
      'Senior Data Scientist at Microsoft with 13+ years in AI/ML, Conversational AI, and large-scale financial and cloud-based solutions.',
  },
  {
    name: 'Bijon Guha',
    src: BijonGuha,
    role: 'Senior Technical Specialist, Zensar Tech.',
    linkedin: 'https://www.linkedin.com/in/bijonguha/',
    title:
      'Full-Stack Data Scientist at Zensar, specializing in GenAI, MLOps, and scalable AI/ML solutions.',
  },
  {
    name: 'Siddharth Sameer',
    src: SiddharthSameer,
    role: 'Lead Engineering Analyst, Google',
    linkedin: 'https://www.linkedin.com/in/siddharth-sameer/',
    title:
      'Lead Engineering Analyst at Google, combating fraud in Trust & Safety with advanced analytics and automation.',
  },
  {
    name: 'Susant Mallick',
    src: SusantMallick,
    role: 'Co-founder & CEO, CloudHub',
    linkedin: 'https://www.linkedin.com/in/susant-mallick007/',
    title:
      'CEO & Co-founder of CloudHub, with 25+ years in IT leadership, digital transformation, AI/ML, and cloud strategy.',
  },
  {
    name: 'Arpana Alka',
    src: ArpanaAlka,
    role: 'CEO & MD, FluxxEv',
    linkedin: 'https://www.linkedin.com/in/arpana-alka-7a92b856/',
    title:
      'CEO of FluxxEv, leveraging AI and ML innovations in e-mobility with a strong background in computer vision and machine learning.',
  },
];

export default function Speakers() {
  const scrollRef = useRef(null);

  const CARD_WIDTH = 300;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 px-6 lg:px-12">
      <h2 className="text-3xl text-center md:text-4xl font-extrabold text-gray-700 mb-12 tracking-wide">
        Featured Speakers
      </h2>

      <div className="relative">
        {/* Wrapper ensures not all 7 are visible */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar"
          >
            {speakers.map((speaker, idx) => (
              <motion.div
                key={idx}
                className="group perspective flex-shrink-0 w-56 h-64 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-xl shadow-md border border-gray-200">
                  <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
                    <img
                      src={speaker.src}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay at bottom */}
                    <div className="absolute bottom-0 w-full bg-black/50 text-white p-2 text-center rounded-b-xl">
                      <h4 className="text-base font-semibold">
                        {speaker.name}
                      </h4>
                      <p className="text-sm font-light">
                        {speaker.role.split(',')[1]?.trim() || speaker.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute w-56 h-64 backface-hidden rotate-y-180
  bg-gradient-to-br from-purple-500 via-pink-500 to-red-500
  rounded-xl p-4 flex flex-col justify-center items-center text-center text-white"
                  >
                    {/* Name */}
                    <h3 className="text-lg font-bold mb-1 tracking-wide">
                      {speaker.name}
                    </h3>

                    {/* Role */}
                    <p className="text-xs font-medium text-teal-200 mb-2 uppercase">
                      {speaker.role}
                    </p>

                    {/* Title / Description */}
                    <p className="text-sm font-light text-white/90 leading-relaxed mb-3 px-2">
                      {speaker.title}
                    </p>

                    {/* LinkedIn */}
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white hover:text-teal-400 font-semibold text-sm"
                    >
                      <Linkedin size={16} />
                      <span>{speaker.name}</span>
                    </a>

                    <div className="w-8 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded mt-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => scroll('left')}
            className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
