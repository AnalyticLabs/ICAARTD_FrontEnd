import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [role, setRole] = useState('admin');

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        registerUser({
          fullname: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role,
        })
      ).unwrap();

      console.log('Navigating to VerifyOTP with:', {
        email: resultAction.email,
        role: resultAction.role,
      });

      toast.success('Registration successful! Please verify your email.');
      // Navigate to OTP verification page
      navigate('/verify-otp', {
        state: { email: resultAction.email, userRole: resultAction.role },
      });
    } catch (err) {
      toast.error('Failed to send OTP');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4 overflow-hidden">
      {/* Background Shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 30, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute top-10 left-10 w-72 h-72 bg-purple-400 opacity-30 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 opacity-30 blur-3xl rounded-full"
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 z-10"
      >
        {/* Heading */}
        <div className="flex flex-col items-center justify-center mb-6 text-indigo-600">
          <UserPlus className="w-8 h-8" />
          <h2 className="mt-2 text-2xl font-extrabold tracking-wide">
            Create an Account
          </h2>

          {/* Toggle Tabs */}
          <div className="flex w-full mt-4 border border-indigo-300 rounded-xl overflow-hidden">
            {['admin', 'author'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRole(tab)}
                className={`px-6 py-2 w-1/2 cursor-pointer font-medium transition-colors capitalize ${
                  role === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full cursor-pointer text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Register as {role}
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
