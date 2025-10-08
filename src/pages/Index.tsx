import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('about');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'achievements', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Initialize EmailJS
      emailjs.init("HvAny0vZH4eGmJLz8");
      
      await emailjs.send(
        "service_onv5ens",
        "template_ubsefdf",
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          message: formData.message,
        }
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <span className="text-lg font-bold">MA</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-base font-semibold tracking-tight">Mohammed Ansar</div>
                <div className="text-xs text-gray-400">GenAI Engineer</div>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {['About', 'Experience', 'Skills', 'Achievements', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-xl'
                  }`}
                >
                  {item}
                </button>
              ))}
      </div>

            <a
              href="mailto:ansarthameem30@gmail.com"
              className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Section */}
        <section id="about" className="min-h-[85vh] flex flex-col justify-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 mb-6 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Available for opportunities</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Senior Full Stack<br />
              Developer &<br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                GenAI Engineer
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl leading-relaxed font-light"
          >
            3+ years of experience specializing in GenAI solutions and cloud-native applications. 
            Expert in AWS Bedrock, RAG architectures, and LLM integrations with proven track record 
            in delivering scalable enterprise solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
          >
            <a
              href="https://www.linkedin.com/in/mohammed-thameem-ansar/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg text-center hover:scale-105"
            >
              View LinkedIn
            </a>
            <a
              href="/assets/Updated-pdf-OCT-2025.pdf"
              download="Mohammed_Ansar_Resume_Oct_2025.pdf"
              className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all duration-300 text-center hover:scale-105"
            >
              Download Resume
            </a>
            <a
              href="tel:8056452530"
              className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all duration-300 text-center hover:scale-105"
            >
              +91 8056452530
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-16 max-w-2xl"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">3+</div>
              <div className="text-xs sm:text-sm text-gray-400">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">50K+</div>
              <div className="text-xs sm:text-sm text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">10K+</div>
              <div className="text-xs sm:text-sm text-gray-400">Requests</div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 md:mb-40">
          <div className="flex items-baseline space-x-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Experience
            </motion.h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="space-y-8">
            {/* Kaay Labs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex flex-col gap-3 mb-6 md:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 tracking-tight">GenAI Engineer</h3>
                      <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light">Kaay Labs, Chennai</p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap self-start">
                      May 2023 - Present
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">GenAI & AWS Bedrock</h4>
                    <ul className="space-y-2 md:space-y-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Architected production-grade GenAI solutions using AWS Bedrock</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Developed RAG systems with 45% accuracy improvement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Built serverless AI pipelines processing 10K+ daily requests</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Full Stack Development</h4>
                    <ul className="space-y-2 md:space-y-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Led MERN stack development serving 50K+ users</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Architected microservices using NestJS and Node.js</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Reduced load times by 40% through optimization</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Cloud & Infrastructure</h4>
                    <ul className="space-y-2 md:space-y-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Designed AWS architectures with Lambda, S3, IAM</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                        <span>Reduced deployment time by 60% with CI/CD</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TCS */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 tracking-tight">System Engineer</h3>
                      <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light">Tata Consultancy Services, Chennai</p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap self-start">
                      Mar 2021 - Dec 2022
                    </div>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 text-sm sm:text-base text-gray-400 leading-relaxed">
                  <li className="flex items-start">
                    <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                    <span>Developed enterprise applications for Fortune 500 clients using Java and Spring Boot</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                    <span>Collaborated with international clients from US and UK</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                    <span>Maintained 99.5% SLA adherence in production support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 md:mr-3 mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white flex-shrink-0"></span>
                    <span>Optimized database queries improving performance by 50%</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24 md:mb-40">
          <div className="flex items-baseline space-x-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Expertise
            </motion.h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6 tracking-tight">Full Stack Development</h3>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Material UI'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express.js', 'NestJS', 'Python'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">Databases</p>
                  <div className="flex flex-wrap gap-2">
                    {['MongoDB', 'MySQL', 'Sequelize', 'Knex'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6 tracking-tight">GenAI & Cloud</h3>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">AWS Services</p>
                  <div className="flex flex-wrap gap-2">
                    {['Bedrock (Expert)', 'Lambda', 'S3', 'IAM', 'CloudWatch', 'SageMaker'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">AI Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['RAG', 'Vector DB', 'Pinecone', 'LLM Integration', 'Prompt Engineering'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">DevOps & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'CI/CD', 'Jira', 'Agile', 'TDD'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="mb-24 md:mb-40">
          <div className="flex items-baseline space-x-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Achievements
            </motion.h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Promoted to GenAI Engineer', metric: '2024', description: 'Recognized for AI/ML expertise and technical leadership' },
              { title: 'Performance Optimization', metric: '40%', description: 'Reduced application load times through optimization' },
              { title: 'RAG System Implementation', metric: '45%', description: 'Improved information retrieval accuracy' },
              { title: 'Serverless AI Pipeline', metric: '10K+', description: 'Daily requests processed with <2s latency' },
              { title: 'CI/CD Enhancement', metric: '60%', description: 'Faster deployment with automated workflows' },
              { title: 'User Base Growth', metric: '50K+', description: 'Monthly active users on MERN applications' },
            ].map((achievement, index) => (
          <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                  {achievement.metric}
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 tracking-tight">{achievement.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24 md:mb-40">
          <div className="flex items-baseline space-x-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Education
            </motion.h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="space-y-4 md:space-y-6">
                <motion.div
              initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">Bachelor of Computer Science</h3>
                  <p className="text-base sm:text-lg text-gray-400 font-light">Sadakathullah Appa College</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <span className="text-sm text-gray-400">Sep 2019 - Oct 2020</span>
                  <span className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-sm font-bold self-start">
                    CGPA 8.6/10
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6 tracking-tight">Certifications & Learning</h3>
              <div className="space-y-3">
                {[
                  'AWS Certified Solutions Architect (In Progress)',
                  'Advanced GenAI and LLM Applications',
                  'Full Stack Development Specialization',
                ].map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-400 leading-relaxed">{cert}</span>
                  </div>
                ))}
            </div>
          </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24 md:mb-40">
          <div className="flex items-baseline space-x-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Get In Touch
            </motion.h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm">
                <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6 tracking-tight">Let's Work Together</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                  I'm always open to discussing new opportunities, creative projects, or just having a conversation about technology and development.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <a href="mailto:ansarthameem30@gmail.com" className="text-sm hover:text-white transition-colors">
                        ansarthameem30@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <a href="tel:8056452530" className="text-sm hover:text-white transition-colors">
                        +91 8056452530
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Location</div>
                      <div className="text-sm">Palavakkam, Chennai</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border border-white/10 rounded-2xl md:rounded-3xl p-6 bg-white/[0.02] backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">24h</div>
                    <div className="text-xs text-gray-400">Response Time</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">100%</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">24/7</div>
                    <div className="text-xs text-gray-400">Available</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6 tracking-tight">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-gray-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-gray-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs text-gray-400 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none transition-all"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-sm font-semibold hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Something went wrong. Please try again or email me directly.</span>
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
            <p className="text-sm">&copy; 2025 Mohammed Thameem Ansar. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <a href="https://www.linkedin.com/in/mohammed-thameem-ansar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">GitHub</a>
              <a href="https://ansar-portfolio.pages.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">Portfolio</a>
            </div>
          </div>
      </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default Index;

