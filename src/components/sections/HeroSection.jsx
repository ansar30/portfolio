import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentArrowDownIcon, 
  EnvelopeIcon, 
  ChevronDownIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const HeroSection = () => {
  const [showAll, setShowAll] = useState(false);

  const techStack = [
    'React', 'Node.js', 'TypeScript', 'MySQL', 'MongoDB', 
    'Express', 'Next.js', 'Nest.js', 'Tailwind CSS', 
    'Ant Design', 'Material UI', 'Storybook', 'Jest', 
    'Bootstrap', 'JavaScript', 'HTML', 'CSS'
  ];

  const displayedTechStack = showAll ? techStack : techStack.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };



  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8">
      {/* Removed mouse follower to prevent overflow */}

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <SparklesIcon className="w-4 h-4 text-primary-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Welcome to my portfolio
            </span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
        >
          <span className="block text-gray-900 dark:text-white">
            Hi, I'm{' '}
            <motion.span
              className="gradient-text inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Ansar Thameem
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          A passionate{' '}
          <motion.span
            className="font-semibold text-primary-600 dark:text-primary-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Full Stack Developer
          </motion.span>
          {' '}crafting elegant solutions to complex problems with modern technologies
        </motion.p>

        {/* Tech Stack */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mb-4">
            {displayedTechStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 glass-effect rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:glass-button transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {techStack.length > 8 && (
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Show Less' : 'Show More'}
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Get In Touch
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={`${process.env.PUBLIC_URL}/assets/Ansar-resume-2025.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 glass-effect hover:glass-button rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Removed floating icon to prevent overflow */}
      </motion.div>

    </section>
  );
};

export default HeroSection; 