import { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, FileText, FilePlus } from 'lucide-react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitPaper, updatePaper } from '../features/papers/paperSlice';

export default function SubmitPaper() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paper, isEdit } = location.state || {};

  const [form, setForm] = useState({
    fullname: paper?.fullname || '',
    email: paper?.email || '',
    paperTitle: paper?.paperTitle || '',
    abstract: paper?.abstract || '',
    keywords: paper?.keywords ? paper.keywords[0] : '',
    confirm: false,
    pdfFile: null,
    supplementary: null,
  });

  const { loading } = useSelector((state) => state.papers);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullname ||
      !form.email ||
      !form.paperTitle ||
      !form.abstract ||
      (!form.pdfFile && !isEdit) ||
      !form.confirm
    ) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', form.fullname);
    formData.append('email', form.email);
    formData.append('paperTitle', form.paperTitle);
    formData.append('abstract', form.abstract);
    formData.append('keywords', form.keywords);

    if (form.pdfFile) formData.append('pdfFile', form.pdfFile);
    if (form.supplementary)
      formData.append('supplementaryPdf', form.supplementary);

    try {
      toast.loading(
        isEdit ? 'Updating your paper...' : 'Submitting your paper...'
      );

      if (isEdit) {
        await dispatch(updatePaper({ paperId: paper._id, formData })).unwrap();
        toast.dismiss();
        toast.success('Paper updated successfully!');
      } else {
        await dispatch(submitPaper(formData)).unwrap();
        toast.dismiss();
        toast.success('Paper submitted successfully!');
      }

      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();
      toast.error(error || 'Something went wrong');
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i } }),
  };

  const keywordOptions = [
    { label: 'Artificial Intelligence', value: 'AI' },
    { label: 'Machine Learning', value: 'ML' },
    { label: 'Natural Language Processing', value: 'NLP' },
    { label: 'Computer Vision', value: 'CV' },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-20 left-10 w-72 h-72 bg-purple-400 opacity-25 blur-3xl rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 opacity-25 blur-3xl rounded-full z-0"
      />

      {/* Paper Submission Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl mx-auto mt-12 mb-10 px-8 py-10 bg-white/70 backdrop-blur-2xl shadow-[rgba(0,0,0,0.15)_0px_25px_50px_-12px] rounded-[2rem] border border-white/30"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-indigo-700 mb-6"
        >
          📝 Submit Your Paper
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name & Email */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
          >
            <div className="relative">
              <User className="absolute left-3 top-3 text-indigo-500" />
              <input
                name="fullname"
                placeholder="Full Name"
                value={form.fullname}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
          >
            <input
              name="paperTitle"
              placeholder="Paper Title"
              value={form.paperTitle}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </motion.div>

          {/* Abstract */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
          >
            <textarea
              name="abstract"
              placeholder="Abstract"
              rows={4}
              value={form.abstract}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </motion.div>

          {/* Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <span className="text-gray-700">
                {form.keywords
                  ? keywordOptions.find((k) => k.value === form.keywords)?.label
                  : 'Select Keywords'}
              </span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-indigo-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  {keywordOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          keywords: option.value,
                        }));
                        setDropdownOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 flex items-center justify-between ${
                        form.keywords === option.value ? 'bg-indigo-100' : ''
                      }`}
                    >
                      {option.label}
                      {form.keywords === option.value && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Upload PDF */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={5}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload PDF <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg cursor-pointer border border-indigo-200 shadow-md transition">
                <FileText className="mr-2" />
                <span>Choose File</span>
                <input
                  type="file"
                  name="pdfFile"
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <span className="text-gray-600 text-sm">
                {form.pdfFile ? form.pdfFile.name : 'No file chosen'}
              </span>
            </div>
          </motion.div>

          {/* Supplementary */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={6}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Supplementary (Optional)
            </label>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer border border-gray-300 shadow-md transition">
                <FilePlus className="mr-2" />
                <span>Choose File</span>
                <input
                  type="file"
                  name="supplementary"
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <span className="text-gray-600 text-sm">
                {form.supplementary
                  ? form.supplementary.name
                  : 'No file chosen'}
              </span>
            </div>
          </motion.div>

          {/* Confirmation Checkbox */}
          <motion.label
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={7}
            className="flex items-center gap-2 text-base font-medium"
          >
            <input
              type="checkbox"
              name="confirm"
              checked={form.confirm}
              onChange={handleChange}
              className="w-4 h-4"
            />
            I confirm this is original work
          </motion.label>

          {/* Submit Button */}
          <motion.button
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={8}
            type="submit"
            className="w-full cursor-pointer py-3 mt-2 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform"
            disabled={loading}
          >
            {isEdit ? '✏️ Edit Paper' : '🚀 Submit'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
