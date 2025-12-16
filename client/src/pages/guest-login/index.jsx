import React, { useContext, useState } from 'react';
import { GraduationCap, Shield, Users, BookOpen, ChevronRight, Sparkles, Eye, Lock } from 'lucide-react';
import { AuthContext } from '@/context/auth-context';
import { websiteName } from '@/config';
import { useNavigate } from 'react-router-dom';

export default function GuestLoginPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { setSignInFormData, handleGuestUserLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const adminEmail = import.meta.env.VITE_ADMIN_DEMO_LOGIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_DEMO_LOGIN_PASSWORD;
  const instructorEmail = import.meta.env.VITE_INSTRUCTOR_DEMO_LOGIN_EMAIL;
  const instructorPassword = import.meta.env.VITE_INSTRUCTOR_DEMO_LOGIN_PASSWORD;
  const userEmail = import.meta.env.VITE_USER_DEMO_LOGIN_EMAIL;
  const userPassword = import.meta.env.VITE_USER_DEMO_LOGIN_PASSWORD;

  const loginRoles = [
    {
      id: 'admin',
      title: 'Admin',
      email : adminEmail,
      password: adminPassword,
      icon: Shield,
      description: 'Full system access with analytics and content management',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-900/20 to-orange-900/20',
      features: ['Manage Users', 'Analytics Dashboard', 'Content Approval', 'System Settings']
    },
    {
      id: 'instructor',
      title: 'Instructor',
      email: instructorEmail,
      password: instructorPassword,
      icon: GraduationCap,
      description: 'Create and manage courses, track student progress',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-900/20 to-pink-900/20',
      features: ['Create Courses', 'Student Progress', 'Content Upload', 'Grade Management']
    },
    {
      id: 'user',
      title: 'User',
      email: userEmail,
      password: userPassword,
      icon: Users,
      description: 'Access courses, track your learning journey',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-900/20 to-cyan-900/20',
      features: ['Browse Courses', 'Track Progress', 'Earn Certificates', 'Submit Content']
    }
  ];

  const handleDemoLogin = (index) => {
    console.log("handling demo login..."+ index)
    
    setSignInFormData({
      role: loginRoles[index].id,
      userEmail: loginRoles[index].email,
      password: loginRoles[index].password,
    })

    handleGuestUserLogin();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <nav className="relative z-10 px-6 py-4 backdrop-blur-sm bg-gray-900/50 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {websiteName}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Eye className="w-4 h-4" />
            <span>Demo Mode</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Try Demo Access</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Guest</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your role to explore {websiteName}'s powerful features with demo credentials
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {loginRoles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleDemoLogin(index)}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}>
                    {role.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6">
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {role.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-gray-300 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${role.bgColor} border border-gray-600`}>
                    Demo
                  </div>

                  {/* Login Button */}
                  <button className={`w-full py-3 rounded-lg font-semibold bg-gradient-to-r ${role.color} hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                    <span>Login as {role.title}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Animated Border Effect */}
                  {hoveredCard === role.id && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-20 animate-pulse`}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Info Section */}
        <div className="max-w-3xl mx-auto bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 animate-fade-in">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Demo Access Information</h3>
              <p className="text-gray-400 mb-4">
                These demo accounts allow you to explore all features of {websiteName} without registration. 
                Each role provides different access levels and capabilities.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="font-semibold text-red-400 mb-1">Admin Demo</div>
                  <div className="text-gray-500">Full platform control</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="font-semibold text-purple-400 mb-1">Instructor Demo</div>
                  <div className="text-gray-500">Course management</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="font-semibold text-blue-400 mb-1">User Demo</div>
                  <div className="text-gray-500">Learning experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-gray-400 mb-4">Want to create your own account?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
            Sign Up Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}