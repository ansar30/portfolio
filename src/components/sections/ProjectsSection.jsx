import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  EyeIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web App', 'Mobile', 'API', 'E-commerce'];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      category: 'E-commerce',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and checkout process',
        'Payment integration with Stripe',
        'Admin dashboard for inventory management',
        'Order tracking and history'
      ]
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      category: 'Web App',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL', 'Redis'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Real-time collaboration with Socket.io',
        'Drag-and-drop task management',
        'Team workspaces and permissions',
        'File attachments and comments',
        'Progress tracking and analytics',
        'Mobile-responsive design'
      ]
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
      category: 'Web App',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Location-based weather forecasts',
        'Interactive weather maps',
        'Historical weather data',
        'Weather alerts and notifications',
        'Multiple location tracking',
        'Responsive design with dark mode'
      ]
    },
    {
      id: 4,
      title: 'Restaurant Finder',
      description: 'A mobile app for finding restaurants with filters, reviews, and reservation booking functionality.',
      category: 'Mobile',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Google Maps API', 'Expo'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Location-based restaurant search',
        'Advanced filtering and sorting',
        'User reviews and ratings',
        'Reservation booking system',
        'Favorite restaurants list',
        'Push notifications for offers'
      ]
    },
    {
      id: 5,
      title: 'Blog CMS API',
      description: 'A robust content management system API with authentication, content versioning, and media management.',
      category: 'API',
      image: '/api/placeholder/400/300',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'RESTful API with comprehensive endpoints',
        'User authentication and role-based access',
        'Content versioning and drafts',
        'Media upload and management',
        'Search and filtering capabilities',
        'Rate limiting and security measures'
      ]
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website with animations, dark mode, and contact form integration.',
      category: 'Web App',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Responsive design with mobile-first approach',
        'Dark and light theme toggle',
        'Smooth animations and transitions',
        'Contact form with email integration',
        'SEO optimized with meta tags',
        'Performance optimized and accessible'
      ]
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'glass-effect hover:glass-button text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group glass-effect rounded-2xl overflow-hidden hover:glass-button transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <EyeIcon className="w-5 h-5" />
                        </motion.button>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-effect rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedProject.description}
                  </p>
                  
                  <div className="flex gap-4 mb-4">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-effect hover:glass-button rounded-lg transition-colors"
                    >
                      <CodeBracketIcon className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection; 