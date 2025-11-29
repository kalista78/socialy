import React, { useState } from 'react';
import { X, Mail, Lock, Chrome } from 'lucide-react';
import { AuthModalType } from '../types';

interface AuthModalProps {
  type: AuthModalType;
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (type: AuthModalType) => void;
  onAuthenticate: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ type, isOpen, onClose, onSwitch, onAuthenticate }) => {
  if (!isOpen || !type) return null;

  const isLogin = type === 'LOGIN';

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full sm:w-[400px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-transform animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-4 duration-300 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Social Auth */}
            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
               <Chrome size={18} className="text-gray-600" />
               Continue with Google
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onAuthenticate(); }}>
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isLogin ? 'Log in' : 'Create account'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-600 pt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => onSwitch(isLogin ? 'SIGNUP' : 'LOGIN')}
                className="text-blue-600 font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
