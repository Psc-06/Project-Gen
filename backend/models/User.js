const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  usageCount: {
    type: Number,
    default: 0
  },
  usageResetDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    }
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  premiumActivatedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Reset usage count if month has passed
userSchema.methods.checkAndResetUsage = function () {
  if (new Date() > this.usageResetDate) {
    this.usageCount = 0;
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    this.usageResetDate = date;
  }
};

module.exports = mongoose.model('User', userSchema);
