import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Zap, FileText, Download, Crown, CheckCircle, ArrowRight, Star,
  BookOpen, Code2, Brain, Shield, Wifi, Smartphone, ChevronDown, ChevronUp,
  Users, TrendingUp, Award, Clock
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is ProjectGen?',
    a: 'ProjectGen is an AI-powered platform that generates complete Final Year Project kits for college students. Simply select your stream, domain, and technology — and get a ready-made project with title, abstract, modules, methodology, and more.'
  },
  {
    q: 'Who can use ProjectGen?',
    a: 'Any college student pursuing BCA, MCA, BTech, MBA, BSc, MSc, or similar programs can use ProjectGen. It supports domains like Web Development, AI/ML, Data Science, IoT, Cybersecurity, Blockchain, and more.'
  },
  {
    q: 'What does a generated project kit include?',
    a: 'Each project kit includes: Project Title, Abstract, Problem Statement, Objectives, System Modules, Technology Stack, Methodology, System Architecture, Flow Diagram Description, Future Scope, and Conclusion.'
  },
  {
    q: 'What is the Free plan limit?',
    a: 'Free plan users can generate up to 2 project kits per month. The counter resets every month automatically. Upgrade to Premium for unlimited generations.'
  },
  {
    q: 'What does Premium include?',
    a: 'Premium plan (₹499 one-time) includes: Unlimited project generations, PDF Project Report download, PPT Outline PDF download, and early access to new features.'
  },
  {
    q: 'Is the payment secure?',
    a: 'Yes, all payments are processed securely through Razorpay, India\'s most trusted payment gateway. We never store your card details.'
  },
  {
    q: 'Can I use this project directly for submission?',
    a: 'ProjectGen provides a solid base/kit for your project. We recommend using it as a starting point and customizing it with your own implementation, personal touches, and project-specific details before final submission.'
  },
  {
    q: 'Is the generated content unique?',
    a: 'Every generated kit is crafted uniquely based on your selected stream, domain, technology, and difficulty level combination. The titles and content vary with each generation.'
  }
];

const features = [
  { icon: <Zap className="w-6 h-6" />, title: 'Instant Generation', desc: 'Get a complete project kit in under 5 seconds. No waiting, no hassle.' },
  { icon: <FileText className="w-6 h-6" />, title: 'Complete Report Content', desc: 'Abstract, problem statement, objectives, modules, methodology — everything included.' },
  { icon: <Download className="w-6 h-6" />, title: 'PDF & PPT Downloads', desc: 'Download formatted project report PDF and PPT outline with Premium.' },
  { icon: <Code2 className="w-6 h-6" />, title: 'Multiple Technologies', desc: 'MERN, Python, Java, ML, IoT, Blockchain — 50+ project combinations supported.' },
  { icon: <Brain className="w-6 h-6" />, title: 'Smart Content', desc: 'Contextual content tailored to your chosen domain, technology, and difficulty level.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Secure & Private', desc: 'Your projects are private. JWT authentication keeps your data safe.' }
];

const domains = [
  { icon: <Code2 className="w-5 h-5" />, name: 'Web Development', color: 'bg-blue-100 text-blue-700' },
  { icon: <Brain className="w-5 h-5" />, name: 'AI & ML', color: 'bg-purple-100 text-purple-700' },
  { icon: <TrendingUp className="w-5 h-5" />, name: 'Data Science', color: 'bg-green-100 text-green-700' },
  { icon: <Wifi className="w-5 h-5" />, name: 'IoT', color: 'bg-orange-100 text-orange-700' },
  { icon: <Shield className="w-5 h-5" />, name: 'Cybersecurity', color: 'bg-red-100 text-red-700' },
  { icon: <Smartphone className="w-5 h-5" />, name: 'Mobile App', color: 'bg-pink-100 text-pink-700' },
  { icon: <Award className="w-5 h-5" />, name: 'Blockchain', color: 'bg-yellow-100 text-yellow-700' },
  { icon: <BookOpen className="w-5 h-5" />, name: 'Cloud Computing', color: 'bg-cyan-100 text-cyan-700' }
];

const steps = [
  { num: '01', title: 'Select Your Preferences', desc: 'Choose your stream (BCA/BTech/MCA), domain, technology stack, and difficulty level.' },
  { num: '02', title: 'Generate Project Kit', desc: 'Click Generate and receive a fully detailed project kit with all required sections instantly.' },
  { num: '03', title: 'Download & Submit', desc: 'View your project online, download the PDF report and PPT outline (Premium), and submit.' }
];

const stats = [
  { icon: <Users className="w-6 h-6" />, value: '10,000+', label: 'Students Served' },
  { icon: <FileText className="w-6 h-6" />, value: '50,000+', label: 'Projects Generated' },
  { icon: <Star className="w-6 h-6" />, value: '4.9/5', label: 'Student Rating' },
  { icon: <Clock className="w-6 h-6" />, value: '<5 sec', label: 'Generation Time' }
];

