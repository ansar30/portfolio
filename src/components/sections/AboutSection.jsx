import React from 'react';
import { motion } from 'framer-motion';

import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  LightBulbIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const AboutSection = () => {

  const stats = [
    { number: '3+', label: 'Years Experience', icon: BriefcaseIcon },
    { number: '20+', label: 'Projects Completed', icon: LightBulbIcon },
    { number: '5+', label: 'Technologies Mastered', icon: AcademicCapIcon },
    { number: '100%', label: 'Client Satisfaction', icon: HeartIcon },
  ];

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
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate about creating innovative solutions and bringing ideas to life through code
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-effect rounded-2xl p-8 hover:glass-button transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Hello! I'm Ansar Thameem
                </h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    I'm a dedicated Full Stack Developer with a passion for creating 
                    exceptional digital experiences. With expertise in modern web technologies, 
                    I bring ideas to life through clean, efficient code and intuitive design.
                  </p>
                  <p>
                    My journey in software development started with a curiosity about how 
                    things work behind the scenes. Today, I specialize in building scalable 
                    web applications using React, Node.js, and cutting-edge technologies.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or sharing knowledge with the 
                    developer community.
                  </p>
                </div>
              </div>

              {/* Skills Highlight */}
              <div className="glass-effect rounded-2xl p-6 hover:glass-button transition-all duration-300">
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  What I Do Best
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Frontend Development', 'Backend Development', 'Database Design', 'API Integration'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-effect rounded-xl p-6 text-center hover:glass-button transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary-500/10 rounded-full group-hover:bg-primary-500/20 transition-colors duration-300">
                        <stat.icon className="w-6 h-6 text-primary-500" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Personal Touch */}
              <div className="glass-effect rounded-xl p-6 hover:glass-button transition-all duration-300">
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Fun Facts About Me
                </h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500">🚀</span>
                    <span className="text-sm">Always learning new technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500">☕</span>
                    <span className="text-sm">Coffee enthusiast and problem solver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500">🎯</span>
                    <span className="text-sm">Detail-oriented perfectionist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500">🌟</span>
                    <span className="text-sm">Believer in clean, maintainable code</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Removed decorative elements to prevent overflow */}
    </section>
  );
};

export default AboutSection; 