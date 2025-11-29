import React, { useState } from 'react';
import { Search, ArrowRight, MoreHorizontal } from 'lucide-react';
import { CATEGORIES, MOCK_COMMUNITIES } from '../constants';
import CommunityCard from '../components/CommunityCard';
import { AuthModalType } from '../types';

interface DiscoverPageProps {
  onCommunityClick: (id: string) => void;
  onOpenAuth: (type: AuthModalType) => void;
  isAuthenticated: boolean;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ onCommunityClick, onOpenAuth, isAuthenticated }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommunities = MOCK_COMMUNITIES.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-0 flex flex-col bg-[#F8F9FB]">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tribe.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-light">
            Join thousands of communities learning, building, and growing together. The modern place for creators and their fans.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mb-10 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-2xl shadow-soft border border-gray-200 flex items-center p-2">
              <Search className="ml-3 text-gray-400" size={24} />
              <input 
                type="text"
                placeholder="Search for anything (Design, Crypto, Coaching...)"
                className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 text-lg placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => onOpenAuth('LOGIN')}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Giriş Yap
              </button>
              <button 
                onClick={() => onOpenAuth('SIGNUP')}
                className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                Sign up free <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Pills */}
      <div className="sticky top-16 z-30 bg-[#F8F9FB]/95 backdrop-blur border-b border-gray-200/50 py-4">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCommunities.map(community => (
            <CommunityCard 
              key={community.id} 
              community={community} 
              onClick={onCommunityClick}
            />
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No communities found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Minimalist Footer */}
      <footer className="py-12 border-t border-gray-200 bg-[#F8F9FB] mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left/Center Links */}
          <div className="flex items-center gap-8 text-base font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Community</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Affiliates</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Careers</a>
          </div>

          {/* Right Branding */}
           <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Powered by</span>
              <div className="flex items-center gap-1 font-bold text-gray-900">
                 <div className="w-4 h-4 bg-black text-white rounded-[3px] flex items-center justify-center text-[8px] font-bold">S</div>
                 SOCIALY
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default DiscoverPage;