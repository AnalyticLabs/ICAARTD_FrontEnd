// import { motion } from 'framer-motion';
// import Speaker1 from '../assets/speaker1.jpg';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useRef, useEffect } from 'react';

// const speakers = [
//   {
//     name: 'John Doe',
//     title: 'IOT Speaker',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Jane Smith',
//     title: 'AI Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Nimai',
//     title: 'ML Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Nimai',
//     title: 'ML Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Nimai',
//     title: 'ML Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Nimai',
//     title: 'ML Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
//   {
//     name: 'Nimai',
//     title: 'ML Researcher',
//     src: Speaker1,
//     role: 'CEO & Co-founder, Webflow',
//   },
// ];

// export default function Speakers() {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -300 : 300,
//         behavior: 'smooth',
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const maxScroll =
//           scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

//         if (Math.round(scrollRef.current.scrollLeft) >= maxScroll) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scroll('right');
//         }
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-8 px-6 lg:px-12 bg-gray-50">
//       <h2 className="text-3xl text-center md:text-4xl font-extrabold text-gray-700 mb-12 tracking-wide">
//         Featured Speakers
//       </h2>

//       <div className="relative">
//         <div
//           ref={scrollRef}
//           className="flex gap-8 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
//         >
//           {speakers.map((speaker, idx) => (
//             <motion.div
//               key={idx}
//               className="group perspective w-72 h-80 cursor-pointer"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-xl shadow-md border border-gray-200">
//                 {/* Front Side - Image */}
//                 <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
//                   <img
//                     src={speaker.src}
//                     alt={speaker.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Back Side - Details */}
//                 <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 rounded-xl p-6 box-border flex flex-col justify-center items-center text-center">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {speaker.name}
//                   </h3>
//                   <p className="text-sm text-gray-600">{speaker.role}</p>
//                   <p className="text-sm text-gray-600">{speaker.title}</p>
//                   <div className="w-8 h-1 bg-pink-500 rounded mt-4" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Scroll Buttons */}
//         <div className="flex justify-center gap-6 mt-3">
//           <button
//             onClick={() => scroll('left')}
//             className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { motion } from 'framer-motion';
// import AnurupGuha from '../assets/Anurup Guha.jpeg';
// import DileepBhoi from '../assets/Dileep Bhoi.jpeg';
// import AnirbanNag from '../assets/Anirban Nag.jpeg';
// import PavanKumarSeggoju from '../assets/Pavan Kumar Seggoju.jpeg';
// import BijonGuha from '../assets/Bijon Guha.jpg';
// import SiddharthSameer from '../assets/Siddharth Sameer.jpeg';
// import SusantMallick from '../assets/Susant Mallick.jpeg';
// import ArpanaAlka from '../assets/Arpana Alka.jpg';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useRef, useEffect } from 'react';

// const speakers = [
//   {
//     name: 'Anurup Guha',
//     title: 'IOT Speaker',
//     src: AnurupGuha,
//     role: 'Acoustic, Apple',
//   },
//   {
//     name: 'Dileep Bhoi',
//     title: 'AI Researcher',
//     src: DileepBhoi,
//     role: 'Engineering Manager, Bosch',
//   },
//   {
//     name: 'Anirban Nag',
//     title: 'ML Researcher',
//     src: AnirbanNag,
//     role: 'Senior Data Scientist, Netradyne',
//   },
//   {
//     name: 'Pavan Kumar Seggoju',
//     title: 'ML Researcher',
//     src: PavanKumarSeggoju,
//     role: 'Senior Data Scientist, Microsoft',
//   },
//   {
//     name: 'Bijon Guha',
//     title: 'ML Researcher',
//     src: BijonGuha,
//     role: 'Senior Technical Specialist, Zensar Tech.',
//   },
//   {
//     name: 'Siddharth Sameer',
//     title: 'ML Researcher',
//     src: SiddharthSameer,
//     role: 'Lead Engineering Analyst, Google',
//   },
//   {
//     name: 'Susant Mallick',
//     title: 'ML Researcher',
//     src: SusantMallick,
//     role: 'Co-founder & CEO, CloudHub',
//   },
//   {
//     name: 'Arpana Alka',
//     title: 'ML Researcher',
//     src: ArpanaAlka,
//     role: 'CEO & MD, FluxxEv',
//   },
// ];

// export default function Speakers() {
//   const scrollRef = useRef(null);

//   const CARD_WIDTH = 300; // card width + gap

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
//         behavior: 'smooth',
//       });
//     }
//   };

//   // Autoplay scroll
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const maxScroll =
//           scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

//         if (Math.round(scrollRef.current.scrollLeft) >= maxScroll) {
//           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           scroll('right');
//         }
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-8 px-6 lg:px-12 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]">
//       <h2 className="text-3xl text-center md:text-4xl font-extrabold text-gray-700 mb-12 tracking-wide">
//         Featured Speakers
//       </h2>

