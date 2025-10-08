import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

