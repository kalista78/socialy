import React, { useState } from 'react';
import { Lock, Users, Calendar, BookOpen, Trophy, MessageCircle, Image as ImageIcon, Smile, Send, PlayCircle, Link as LinkIcon, CheckCircle, Monitor, Shield } from 'lucide-react';
import { Community, Post, Event } from '../types';
import { MOCK_POSTS, MOCK_EVENTS, MOCK_MODULES, CURRENT_USER } from '../constants';

interface CommunityPageProps {
  community: Community;
  isAuthenticated: boolean;
  onJoin: () => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ community, isAuthenticated, onJoin }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'classroom' | 'events' | 'members' | 'leaderboard'>('posts');

  // Tabs Configuration
  const tabs = [
    { id: 'posts', label: 'Posts', icon: MessageCircle },
    { id: 'classroom', label: 'Classroom', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const isLocked = community.isPrivate && !isAuthenticated;

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* 1) COMMUNITY HEADER (TOP SECTION) - Full width cover */}
      <div className="w-full h-48 md:h-64 bg-gray-200 relative">
        <img 
          src={community.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Info Bar & Tabs Container */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          
          {/* Community Info (Name & Primary Actions) */}
          <div className="py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Mobile Logo (Hidden on desktop as it's in sidebar) */}
              <img 
                src={community.logo || community.coverImage} 
                alt="Logo" 
                className="w-12 h-12 md:hidden rounded-lg object-cover border border-gray-100 shadow-sm"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {community.name}
                </h1>
                <p className="text-sm text-gray-500 hidden md:block">
                  {community.memberCount.toLocaleString()} members • {community.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <button 
                  onClick={onJoin}
                  className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-sm hover:shadow-md text-sm md:text-base"
                >
                  Join for {community.price === 'Free' ? 'Free' : `$${community.price}`}
                </button>
              ) : (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                  Invite
                </button>
              )}
            </div>
          </div>

          {/* 2) TABS SECTION */}
          <div className="flex items-center gap-1 md:gap-8 overflow-x-auto no-scrollbar -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 py-3 px-2 border-b-2 text-sm font-medium transition-colors whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                  }
                `}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3) LEFT MAIN CONTENT - BIG CARD */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'posts' && (
              <>
                {/* Pinned Post / Start Here Card */}
                <div className="relative group">
                   <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-soft">
                      {/* Fake Video Player Header */}
                      <div 
                        className="aspect-video bg-gray-900 relative flex items-center justify-center cursor-pointer"
                        onClick={() => isLocked && onJoin()}
                      >
                         <PlayCircle size={64} className="text-white/80 transition-transform group-hover:scale-110" />
                         <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide mb-2 inline-block">Start Here</span>
                            <h3 className="text-xl font-bold text-shadow">Welcome to {community.name}</h3>
                         </div>
                      </div>
                      
                      <div className="p-5">
                        <p className="text-gray-700 leading-relaxed">
                          Welcome to the official community! Watch the video above to understand how to get the most out of your membership. We cover community rules, how to access the classroom, and introduce the team.
                        </p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                           <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MessageCircle size={16} /> 24 comments
                           </div>
                           {isLocked && (
                             <span className="ml-auto text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={onJoin}>
                               Locked content
                             </span>
                           )}
                        </div>
                      </div>
                   </div>
                </div>

                {/* Post Feed */}
                <div className={`space-y-6 ${isLocked ? 'pointer-events-none' : ''}`}>
                  {isAuthenticated && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-3">
                        <img src={CURRENT_USER.avatar} className="w-10 h-10 rounded-full" alt="Me" />
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="Write something..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>
                    </div>
                  )}

                  {MOCK_POSTS.map(post => (
                    <div key={post.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-card hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={post.author.avatar} className="w-10 h-10 rounded-full border border-gray-100" alt={post.author.name} />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{post.author.name}</h4>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-3 whitespace-pre-line">
                        {post.content}
                      </p>
                      {post.image && (
                        <img src={post.image} alt="Post attachment" className="w-full h-64 object-cover rounded-lg mb-3 border border-gray-100" />
                      )}
                      <div className="flex items-center gap-6 text-gray-500">
                        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors text-sm font-medium">
                          <Trophy size={18} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors text-sm font-medium">
                          <MessageCircle size={18} /> {post.comments}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'classroom' && (
               <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
                 <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Classroom</h3>
                 <p className="text-gray-500 max-w-md mx-auto mb-6">
                   Access structured courses and learning modules. {isLocked && "Join to start learning."}
                 </p>
                 {isLocked ? (
                   <button onClick={onJoin} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">Unlock Classroom</button>
                 ) : (
                   <div className="grid gap-4 text-left">
                      {MOCK_MODULES.map(m => (
                        <div key={m.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                          <h4 className="font-bold text-gray-900">{m.title}</h4>
                          <p className="text-xs text-gray-500">{m.lessons.length} lessons</p>
                        </div>
                      ))}
                   </div>
                 )}
               </div>
            )}

            {activeTab === 'events' && (
               <div className="space-y-4">
                  {MOCK_EVENTS.map(evt => (
                    <div key={evt.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 hover:shadow-md transition-all">
                       <div className="w-20 h-20 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-blue-600 shrink-0">
                          <span className="text-xs font-bold uppercase">{evt.date.split('•')[0].split(',')[0]}</span>
                          <span className="text-xl font-bold">{evt.date.split(' ')[2]}</span>
                       </div>
                       <div>
                          <h3 className="font-bold text-gray-900">{evt.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">{evt.date}</p>
                          <p className="text-sm text-gray-600 line-clamp-1">{evt.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
            )}

            {activeTab === 'members' && (
               <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
                 <Users size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900">Member Directory</h3>
                 <p className="text-gray-500 mt-2">Join to connect with {community.memberCount} others.</p>
               </div>
            )}

            {activeTab === 'leaderboard' && (
               <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
                 <Trophy size={48} className="mx-auto text-yellow-400 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900">Leaderboard</h3>
                 <p className="text-gray-500 mt-2">See who's most active this week.</p>
               </div>
            )}
          </div>

          {/* 4) RIGHT SIDEBAR - COMMUNITY SUMMARY CARD */}
          <div className="hidden lg:block space-y-6">
            {/* The Summary Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden sticky top-40">
              {/* Thumbnail Header */}
              <div className="p-6 border-b border-gray-100 text-center bg-gradient-to-b from-white to-gray-50/50">
                 <img 
                   src={community.logo || community.coverImage} 
                   alt={community.name} 
                   className="w-24 h-24 rounded-2xl mx-auto mb-4 shadow-md object-cover border-4 border-white"
                 />
                 <h2 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h2>
                 <p className="text-sm text-gray-500 leading-relaxed px-2">
                   {community.shortDescription}
                 </p>
              </div>

              {/* Links List */}
              {community.links && (
                <div className="p-4 bg-gray-50/30 border-b border-gray-100">
                   {community.links.map((link, i) => (
                     <a key={i} href={link.url} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <LinkIcon size={16} className="text-gray-400" />
                        {link.label}
                     </a>
                   ))}
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                 <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">{community.memberCount < 1000 ? community.memberCount : (community.memberCount/1000).toFixed(1) + 'k'}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Members</div>
                 </div>
                 <div className="p-4 text-center">
                    <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      {community.onlineCount || 42}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Online</div>
                 </div>
                 <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">{community.admins || 3}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Admins</div>
                 </div>
              </div>

              {/* CTA Footer */}
              <div className="p-6 bg-gray-50">
                 {!isAuthenticated ? (
                   <button 
                     onClick={onJoin}
                     className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold text-base shadow-sm transition-colors uppercase tracking-wide"
                   >
                     Join for {community.price === 'Free' ? 'Free' : `$${community.price}/mo`}
                   </button>
                 ) : (
                   <div className="text-center text-sm text-gray-500 py-2">
                     You are a member
                   </div>
                 )}
              </div>
            </div>

            {/* Skool-style Footer (Outside Card) */}
            <div className="text-center">
               <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
                  Powered by <span className="font-bold text-gray-600 flex items-center gap-1"><div className="w-3 h-3 bg-black text-white flex items-center justify-center rounded-[2px] text-[8px]">S</div> SOCIALY</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Join Button */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onJoin}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg text-lg"
          >
            Join Community
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;