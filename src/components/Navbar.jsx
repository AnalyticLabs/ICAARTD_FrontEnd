// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, LogIn, UserPlus } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import WybbleAI from "../assets/logo.png";
// import ConfLogo from "../assets/conf_logo.png";
// import toast from "react-hot-toast";
// import { account } from "../utils/appwrite";

// const navLinks = [
//   { path: "/", label: "Home" },
//   { path: "/submit-paper", label: "Submission" },
//   { path: "/guidelines", label: "Guidelines" },
//   { path: "/review-process", label: "Review" },
//   { path: "/presentation", label: "Presentation" },
//   { path: "/dashboard", label: "Dashboard" },
//   { path: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { pathname } = useLocation();
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = async () => {
//     try {
//       await account.deleteSession("current");
//       setUser(null);
//       toast.success("Logged out succesfully");
//       navigate("/");
//     } catch (error) {
//       toast.error("Logout error");
//     }
//   };

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const userData = await account.get();
//         setUser(userData);
//       } catch {
//         setUser(null);
//       }
//     };

//     checkSession();
//   }, [location]);
//   return (
//     <motion.nav className="fixed top-0 w-full bg-gradient-to-b from-indigo-700 to-indigo-600 text-white py-4 px-6 z-50">
//       <div className="hidden md:flex items-center justify-between w-full max-w-[100rem] mx-auto">
//         {/* Left: Logo */}
//         <div className="flex items-center space-x-2 min-w-[160px]">
//           <Link to="/" className="flex items-center space-x-2 cursor-pointer">
//             <img src={ConfLogo} alt="WybbleAI Logo" className="w-9 h-9" />
//             <span className="text-2xl font-bold font-poppins mb-1">
//               ICAARTD
//             </span>
//           </Link>
//         </div>

//         {/* Center: Main Nav */}
//         <ul className="flex space-x-2">
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={link.path}
//                 className={`px-3 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
//                   pathname === link.path
//                     ? "bg-white text-purple-700 font-bold"
//                     : "hover:bg-white hover:text-purple-700"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Right: Auth - show only if user not logged in */}
//         <div className="flex space-x-3 min-w-[160px] justify-end">
//           {!user ? (
//             <>
//               <Link
//                 to="/register"
//                 className={`flex cursor-pointer items-center gap-1 px-4 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
//                   pathname === "/register"
//                     ? "bg-white text-indigo-700"
//                     : "bg-purple-600 text-white hover:bg-white hover:text-purple-600"
//                 }`}
//               >
//                 <UserPlus className="w-4 h-4" /> Register
//               </Link>
//               <Link
//                 to="/login"
//                 className={`flex cursor-pointer items-center gap-1 px-4 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
//                   pathname === "/login"
//                     ? "bg-white text-indigo-700"
//                     : "bg-green-600 text-white hover:bg-white hover:text-green-600"
//                 }`}
//               >
//                 <LogIn className="w-4 h-4" /> Login
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 cursor-pointer py-1 text-base rounded-full font-semibold bg-red-600 text-white hover:bg-white hover:text-red-600"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile */}
//       <div className="md:hidden flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2 cursor-pointer">
//           <img src={WybbleAI} alt="WybbleAI Logo" className="w-9 h-9" />
//           <span className="text-2xl font-bold font-poppins">WybbleAI</span>
//         </Link>
//         <button onClick={() => setMobileOpen(!mobileOpen)}>
//           {mobileOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.ul
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden mt-4 space-y-4 overflow-hidden bg-indigo-700/90 rounded-xl p-4 text-white"
//           >
//             {navLinks.map((link, index) => (
//               <li key={index}>
//                 <Link
//                   to={link.path}
//                   className={`block py-1 px-2 rounded-md font-medium ${
//                     pathname === link.path
//                       ? "bg-white text-indigo-700"
//                       : "hover:underline"
//                   }`}
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}

