import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfLogo from '../assets/conf_logo.png';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed!');
    } finally {
      navigate('/');
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
          <img src={ConfLogo} alt="ICAARTD Logo" className="w-9 h-9" />
          <span className="text-2xl font-bold font-poppins">ICAARTD</span>
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

            {/* Mobile Auth Buttons */}
            {!user ? (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition ${
                      pathname === '/register'
                        ? 'bg-white text-indigo-700'
                        : 'bg-purple-600 text-white hover:bg-white hover:text-purple-600'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition ${
                      pathname === '/login'
                        ? 'bg-white text-indigo-700'
                        : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                    }`}
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
                  className="w-full flex items-center gap-2 py-2 px-4 rounded-full font-semibold bg-red-600 text-white hover:bg-white hover:text-red-600"
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
