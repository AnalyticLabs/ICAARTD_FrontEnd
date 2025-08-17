import { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, FileText, FilePlus } from "lucide-react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  databases,
  storage,
  BUCKET_ID,
  DATABASE_ID,
  COLLECTION_ID,
} from "../utils/appwrite";
import { ID, Permission, Role } from "appwrite";
import { useLocation, useNavigate } from "react-router-dom";

export default function SubmitPaper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { paper, isEdit } = location.state || {};

  const [form, setForm] = useState({
    fullName: paper?.fullName || "",
    email: paper?.email || "",
    title: paper?.title || "",
    abstract: paper?.abstract || "",
    keywords: paper?.keywords || "",
    confirm: false,
    pdfFile: null,
    supplementary: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.title ||
      !form.abstract ||
      (!form.pdfFile && !isEdit) ||
      !form.confirm
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (isEdit) {
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, paper.$id, {
          fullName: form.fullName,
          email: form.email,
          title: form.title,
          abstract: form.abstract,
          keywords: form.keywords,
          pdfURL: paper.pdfURL,
        });
        toast.success("Paper updated successfully!");
        navigate("/dashboard");
        return;
      }

      toast.loading("Uploading your files...");

      const pdfFileId = ID.unique();
      const uploadedPDF = await storage.createFile(
        BUCKET_ID,
        pdfFileId,
        form.pdfFile,
        [Permission.read(Role.any())]
      );
      const pdfURL = storage.getFileView(BUCKET_ID, uploadedPDF.$id).toString();

      if (!pdfURL) {
        toast.dismiss();
        toast.error("PDF upload failed. URL not generated.");
        return;
      }

      let suppURL = null;
      if (form.supplementary) {
        const suppFileId = ID.unique();
        const uploadedSupp = await storage.createFile(
          BUCKET_ID,
          suppFileId,
          form.supplementary,
          [Permission.read(Role.any())]
        );
        suppURL = storage.getFileView(BUCKET_ID, uploadedSupp.$id).toString();
      }

      toast.loading("Submitting your data...");

      const documentData = {
        fullName: form.fullName,
        email: form.email,
        title: form.title,
        abstract: form.abstract,
        keywords: form.keywords || "",
        pdfURL,
        suppURL,
      };

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        documentData
      );

      toast.dismiss();
      toast.success("Paper submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message || "Something went wrong");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i },
    }),
  };

  const keywordOptions = [
    { label: "Artificial Intelligence", value: "AI" },
    { label: "Machine Learning", value: "ML" },
    { label: "Natural Language Processing", value: "NLP" },
    { label: "Computer Vision", value: "CV" },
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
        transition={{ duration: 0.7, ease: "easeOut" }}
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
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
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
              name="title"
              placeholder="Paper Title"
              value={form.title}
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
                  : "Select Keywords"}
              </span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-indigo-500" />
              </motion.div>
            </button>

            {/* Dropdown Menu */}
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
                        form.keywords === option.value ? "bg-indigo-100" : ""
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
                {form.pdfFile ? form.pdfFile.name : "No file chosen"}
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
                  : "No file chosen"}
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
          >
            {isEdit ? "✏️ Edit Paper" : "🚀 Submit"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