//             {/* Mobile Register/Login - only if user not logged in */}
//             {!user ? (
//               <>
//                 <li>
//                   <Link
//                     to="/register"
//                     className={`flex cursor-pointer items-center gap-2 py-1 px-3 rounded-md font-semibold ${
//                       pathname === "/register"
//                         ? "bg-white text-indigo-700"
//                         : "hover:bg-white hover:text-pink-600"
//                     }`}
//                     onClick={() => setMobileOpen(false)}
//                   >
//                     <UserPlus className="w-4 h-4" /> Register
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/login"
//                     className={`flex cursor-pointer items-center gap-2 py-1 px-3 rounded-md font-semibold ${
//                       pathname === "/login"
//                         ? "bg-white text-indigo-700"
//                         : "hover:bg-white hover:text-green-600"
//                     }`}
//                     onClick={() => setMobileOpen(false)}
//                   >
//                     <LogIn className="w-4 h-4" /> Login
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileOpen(false);
//                   }}
//                   className="w-full cursor-pointer flex justify-start items-center gap-2 py-1 px-3 rounded-md font-semibold bg-red-600 text-white hover:bg-white hover:text-red-600"
//                 >
//                   Logout
//                 </button>
//               </li>
//             )}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WybbleAI from '../assets/logo.png';
import ConfLogo from '../assets/conf_logo.png';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // import AuthContext

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/submit-paper', label: 'Submission' },
  { path: '/guidelines', label: 'Guidelines' },
  { path: '/review-process', label: 'Review' },
  { path: '/presentation', label: 'Presentation' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth(); // get user & logout from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed!');
    }
  };

  return (
    <motion.nav className="fixed top-0 w-full bg-gradient-to-b from-indigo-700 to-indigo-600 text-white py-4 px-6 z-50">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[100rem] mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 min-w-[160px]">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <img src={ConfLogo} alt="WybbleAI Logo" className="w-9 h-9" />
            <span className="text-2xl font-bold font-poppins mb-1">
              ICAARTD
            </span>
          </Link>
        </div>

        {/* Center: Main Nav */}
        <ul className="flex space-x-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`px-3 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
                  pathname === link.path
                    ? 'bg-white text-purple-700 font-bold'
                    : 'hover:bg-white hover:text-purple-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth */}
        <div className="flex space-x-3 min-w-[160px] justify-end">
          {!user ? (
            <>
              <Link
                to="/register"
                className={`flex cursor-pointer items-center gap-1 px-4 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
                  pathname === '/register'
                    ? 'bg-white text-indigo-700'
                    : 'bg-purple-600 text-white hover:bg-white hover:text-purple-600'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Register
              </Link>
              <Link
                to="/login"
                className={`flex cursor-pointer items-center gap-1 px-4 py-1 text-base rounded-full transition-all duration-200 font-semibold ${
                  pathname === '/login'
                    ? 'bg-white text-indigo-700'
                    : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                }`}
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 cursor-pointer py-1 text-base rounded-full font-semibold bg-red-600 text-white hover:bg-white hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <img src={WybbleAI} alt="WybbleAI Logo" className="w-9 h-9" />
          <span className="text-2xl font-bold font-poppins">WybbleAI</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-4 space-y-4 overflow-hidden bg-indigo-700/90 rounded-xl p-4 text-white"
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`block py-1 px-2 rounded-md font-medium ${
                    pathname === link.path
                      ? 'bg-white text-indigo-700'
                      : 'hover:underline'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!user ? (
              <>
                <li>
                  <Link
                    to="/register"
                    className={`flex cursor-pointer items-center gap-2 py-1 px-3 rounded-md font-semibold ${
                      pathname === '/register'
                        ? 'bg-white text-indigo-700'
                        : 'hover:bg-white hover:text-pink-600'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={`flex cursor-pointer items-center gap-2 py-1 px-3 rounded-md font-semibold ${
                      pathname === '/login'
                        ? 'bg-white text-indigo-700'
                        : 'hover:bg-white hover:text-green-600'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full cursor-pointer flex justify-start items-center gap-2 py-1 px-3 rounded-md font-semibold bg-red-600 text-white hover:bg-white hover:text-red-600"
                >
                  Logout
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
