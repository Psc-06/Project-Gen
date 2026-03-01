const Project = require('../models/Project');
const User = require('../models/User');
const { generateProjectContent } = require('../utils/generateProject');
const { generateProjectPDF, generatePPTOutline } = require('../utils/pdfGenerator');

const FREE_LIMIT = 2;

// @desc    Generate a new project
// @route   POST /api/projects/generate
const generateProject = async (req, res) => {
  try {
    const { stream, domain, technology, difficulty } = req.body;
    const user = await User.findById(req.user._id);

    // Reset usage if month passed
    user.checkAndResetUsage();

    // Check plan limits
    if (user.plan === 'free' && user.usageCount >= FREE_LIMIT) {
      return res.status(403).json({
        success: false,
        message: `Free plan limit reached (${FREE_LIMIT}/month). Upgrade to Premium for unlimited access.`,
        limitReached: true
      });
    }

    const content = generateProjectContent({ stream, domain, technology, difficulty });

    const project = await Project.create({
      user: user._id,
      stream,
      domain,
      technology,
      difficulty,
      ...content
    });

    user.usageCount += 1;
    await user.save({ validateBeforeSave: false });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all projects for current user
// @route   GET /api/projects/my
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    if (project.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download project PDF report
// @route   GET /api/projects/:id/download-pdf
const downloadPDF = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.plan !== 'premium') {
      return res.status(403).json({ success: false, message: 'PDF download is a Premium feature. Please upgrade.', premiumRequired: true });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const pdfBuffer = await generateProjectPDF(project);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${project.title.replace(/[^a-z0-9]/gi, '_')}_Report.pdf"`,
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download PPT outline PDF
// @route   GET /api/projects/:id/download-ppt
const downloadPPT = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.plan !== 'premium') {
      return res.status(403).json({ success: false, message: 'PPT download is a Premium feature. Please upgrade.', premiumRequired: true });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const pptBuffer = await generatePPTOutline(project);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${project.title.replace(/[^a-z0-9]/gi, '_')}_PPT_Outline.pdf"`,
      'Content-Length': pptBuffer.length
    });
    res.send(pptBuffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    if (project.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateProject, getMyProjects, getProject, downloadPDF, downloadPPT, deleteProject };
