const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  hero: {
    title1: String,
    title2: String,
    gradientTitle: String,
    description: String,
    resumeUrl: String,
    linkedinUrl: String,
    phone: String,
    email: String,
    stats: [{ value: String, label: String }]
  },
  experience: [
    {
      role: String,
      company: String,
      period: String,
      bullets: [String]
    }
  ],
  skills: {
    fullStack: {
      Frontend: [String],
      Backend: [String],
      Databases: [String]
    },
    genAi: {
      "AWS Services": [String],
      "AI Technologies": [String],
      "DevOps & Tools": [String]
    }
  },
  achievements: [
    { title: String, metric: String, description: String }
  ],
  education: {
    degree: String,
    institution: String,
    period: String,
    cgpa: String
  },
  certifications: [String]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
