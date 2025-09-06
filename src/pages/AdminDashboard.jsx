import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Eye,
  Download,
  X,
  Mail,
  StickyNote,
  Tags,
  Loader,
  Newspaper,
  Hourglass,
  CircleCheckBig,
  CircleX,
  FileCheck2,
  Search,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPapers,
  getUserPapers,
  updatePaperStatus,
  deletePaper,
} from '../features/papers/paperSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { papers, loading } = useSelector((state) => state.papers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || 'Author';
  const userEmail = user?.email;

  // ------------------- Reusable fetch function -------------------
  const fetchPapers = useCallback(async () => {
    try {
      if (userRole === 'admin') {
        await dispatch(getAllPapers()).unwrap();
      } else {
        await dispatch(getUserPapers(userEmail)).unwrap();
      }
    } catch (err) {
      toast.error('Failed to fetch papers');
    }
  }, [dispatch, userRole, userEmail]);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const filteredPapers = papers.filter((paper) => {
    const search = searchTerm.toLowerCase();
    return (
      paper.paperTitle?.toLowerCase().includes(search) ||
      paper.abstract?.toLowerCase().includes(search) ||
      (Array.isArray(paper.keywords)
        ? paper.keywords.join(',')
        : paper.keywords
      )
        .toLowerCase()
        .includes(search) ||
      paper.email?.toLowerCase().includes(search) ||
      paper.fullname?.toLowerCase().includes(search)
    );
  });

  const handleView = (pdfFileUrl) => {
    setSelectedPdf(pdfFileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPdf(null);
  };

  const handleEdit = (paper) => {
    navigate('/submit-paper', { state: { paper, isEdit: true } });
  };

  const handleDelete = async (paperId) => {
    if (!window.confirm('Are you sure you want to delete this paper?')) return;

    try {
      await dispatch(deletePaper(paperId)).unwrap();
      toast.success('Paper deleted successfully!');
      fetchPapers();
    } catch (error) {
      toast.error('Failed to delete paper');
    }
  };

  const handleStatusChange = async (paperId, status) => {
    const toastId = toast.loading('Updating status...');
    try {
      await dispatch(updatePaperStatus({ paperId, status })).unwrap();
      toast.success('Status updated!', { id: toastId });
      fetchPapers();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const getStatusUI = (status) => {
    switch (status) {
      case 'Submitted':
        return {
          bg: 'bg-gray-100 text-gray-800',
          icon: <Newspaper className="w-3 h-3 mr-1" />,
        };
      case 'Review Awaiting':
        return {
          bg: 'bg-yellow-100 text-yellow-800',
          icon: <Hourglass className="w-3 h-3 mr-1" />,
        };
      case 'Review Obtained':
        return {
          bg: 'bg-blue-100 text-blue-800',
          icon: <FileCheck2 className="w-3 h-3 mr-1" />,
        };
      case 'Accept':
        return {
          bg: 'bg-green-100 text-green-800',
          icon: <CircleCheckBig className="w-3 h-3 mr-1" />,
        };
      case 'Reject':
        return {
          bg: 'bg-red-100 text-red-800',
          icon: <CircleX className="w-3 h-3 mr-1" />,
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-800',
          icon: <Loader className="w-3 h-3 mr-1" />,
        };
    }
  };

  return (
    <motion.div className="relative min-h-screen px-8 py-10 bg-gradient-to-br from-neutral-50 to-slate-100 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 16 }}
        className="absolute top-20 left-10 w-[400px] h-[400px] bg-sky-300 opacity-20 blur-[100px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="absolute bottom-24 right-10 w-[420px] h-[420px] bg-rose-300 opacity-20 blur-[100px] rounded-full z-0"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute top-[50%] left-[45%] w-[360px] h-[360px] bg-emerald-300 opacity-15 blur-[100px] rounded-full z-0"
      />

      <motion.div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          <span className="text-white">🧾</span> Admin Paper Submissions
        </h1>
      </motion.div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search papers by title, author, keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-gray-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 w-5 h-5" />
      </div>

      {loading ? (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading submissions...
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          No papers submitted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 24px rgba(99, 102, 241, 0.4)',
              }}
              className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-md group transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse"></div>

              <div className="flex items-center gap-2 text-indigo-700 mb-3">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-bold tracking-tight group-hover:text-indigo-900">
                  {paper.paperTitle}
                </h2>
              </div>

              <div className="space-y-3 text-sm bg-gray-50 rounded-xl p-4 animate-fadeIn">
                <p className="text-gray-700 flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-indigo-500" />
                  <span>
                    <span className="font-medium">Email:</span> {paper.email}
                  </span>
                </p>
                <p className="text-gray-700 flex items-start gap-2">
                  <StickyNote className="w-[16px] h-[18px] text-indigo-500 mt-[2px] flex-shrink-0" />
                  <span className="leading-snug">
                    <span className="font-medium">Abstract:</span>{' '}
                    {paper.abstract}
                  </span>
                </p>
                <p className="text-gray-700 flex items-start gap-2">
                  <Tags className="w-4 h-4 mt-0.5 text-indigo-500" />
                  <span>
                    <span className="font-medium">Keywords:</span>{' '}
                    {paper.keywords}
                  </span>
                </p>

                <p className="text-gray-700 flex items-center gap-2">
                  <Loader className="w-4 h-4 mt-0.5 text-indigo-500" />
                  <span className="font-medium">Status:</span>
                  {userRole === 'admin' ? (
                    paper.status === 'Accept' ? (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusUI(paper.status).bg
                        }`}
                      >
                        {getStatusUI(paper.status).icon}
                        {paper.status}
                      </span>
                    ) : (
                      <Select
                        defaultValue={paper.status || 'Submitted'}
                        onValueChange={(value) =>
                          handleStatusChange(paper._id, value)
                        }
                      >
                        <SelectTrigger className="w-52 rounded-xl border border-gray-200 shadow-md bg-white px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-400">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl shadow-lg border border-gray-200 bg-white p-2">
                          {[
                            'Submitted',
                            'Review Awaiting',
                            'Review Obtained',
                            'Accept',
                            'Reject',
                          ].map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className={`cursor-pointer mb-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
                                getStatusUI(status).bg
                              }`}
                            >
                              <span className="flex items-center gap-1">
                                {getStatusUI(status).icon}
                                {status}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusUI(paper.status).bg
                      }`}
                    >
                      {getStatusUI(paper.status).icon}
                      {paper.status}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-between pt-5">
                <div className="flex gap-6">
                  <button
                    onClick={() => handleView(paper.pdfFileViewerUrl)}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 transition"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <a
                    href={paper.pdfFileDownloadUrl}
                    download
                    className="cursor-pointer text-green-600 hover:text-green-800 font-medium inline-flex items-center gap-1 transition"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
                {paper.status !== 'Accept' && (
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(paper)}
                      className="cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 rounded-3xl px-4 py-1 font-medium inline-flex items-center gap-1 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(paper._id)}
                      className="cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-3xl px-4 py-1 font-medium inline-flex items-center gap-1 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {modalOpen && selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] p-4 relative"
          >
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-3 right-3 text-white z-10 bg-red-600 rounded-full p-2 shadow"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`${selectedPdf}#toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Viewer"
              className="w-full h-full rounded-lg border border-gray-200"
            ></iframe>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
