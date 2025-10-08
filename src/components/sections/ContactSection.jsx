import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SocialIcon from '../ui/SocialIcon';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'ansar@example.com',
      href: 'mailto:ansar@example.com'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'New York, NY',
      href: 'https://maps.google.com'
    }
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
              <span className="gradient-text">Let's Work Together</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear from you. Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-effect rounded-2xl p-8 hover:glass-button transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  I'm always open to discussing new opportunities, creative projects, 
                  or just having a friendly conversation about technology and development.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                        <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {info.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Connect With Me Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Social Links */}
                <div className="glass-effect rounded-2xl p-8 hover:glass-button transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      Let's Connect
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Follow me on social media for updates and insights
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { 
                        name: 'LinkedIn', 
                        url: 'https://linkedin.com/in/ansar-thameem',
                        iconType: 'LinkedIn',
                        gradient: 'from-blue-600 to-blue-800',
                        description: 'Professional Network',
                        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                        textColor: 'text-blue-700 dark:text-blue-300'
                      },
                      { 
                        name: 'GitHub', 
                        url: 'https://github.com/ansar-thameem',
                        iconType: 'GitHub',
                        gradient: 'from-gray-700 to-gray-900',
                        description: 'Open Source Projects',
                        bgColor: 'bg-gray-50 dark:bg-gray-800/50',
                        textColor: 'text-gray-700 dark:text-gray-300'
                      },
                      { 
                        name: 'Twitter', 
                        url: 'https://twitter.com/ansar_thameem',
                        iconType: 'Twitter',
                        gradient: 'from-blue-400 to-blue-600',
                        description: 'Tech Insights & Updates',
                        bgColor: 'bg-sky-50 dark:bg-sky-900/20',
                        textColor: 'text-sky-700 dark:text-sky-300'
                      },
                      { 
                        name: 'Portfolio', 
                        url: 'https://ansar-portfolio.com',
                        iconType: 'Portfolio',
                        gradient: 'from-purple-600 to-purple-800',
                        description: 'Latest Work & Projects',
                        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                        textColor: 'text-purple-700 dark:text-purple-300'
                      }
                    ].map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative overflow-hidden rounded-xl ${social.bgColor} border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-primary-500/25 hover:border-gray-300 dark:hover:border-gray-600`}
                        whileHover={{ scale: 1.02, y: -3 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${social.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                              <SocialIcon type={social.iconType} className={`w-6 h-6 ${social.textColor}`} />
                            </div>
                            <div className={`w-2 h-2 ${social.textColor} opacity-60 rounded-full group-hover:opacity-100 transition-opacity duration-300`}></div>
                          </div>
                          <h4 className={`font-bold text-lg mb-2 ${social.textColor}`}>{social.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{social.description}</p>
                        </div>
                        
                        {/* Hover Effect */}
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${social.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Stats */}
                <div className="glass-effect rounded-2xl p-6 hover:glass-button transition-all duration-300">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="group">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                        24h
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Response Time
                      </div>
                    </div>
                    <div className="group">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                        100%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Project Success
                      </div>
                    </div>
                    <div className="group">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                        24/7
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Available
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-8 hover:glass-button transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        Message sent successfully! I'll get back to you soon.
                      </>
                    ) : (
                      <>
                        <ExclamationCircleIcon className="w-5 h-5" />
                        Something went wrong. Please try again.
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Removed decorative elements to prevent overflow */}
    </section>
  );
};

export default ContactSection; 