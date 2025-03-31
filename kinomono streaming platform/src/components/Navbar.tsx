import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, X, Film, Tv, Sparkles, Heart, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Film },
    { path: '/shows', label: 'TV Shows', icon: Tv },
    { path: '/movies', label: 'Movies', icon: Film },
    { path: '/anime', label: 'Anime', icon: Sparkles },
    { path: '/my-list', label: 'My List', icon: Heart },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? 'bg-netflix-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="px-4 md:px-[4%] py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-netflix-red text-3xl font-bold shrink-0 flex items-center gap-2">
              <Film className="w-8 h-8" />
              <span>KINOMONO</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all relative group ${
                      isActive ? 'text-white' : 'text-netflix-light hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-netflix-red/10 -z-10 rounded-lg"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/search" className="relative group">
              <Search className="w-6 h-6 text-netflix-light group-hover:text-white transition-colors" />
              <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-netflix-red rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
            </Link>
            
            <button className="hidden md:block relative group">
              <Bell className="w-6 h-6 text-netflix-light group-hover:text-white transition-colors" />
              <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-netflix-red rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
            </button>
            
            {/* Desktop Profile Menu */}
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-3 p-1 rounded-lg group-hover:bg-netflix-gray/10 transition-colors">
                <img
                  src={user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop"}
                  alt="Profile"
                  className="w-8 h-8 rounded-md"
                />
                <ChevronDown className="w-4 h-4 text-netflix-light group-hover:text-white transition-colors group-hover:rotate-180 duration-200" />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-netflix-dark/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="p-2">
                  <Link to="/profile" className="flex items-center gap-2 w-full px-3 py-2 text-sm text-netflix-light hover:text-white hover:bg-white/5 rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-netflix-light hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-1 hover:bg-netflix-gray/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-netflix-dark/95 backdrop-blur-sm border-t border-white/10"
      >
        <div className="px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-netflix-red/10 text-white' : 'text-netflix-light hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-netflix-light hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <button 
            onClick={() => {
              handleSignOut();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-netflix-light hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <X className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;