import React from 'react';
import { motion } from 'framer-motion';
import TechIcon from '../ui/TechIcon';


const SkillsSection = () => {

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-orange-500' },
        { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-400' },
        { name: 'HTML/CSS', level: 95, color: 'from-red-500 to-pink-500' },
        { name: 'Tailwind CSS', level: 85, color: 'from-cyan-500 to-teal-500' },
        { name: 'Next.js', level: 75, color: 'from-gray-800 to-gray-600' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'Express', level: 80, color: 'from-gray-600 to-gray-800' },
        { name: 'Nest.js', level: 70, color: 'from-red-600 to-red-800' },
        { name: 'Python', level: 75, color: 'from-blue-500 to-yellow-500' },
        { name: 'REST APIs', level: 90, color: 'from-purple-500 to-indigo-500' },
        { name: 'GraphQL', level: 65, color: 'from-pink-500 to-purple-500' },
      ],
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'MySQL', level: 80, color: 'from-orange-500 to-red-500' },
        { name: 'MongoDB', level: 75, color: 'from-green-600 to-green-800' },
        { name: 'Git', level: 90, color: 'from-orange-600 to-red-600' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-blue-700' },
        { name: 'AWS', level: 65, color: 'from-orange-400 to-yellow-500' },
        { name: 'Jest', level: 75, color: 'from-red-500 to-pink-500' },
      ],
    },
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
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
          <motion.div variants={categoryVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={categoryVariants}
                className="glass-effect rounded-2xl p-6 hover:glass-button transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      className="group"
                    >
                      {/* Skill Name and Level */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.1 + skillIndex * 0.1,
                              ease: 'easeOut'
                            }}
                          />
                        </div>
                        
                        {/* Glow effect on hover */}
                        <motion.div
                          className={`absolute inset-0 h-2 bg-gradient-to-r ${skill.color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Technologies */}
          <motion.div
            variants={categoryVariants}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Additional Technologies & Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A comprehensive toolkit of modern technologies I use to build exceptional digital experiences
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
              {[
                { name: 'Redux', iconType: 'Redux', category: 'State Management', color: 'text-purple-600 dark:text-purple-400' },
                { name: 'Socket.io', iconType: 'Socket', category: 'Real-time', color: 'text-green-600 dark:text-green-400' },
                { name: 'Webpack', iconType: 'Webpack', category: 'Build Tool', color: 'text-blue-600 dark:text-blue-400' },
                { name: 'Vite', iconType: 'Vite', category: 'Build Tool', color: 'text-yellow-600 dark:text-yellow-400' },
                { name: 'Sass', iconType: 'Sass', category: 'CSS Preprocessor', color: 'text-pink-600 dark:text-pink-400' },
                { name: 'Less', iconType: 'Design', category: 'CSS Preprocessor', color: 'text-indigo-600 dark:text-indigo-400' },
                { name: 'Material-UI', iconType: 'Material', category: 'UI Framework', color: 'text-blue-700 dark:text-blue-500' },
                { name: 'Ant Design', iconType: 'Design', category: 'UI Framework', color: 'text-red-600 dark:text-red-400' },
                { name: 'Bootstrap', iconType: 'Bootstrap', category: 'CSS Framework', color: 'text-purple-700 dark:text-purple-500' },
                { name: 'Storybook', iconType: 'Testing', category: 'UI Testing', color: 'text-orange-600 dark:text-orange-400' },
                { name: 'Firebase', iconType: 'Firebase', category: 'Backend Service', color: 'text-orange-700 dark:text-orange-500' },
                { name: 'Heroku', iconType: 'Cloud', category: 'Cloud Platform', color: 'text-purple-800 dark:text-purple-600' },
                { name: 'Netlify', iconType: 'Cloud', category: 'Hosting', color: 'text-teal-600 dark:text-teal-400' },
                { name: 'Vercel', iconType: 'Cloud', category: 'Deployment', color: 'text-gray-800 dark:text-gray-400' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="glass-effect rounded-xl p-4 sm:p-6 text-center hover:glass-button transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/25">
                    <div className={`${tech.color} mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                      <TechIcon type={tech.iconType} className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {tech.category}
                    </p>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                    Used for {tech.category}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Removed decorative elements to prevent overflow */}
    </section>
  );
};

export default SkillsSection; 