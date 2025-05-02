const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  basics: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    location: {
      city: { type: String },
      countryCode: { type: String }
    },
    summary: { type: String }
  },

  work: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      summary: { type: String }
    }
  ],

  education: [
    {
      institution: { type: String },
      area: { type: String },
      studyType: { type: String },
      startDate: { type: Date },
      endDate: { type: Date }
    }
  ],

  skills: [
    {
      name: { type: String },
      level: { type: String },
      keywords: [String]
    }
  ],

  projects: [
    {
      name: { type: String },
      description: { type: String },
      url: { type: String }
    }
  ],

  certifications: [
    {
      name: { type: String },
      issuer: { type: String },
      date: { type: Date }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
