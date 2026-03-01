const User = require('../models/User');
const Project = require('../models/Project');

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user plan
// @route   PATCH /api/admin/users/:id/plan
const updateUserPlan = async (req, res) => {
  try {
    const { plan } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { plan }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    await Project.deleteMany({ user: req.params.id });
    res.json({ success: true, message: 'User and their projects deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/admin/projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'name email plan').sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const [totalUsers, premiumUsers, totalProjects, freeUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ plan: 'premium' }),
      Project.countDocuments(),
      User.countDocuments({ plan: 'free' })
    ]);

    const recentProjects = await Project.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    const domainStats = await Project.aggregate([
      { $group: { _id: '$domain', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        premiumUsers,
        freeUsers,
        totalProjects,
        revenue: premiumUsers * 499
      },
      recentProjects,
      recentUsers,
      domainStats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create/update project template
// @route   POST /api/admin/templates
const createTemplate = async (req, res) => {
  try {
    const projectData = { ...req.body, isTemplate: true, user: req.user._id };
    const template = await Project.create(projectData);
    res.status(201).json({ success: true, template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllUsers, updateUserPlan, deleteUser, getAllProjects, getStats, createTemplate };