//       <div className="relative">
//         {/* Wrapper ensures not all 7 are visible */}
//         <div className="overflow-hidden">
//           <div
//             ref={scrollRef}
//             className="flex gap-8 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar"
//           >
//             {speakers.map((speaker, idx) => (
//               <motion.div
//                 key={idx}
//                 className="group perspective flex-shrink-0 w-72 h-80 cursor-pointer"
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-xl shadow-md border border-gray-200">
//                   {/* Front Side */}
//                   <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
//                     <img
//                       src={speaker.src}
//                       alt={speaker.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Back Side */}
//                   <div
//                     className="absolute w-full h-full backface-hidden rotate-y-180
//   bg-gradient-to-br from-purple-500 via-pink-500 to-red-500
//   rounded-xl p-6 flex flex-col justify-center items-center text-center text-white"
//                   >
//                     <h3 className="text-xl font-semibold">{speaker.name}</h3>
//                     <p className="text-base opacity-90">{speaker.role}</p>
//                     <p className="text-base opacity-90">{speaker.title}</p>
//                     {/* <div className="w-8 h-1 bg-white rounded mt-4" /> */}
//                     <div className="w-8 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded mt-4" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Buttons */}
//         <div className="flex justify-center gap-6 mt-8">
//           <button
//             onClick={() => scroll('left')}
//             className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             className="p-3 cursor-pointer rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

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
      'At Apple, Anurup pioneers cutting-edge acoustic engineering, shaping innovative audio experiences in next-gen devices.',
  },
  {
    name: 'Dileep Bhoi',
    src: DileepBhoi,
    role: 'Engineering Manager, Bosch',
    linkedin: 'https://www.linkedin.com/in/dileep-bhoi/',
    title:
      'Leads Bosch’s AI strategy in automotive and industrial innovation—details from his latest LinkedIn bio are TBD.',
  },
  {
    name: 'Anirban Nag',
    src: AnirbanNag,
    role: 'Senior Data Scientist, Netradyne',
    linkedin: 'https://www.linkedin.com/in/anirban-nag/',
    title:
      'Applies machine learning at Netradyne to drive smart fleet analytics—bio details pending.',
  },
  {
    name: 'Pavan Kumar Seggoju',
    src: PavanKumarSeggoju,
    role: 'Senior Data Scientist, Microsoft',
    linkedin: 'https://www.linkedin.com/in/pavan-kumar-seggoju-92905632/',
    title:
      'Empowering intelligent systems at Microsoft through advanced ML—more info to be sourced from his profile.',
  },
  {
    name: 'Bijon Guha',
    src: BijonGuha,
    role: 'Senior Technical Specialist, Zensar Tech.',
    linkedin: 'https://www.linkedin.com/in/bijonguha/',
    title:
      'Elevates enterprise-grade AI solutions at Zensar—intro pending further professional details.',
  },
  {
    name: 'Siddharth Sameer',
    src: SiddharthSameer,
    role: 'Lead Engineering Analyst, Google',
    linkedin: 'https://www.linkedin.com/in/siddharth-sameer/',
    title:
      'At Google, drives ML-driven analytics—more accomplishments to highlight after viewing his profile.',
  },
  {
    name: 'Susant Mallick',
    src: SusantMallick,
    role: 'Co-founder & CEO, CloudHub',
    linkedin: 'https://www.linkedin.com/in/susant-mallick007/',
    title:
      'Co-founder of CloudHub, blending AI and cloud solutions—intro to be refined from his public background.',
  },
  {
    name: 'Arpana Alka',
    src: ArpanaAlka,
    role: 'CEO & MD, FluxxEv',
    linkedin: 'https://www.linkedin.com/in/arpana-alka-7a92b856/',
    title:
      'CEO at FluxxEv, leading ML innovations in the e-mobility space—additional info can enhance her intro.',
  },
];

export default function Speakers() {
  const scrollRef = useRef(null);

  const CARD_WIDTH = 300; // card width + gap

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 px-6 lg:px-12 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]">
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
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
                    <img
                      src={speaker.src}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Back Side */}
                  {/* <div
                    className="absolute w-full h-full backface-hidden rotate-y-180 
  bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 
  rounded-xl p-6 flex flex-col justify-center items-center text-center text-white"
                  >
                    <h3 className="text-xl font-semibold">{speaker.name}</h3>

                    <p className="text-base opacity-90">{speaker.role}</p>

                    <p className="text-base opacity-90">{speaker.title}</p>

                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-teal-400"
                    >
                      <Linkedin size={18} />
                      <span>{speaker.name}</span>
                    </a>

                    <div className="w-8 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded mt-4" />
                  </div> */}

                  {/* Back Side */}
                  {/* <div
                    className="absolute w-full h-full backface-hidden rotate-y-180 
  bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 
  rounded-xl p-6 flex flex-col justify-center items-center text-center text-white"
                  >
                    <h3 className="text-2xl font-bold mb-1 tracking-wide">
                      {speaker.name}
                    </h3>

                    <p className="text-sm font-medium text-teal-200 mb-3 uppercase">
                      {speaker.role}
                    </p>

                    <p className="text-base font-light text-white/90 leading-relaxed mb-4">
                      {speaker.title}
                    </p>

                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-teal-400 font-semibold"
                    >
                      <Linkedin size={18} />
                      <span>{speaker.name}</span>
                    </a>

                    <div className="w-10 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded mt-4" />
                  </div> */}

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
