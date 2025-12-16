import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Shield, BarChart3, CheckCircle, Zap, Lock, Users, BookOpen, TrendingUp, Moon, Sun, Menu, X, ChevronRight, FastForward, Pause } from 'lucide-react';

export default function EduNexGenHomepage() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Feature Components
  const AntiSkipAnimation = () => {
    const [progress, setProgress] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Play className="w-10 h-10 text-white" fill="white" />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-white">
            <span>{progress}% watched</span>
            <button 
              onClick={() => setIsBlocked(!isBlocked)}
              className={`px-3 py-1 rounded ${progress < 100 ? 'bg-red-500/50 cursor-not-allowed' : 'bg-green-500'} transition-all`}
              disabled={progress < 100}
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>
          {progress < 100 && isBlocked && (
            <div className="absolute -top-8 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded animate-bounce">
              🚫 Watch completely first!
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProgressTracking = () => {
    const [modules] = useState([
      { name: 'Introduction', progress: 100 },
      { name: 'Core Concepts', progress: 75 },
      { name: 'Advanced Topics', progress: 40 },
      { name: 'Final Project', progress: 0 }
    ]);

    return (
      <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg p-4 overflow-hidden">
        <div className="text-white text-sm font-semibold mb-3">Course Progress</div>
        <div className="space-y-3">
          {modules.map((module, idx) => (
            <div key={idx} className="animate-slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex justify-between text-xs text-white mb-1">
                <span>{module.name}</span>
                <span>{module.progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-1000"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ContentApproval = () => {
    const [status, setStatus] = useState('pending');
    const [videoSubmitted, setVideoSubmitted] = useState(false);

    useEffect(() => {
      if (videoSubmitted) {
        setTimeout(() => setStatus('reviewing'), 1000);
        setTimeout(() => setStatus('approved'), 3000);
        setTimeout(() => {
          setStatus('pending');
          setVideoSubmitted(false);
        }, 5000);
      }
    }, [videoSubmitted]);

    return (
      <div className="w-full h-48 bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg p-4">
        <div className="text-white text-sm font-semibold mb-3">Content Submission</div>
        <div className="bg-white/10 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2 text-white text-xs mb-2">
            <Play className="w-4 h-4" />
            <span>youtube.com/watch?v=example</span>
          </div>
          <button 
            onClick={() => setVideoSubmitted(true)}
            disabled={videoSubmitted}
            className="w-full py-2 bg-white/20 hover:bg-white/30 rounded text-white text-xs font-semibold transition-all disabled:opacity-50"
          >
            Submit for Review
          </button>
        </div>
        {videoSubmitted && (
          <div className={`p-3 rounded-lg text-center text-white text-xs font-semibold animate-fade-in ${
            status === 'pending' ? 'bg-yellow-500/30' :
            status === 'reviewing' ? 'bg-blue-500/30' :
            'bg-green-500/30'
          }`}>
            {status === 'pending' && '⏳ Pending...'}
            {status === 'reviewing' && '🔍 Admin Reviewing...'}
            {status === 'approved' && '✅ Approved!'}
          </div>
        )}
      </div>
    );
  };

  const AnalyticsDashboard = () => {
    const [activeUsers, setActiveUsers] = useState(0);
    const [courses, setCourses] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveUsers(prev => (prev + 1) % 100);
        setCourses(prev => (prev + 1) % 50);
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full h-48 bg-gradient-to-br from-orange-900 to-red-900 rounded-lg p-4">
        <div className="text-white text-sm font-semibold mb-3">Real-time Analytics</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{activeUsers}</div>
            <div className="text-xs text-white/70">Active Users</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{courses}</div>
            <div className="text-xs text-white/70">Live Courses</div>
          </div>
        </div>
        <div className="mt-3 h-16 flex items-end space-x-1">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="flex-1 bg-gradient-to-t from-orange-400 to-red-400 rounded-t animate-pulse"
              style={{ 
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const FastPerformance = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setLoading(false);
            setTimeout(() => {
              setProgress(0);
              setLoading(true);
            }, 2000);
            return 100;
          }
          return prev + 10;
        });
      }, 50);
      return () => clearInterval(interval);
    }, [loading]);

    return (
      <div className="w-full h-48 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-lg p-4 flex flex-col items-center justify-center">
        {loading ? (
          <>
            <Zap className="w-12 h-12 text-yellow-400 animate-bounce" />
            <div className="mt-4 w-full max-w-xs">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-white text-xs text-center mt-2">{progress}ms load time</div>
            </div>
          </>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-white font-semibold">Lightning Fast!</div>
            <div className="text-white/70 text-xs">Built with MERN + Vite</div>
          </div>
        )}
      </div>
    );
  };

  const SecureAuth = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full h-48 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-4 flex flex-col items-center justify-center">
        <div 
          className={`transition-all duration-500 ${isLocked ? 'scale-100' : 'scale-125'}`}
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? (
            <Lock className="w-16 h-16 text-purple-400 animate-pulse cursor-pointer" />
          ) : (
            <Shield className="w-16 h-16 text-green-400 animate-bounce cursor-pointer" />
          )}
        </div>
        <div className="mt-4 text-center">
          <div className="text-white font-semibold text-sm">
            {isLocked ? `Securing${dots}` : 'Protected!'}
          </div>
          <div className="text-white/70 text-xs mt-1">JWT Authentication</div>
        </div>
        <div className="mt-3 flex space-x-1">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-8 rounded-full transition-all ${
                isLocked ? 'bg-purple-500/30' : 'bg-green-500/50'
              }`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                height: `${Math.random() * 32 + 16}px`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const features = [
    {
      icon: Play,
      title: 'Anti-Skipping Learning System',
      description: 'Prevents video skipping and forwarding. Forward controls unlock only when content is completely watched, ensuring 100% engagement.',
      color: 'from-purple-500 to-pink-500',
      component: AntiSkipAnimation
    },
    {
      icon: TrendingUp,
      title: 'Smart Progress Tracking',
      description: 'Automatic progress updates with visual indicators for every module. Track your learning journey in real-time.',
      color: 'from-blue-500 to-cyan-500',
      component: ProgressTracking
    },
    {
      icon: CheckCircle,
      title: 'Automated Content Approval',
      description: 'Admins review and approve user-submitted YouTube content. Students share learning materials via single video links.',
      color: 'from-green-500 to-emerald-500',
      component: ContentApproval
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: '95% accurate insights into enrollments, user activity, and course completion. Make data-driven decisions with confidence.',
      color: 'from-orange-500 to-red-500',
      component: AnalyticsDashboard
    },
    {
      icon: Zap,
      title: 'Blazing Fast Performance',
      description: 'Built with MERN stack and Vite.js for lightning-fast load times and seamless user experience.',
      color: 'from-yellow-500 to-orange-500',
      component: FastPerformance
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'JWT-based login system prevents unauthorized access. Your data and courses are protected at all times.',
      color: 'from-indigo-500 to-purple-500',
      component: SecureAuth
    }
  ];

  const stats = [
    { number: '100%', label: 'Free to Start' },
    { number: '6+', label: 'Unique Features' },
    { number: '0%', label: 'Skip Rate' },
    { number: 'MERN', label: 'Tech Stack' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Edu-NexGen
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-purple-500 transition-colors">Features</a>
              {/* <a href="#about" className="hover:text-purple-500 transition-colors">About</a>
              <a href="#contact" className="hover:text-purple-500 transition-colors">Contact</a> */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => navigate("/auth")} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block hover:text-purple-500 transition-colors">Features</a>
              {/* <a href="#about" className="block hover:text-purple-500 transition-colors">About</a> */}
              {/* <a href="#contact" className="block hover:text-purple-500 transition-colors">Contact</a> */}
              <button onClick={() => navigate("/auth")} className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Learning Management
              </span>
            </h1>
            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Experience next-generation education with anti-skipping technology, smart analytics, and seamless content management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate("/auth")} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Start Learning Now
              </button>
              <button onClick={() => navigate("/guest-login")} className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-600 transition-all ${isDark ? 'hover:bg-opacity-20' : 'hover:bg-opacity-10'}`}>
                Live UI Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-105 transition-all`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Advanced capabilities that set us apart from traditional LMS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const AnimationComponent = feature.component;
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Interactive Animation */}
                  <div className="mb-6">
                    <AnimationComponent />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`relative overflow-hidden rounded-3xl p-12 ${isDark ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white`}>
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of students already experiencing the future of education
              </p>
              <button onClick={() => navigate("/auth")} className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Get Started Free
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center animate-pulse">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edu-NexGen
            </span>
          </div>
          
          <p className={`text-lg mb-6 italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            "Education is not the filling of a pail, but the lighting of a fire."
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping animation-delay-2000"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping animation-delay-4000"></div>
          </div>
          
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
            &copy; 2024 Edu-NexGen. Empowering learners, one video at a time.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}