function FAQ() {
  useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 section-reveal">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          <p className="section-sub">Everything you need to know about ProjectGen.</p>
        </div>
        <div className="space-y-3 stagger-children">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  useScrollReveal();
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6 animate-fade-in-up">
            <Zap className="w-4 h-4" />
            <span>Over 50,000 projects generated — Join 10,000+ students</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up delay-100">
            Generate Your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Final Year Project
            </span>{' '}
            in Seconds
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            ProjectGen instantly creates complete academic project kits — title, abstract, modules, methodology, architecture, and more. Built for BCA, MCA, BTech, MBA students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link to="/register" className="btn-primary text-lg px-8 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center animate-glow">
              <Zap className="w-5 h-5" /> Generate Free Now
            </Link>
            <a href="#how-it-works" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:text-white text-lg px-8 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center">
              See How It Works <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-5 animate-fade-in delay-400">No credit card required · 2 free projects/month · Instant access</p>

          {/* Mock Preview */}
          <div className="mt-16 max-w-4xl mx-auto glass rounded-2xl p-1">
            <div className="bg-slate-800/80 rounded-xl p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-slate-400 text-xs">ProjectGen Generator</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Generated Project Title</p>
                  <p className="text-white font-semibold">Smart College Event Management System</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Technology Stack</p>
                  <div className="flex flex-wrap gap-1">
                    {['React.js', 'Node.js', 'MongoDB', 'TailwindCSS'].map(t => (
                      <span key={t} className="bg-blue-600/30 text-blue-300 text-xs px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-400 text-xs mb-1">Abstract Preview</p>
                  <p className="text-slate-300 text-xs leading-relaxed">This project presents the design and development of "Smart College Event Management System", a intermediate-level Web Development project built for BCA students. The system leverages MERN to address real-world challenges...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            {stats.map((stat, i) => (
              <div key={i} className={`text-center animate-bounce-in delay-${i * 100 + 100}`}>
                <div className="flex justify-center mb-2 text-blue-600">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900 stat-number">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 section-reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="section-title mt-2">Everything You Need in One Place</h2>
            <p className="section-sub">From project title to conclusion — ProjectGen handles all the content so you can focus on coding.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((f, i) => (
              <div key={i} className={`card feature-card group animate-fade-in-up delay-${i * 100 + 100}`}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 section-reveal">
            <h2 className="text-2xl font-bold text-slate-900">Supported Domains & Technologies</h2>
            <p className="text-slate-500 mt-2">50+ project combinations across 8 domains</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 stagger-children">
            {domains.map((d, i) => (
              <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${d.color}`}>
                {d.icon} {d.name}
              </div>
            ))}
            {['BCA', 'MCA', 'BTech', 'MBA', 'BSc CS', 'MSc IT'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
                <BookOpen className="w-4 h-4" /> {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 section-reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="section-title mt-2">3 Simple Steps to Your Project</h2>
            <p className="section-sub">Get a complete project kit in under a minute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative stagger-children">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-blue-400 z-0" />
            {steps.map((step, i) => (
              <div key={i} className={`relative z-10 text-center animate-fade-in-up delay-${i * 200 + 100}`}>
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-5 shadow-lg shadow-blue-200">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/register" className="btn-primary text-lg px-8 py-3.5 inline-flex items-center gap-2">
              <Zap className="w-5 h-5" /> Start Generating Free
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 section-reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="section-title mt-2">Simple, Student-Friendly Pricing</h2>
            <p className="section-sub">Start for free. Upgrade when you need more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="card border-2 border-slate-200 section-reveal-left">
              <div className="badge-free mb-4 inline-block">Free Plan</div>
              <div className="text-4xl font-black text-slate-900 mb-1">₹0 <span className="text-lg font-normal text-slate-500">/month</span></div>
              <p className="text-slate-500 text-sm mb-6">Perfect for exploring ProjectGen</p>
              <ul className="space-y-3 mb-8">
                {['2 project generations/month', 'All project sections included', 'Online project viewer', 'All streams & domains'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary w-full text-center block">Get Started Free</Link>
            </div>
            {/* Premium */}
            <div className="card border-2 border-blue-600 relative overflow-hidden section-reveal-right">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="badge-premium mb-4 inline-block"><Crown className="w-3 h-3 inline mr-1" />Premium Plan</div>
              <div className="text-4xl font-black text-slate-900 mb-1">₹499 <span className="text-lg font-normal text-slate-500">one-time</span></div>
              <p className="text-slate-500 text-sm mb-6">Everything you need for your FYP</p>
              <ul className="space-y-3 mb-8">
                {['Unlimited project generations', 'PDF Project Report download', 'PPT Outline PDF download', 'System Architecture included', 'Priority support', 'Early access to new features'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary w-full text-center block">Upgrade to Premium</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center section-reveal-scale">
          <h2 className="text-4xl md:text-5xl font-black mb-5">Ready to Generate Your Project?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Join thousands of students who have already generated their final year projects with ProjectGen. Start for free today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-10 py-4">
            <Zap className="w-5 h-5" /> Create Free Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
