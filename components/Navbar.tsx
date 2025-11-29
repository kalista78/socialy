
import React, { useState, useRef, useEffect } from 'react';
import { Search, MessageSquare, Bell, Menu, X, User, LogOut, Settings, CreditCard, Users, Globe, Plus, HelpCircle, Compass, Check, ChevronDown } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { PageView, AuthModalType, Language } from '../types';

interface NavbarProps {
  isAuthenticated: boolean;
  onOpenAuth: (type: AuthModalType) => void;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onOpenAuth, onNavigate, onLogout, language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => handleNav('DISCOVER')}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">SOCIALY</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="relative hidden sm:block" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 border border-transparent hover:border-gray-200"
              >
                <Globe size={18} />
                <span>{language === 'TR' ? 'TR Türkçe' : 'EN English'}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <button 
                      onClick={() => { onLanguageChange('TR'); setIsLangOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <span className={language === 'TR' ? 'font-bold text-gray-900' : 'text-gray-600'}>Türkçe</span>
                      {language === 'TR' && <Check size={16} className="text-blue-600" />}
                    </button>
                    <button 
                      onClick={() => { onLanguageChange('EN'); setIsLangOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <span className={language === 'EN' ? 'font-bold text-gray-900' : 'text-gray-600'}>English</span>
                      {language === 'EN' && <Check size={16} className="text-blue-600" />}
                    </button>
                </div>
              )}
          </div>

          {/* Common Icons */}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          
          {isAuthenticated ? (
            <>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <MessageSquare size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative hidden sm:block">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative ml-2" ref={dropdownRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img 
                    src={CURRENT_USER.avatar} 
                    alt="User" 
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-gray-900 truncate">{CURRENT_USER.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <button onClick={() => handleNav('PROFILE')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <User size={18} className="text-gray-400" /> Profile
                      </button>
                      <button onClick={() => handleNav('PROFILE')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Settings size={18} className="text-gray-400" /> Settings
                      </button>
                      <button onClick={() => handleNav('PROFILE')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Users size={18} className="text-gray-400" /> Affiliates
                      </button>
                    </div>

                    <div className="my-2 border-t border-gray-100" />

                    <div className="space-y-1">
                      <button onClick={() => handleNav('HELP_CENTER')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <HelpCircle size={18} className="text-gray-400" /> Help center
                      </button>
                      <button onClick={() => handleNav('CREATE_COMMUNITY')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Plus size={18} className="text-gray-400" /> Create a community
                      </button>
                      <button onClick={() => handleNav('DISCOVER')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Compass size={18} className="text-gray-400" /> Discover communities
                      </button>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition-colors"
                      >
                        <LogOut size={18} className="text-gray-400" /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onOpenAuth('LOGIN')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden sm:block"
              >
                {language === 'TR' ? 'Giriş yap' : 'Log in'}
              </button>
              <button 
                onClick={() => onOpenAuth('SIGNUP')}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
              >
                {language === 'TR' ? 'Kayıt ol' : 'Sign up'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
