import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FeatureCard({ path, Icon, title, description, delay }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onClick={() => navigate(path)}
      className="group cursor-pointer rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-lg hover:shadow-xl p-6 flex flex-col items-center text-center space-y-3 hover:bg-indigo-50 transition-all duration-300"
    >
      <div className="bg-indigo-100 group-hover:bg-indigo-200 p-4 rounded-full transition-colors duration-300">
        <Icon className="text-indigo-600" size={28} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
