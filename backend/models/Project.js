const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stream: {
    type: String,
    required: true,
    enum: ['BCA', 'MCA', 'BTech', 'MBA', 'BSc', 'MSc', 'BMS', 'Other']
  },
  domain: {
    type: String,
    required: true,
    enum: ['Web Development', 'AI & ML', 'Data Science', 'IoT', 'Cybersecurity', 'Mobile App', 'Cloud Computing', 'Blockchain', 'Other']
  },
  technology: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  problemStatement: { type: String, required: true },
  objectives: [String],
  modules: [
    {
      name: String,
      description: String
    }
  ],
  technologyStack: {
    frontend: [String],
    backend: [String],
    database: [String],
    tools: [String]
  },
  methodology: { type: String, required: true },
  futureScope: [String],
  conclusion: { type: String, required: true },
  systemArchitecture: String,
  flowDiagramDescription: String,
  pptOutlineUrl: String,
  isTemplate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
