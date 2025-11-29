import React, { useState } from 'react';
import { 
  User, Settings, CreditCard, DollarSign, LogOut, Camera, ExternalLink, 
  Copy, CheckCircle, Calendar, MessageSquare, MapPin, ChevronDown, ChevronUp, Coins 
} from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Default to profile info
  const [copied, setCopied] = useState(false);
  
  // Settings Accordion States
  const [socialsOpen, setSocialsOpen] = useState(true);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [searchEngineHidden, setSearchEngineHidden] = useState(false);

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock data for charts
  const earningsData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Left Column: Activity & Stats */}
            <div className="flex-1 space-y-8">
              {/* Activity Heatmap */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Activity</h3>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
                  {/* Simple mock heatmap */}
                  <div className="flex flex-col gap-1 min-w-[600px]">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                    </div>
                    <div className="flex gap-1 h-32">
                      {/* Generating columns of squares */}
                      {Array.from({ length: 52 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, j) => (
                            <div 
                              key={j} 
                              className={`w-3 h-3 rounded-sm ${Math.random() > 0.85 ? 'bg-green-500' : 'bg-gray-100'}`} 
                              title={`Contribution`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-3 text-xs text-gray-500">
                      <span>Less</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contributions</h3>
                <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-gray-300" size={32} />
                  </div>
                  <p className="text-gray-500">No public contributions yet.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={CURRENT_USER.avatar} 
                    alt={CURRENT_USER.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{CURRENT_USER.username}</p>
                  
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed px-2">
                    {CURRENT_USER.bio}
                  </p>
                  
                  <div className="w-full space-y-3 border-t border-gray-100 pt-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span>Online now</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span>Joined Nov 22, 2025</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 w-full border-t border-b border-gray-100 py-4 mb-6">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{CURRENT_USER.stats.posts}</div>
                      <div className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Posts</div>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <div className="font-bold text-gray-900">0</div>
                      <div className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Followers</div>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <div className="font-bold text-gray-900">0</div>
                      <div className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Following</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wide"
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
                    Powered by <span className="font-bold text-gray-600 flex items-center gap-1"><div className="w-3 h-3 bg-black text-white flex items-center justify-center rounded-[2px] text-[8px]">S</div> SOCIALY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'affiliate':
        return (
          <div className="max-w-5xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Affiliates</h2>
              <p className="text-gray-500">Earn commission for life when you invite somebody to create or join a Socialy community.</p>
            </div>

             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               {/* Card 1 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center h-36">
                 <div className="text-3xl font-bold text-gray-900">$0</div>
                 <div className="text-xs font-medium text-gray-400 uppercase mt-2 tracking-wide">Last 30 days</div>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center h-36">
                 <div className="text-3xl font-bold text-gray-900">$0</div>
                 <div className="text-xs font-medium text-gray-400 uppercase mt-2 tracking-wide">Lifetime</div>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between h-36 relative">
                 <div className="text-center flex-1">
                    <div className="text-3xl font-bold text-green-600">$0</div>
                    <div className="text-xs font-medium text-gray-400 uppercase mt-2 tracking-wide">Account balance</div>
                 </div>
                 <div className="border-l border-gray-100 h-full mx-4"></div>
                 <div className="flex-1 flex justify-center">
                    <button disabled className="px-6 py-2 bg-gray-100 text-gray-400 text-sm font-bold rounded-lg cursor-not-allowed">
                        PAYOUT
                    </button>
                 </div>
                 <div className="absolute bottom-3 right-4 text-[10px] text-gray-400">
                    $0 available soon
                 </div>
               </div>
             </div>

             {/* Link Section */}
             <div className="mb-12">
                <h3 className="font-bold text-gray-900 mb-4">Your affiliate links</h3>
                <div className="flex gap-2 mb-5">
                   <button className="px-5 py-1.5 bg-gray-500 text-white rounded-full text-sm font-medium shadow-sm">
                      Socialy platform
                   </button>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                   Earn <span className="font-bold">40% commission</span> when you invite somebody to create a Socialy community.
                </p>
                
                <div className="flex shadow-sm max-w-3xl">
                   <div className="flex-1 px-5 py-3.5 bg-white border border-r-0 border-gray-200 rounded-l-xl text-blue-600 font-medium text-sm flex items-center truncate">
                      https://www.socialy.so/signup?ref=70dbbeec65934d038e73ad312ec67145
                   </div>
                   <button 
                     onClick={copyLink}
                     className="px-8 py-3.5 bg-blue-600 text-white font-bold text-sm rounded-r-xl hover:bg-blue-700 transition-colors uppercase tracking-wide flex items-center gap-2 min-w-[100px] justify-center"
                   >
                     {copied ? <CheckCircle size={16} /> : null}
                     {copied ? 'COPIED' : 'COPY'}
                   </button>
                </div>
             </div>

             {/* Referrals List */}
             <div className="max-w-5xl">
                <div className="flex justify-end mb-2">
                   <button className="flex items-center gap-1 text-sm text-gray-500 font-medium hover:text-gray-900">
                      Active <ChevronDown size={16} />
                   </button>
                </div>
                
                <div className="h-80 border border-gray-200 rounded-xl flex flex-col items-center justify-center bg-white shadow-sm">
                   <div className="w-24 h-24 mb-4 text-gray-200">
                       <div className="relative w-full h-full">
                         <Coins size={80} strokeWidth={1} />
                       </div>
                   </div>
                   <p className="text-gray-500 font-medium">Your referrals will show here</p>
                </div>
             </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="max-w-2xl bg-white p-8 rounded-2xl border border-gray-200 shadow-card">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile</h2>
            
            <div className="space-y-8">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <img src={CURRENT_USER.avatar} className="w-16 h-16 rounded-full object-cover" alt="Avatar" />
                <button className="text-blue-600 font-medium hover:underline text-sm">
                  Change profile photo
                </button>
              </div>

              {/* Name Fields */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={CURRENT_USER.name.split(' ')[0]} 
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={CURRENT_USER.name.split(' ')[1] || ''} 
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  You can only change your name once, and you must use your real name. <button className="text-blue-600 hover:underline">Change name.</button>
                </p>
              </div>

              {/* URL Field */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">URL</label>
                <input 
                  type="text" 
                  defaultValue={`socialy.so/${CURRENT_USER.username.replace('@', '')}`}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-2"
                />
                <p className="text-xs text-gray-400">
                  You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days.
                </p>
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Bio</label>
                <textarea 
                  defaultValue={CURRENT_USER.bio} 
                  rows={3} 
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-400">{CURRENT_USER.bio.length} / 150</span>
                </div>
              </div>

              {/* Location Field */}
              <div>
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-2"
                />
                <div className="flex items-center justify-between">
                   <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                     <MapPin size={14} /> Change my map location
                   </button>
                   <button className="text-xs text-gray-400 hover:text-gray-600">
                     Remove my map location
                   </button>
                </div>
              </div>

              {/* Myers Briggs */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Myers Briggs</label>
                <div className="relative">
                    <select className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer">
                      <option>Don't show</option>
                      <option>INTJ</option>
                      <option>INTP</option>
                      <option>ENTJ</option>
                      <option>ENTP</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Social Links Accordion */}
              <div className="pt-2">
                 <button 
                   onClick={() => setSocialsOpen(!socialsOpen)}
                   className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm hover:text-blue-600 transition-colors"
                 >
                    Social links 
                    {socialsOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                 </button>
                 
                 {socialsOpen && (
                   <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
                      {['Website', 'Instagram', 'X', 'YouTube', 'LinkedIn', 'Facebook'].map(platform => (
                        <input 
                          key={platform}
                          type="text" 
                          placeholder={platform}
                          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        />
                      ))}
                   </div>
                 )}
              </div>
              
              {/* Membership Visibility Accordion */}
              <div className="pt-2 border-t border-gray-100">
                 <button 
                   onClick={() => setMembershipOpen(!membershipOpen)}
                   className="flex items-center gap-2 font-bold text-gray-900 py-4 text-sm hover:text-blue-600 transition-colors w-full text-left"
                 >
                    Membership visibility 
                    {membershipOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                 </button>
                 {membershipOpen && (
                    <p className="text-sm text-gray-500 pb-4">Control what groups show on your profile.</p>
                 )}
              </div>

              {/* Advanced Accordion */}
              <div className="pt-2 border-t border-gray-100">
                 <button 
                   onClick={() => setAdvancedOpen(!advancedOpen)}
                   className="flex items-center gap-2 font-bold text-gray-900 py-4 text-sm hover:text-blue-600 transition-colors w-full text-left"
                 >
                    Advanced 
                    {advancedOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                 </button>
                 
                 {advancedOpen && (
                   <div className="pb-4 flex items-center justify-between">
                      <span className="text-sm text-gray-700">Hide profile from search engines</span>
                      <button 
                        onClick={() => setSearchEngineHidden(!searchEngineHidden)}
                        className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${searchEngineHidden ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${searchEngineHidden ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                   </div>
                 )}
              </div>

            </div>
          </div>
        );

      default:
        return <div className="text-center py-20 text-gray-500">Work in progress...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-8">
       <div className="max-w-[1440px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3">
             <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden sticky top-24">
               <div className="p-6 border-b border-gray-100 text-center">
                  <img src={CURRENT_USER.avatar} className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white shadow-sm" alt="User" />
                  <h2 className="font-bold text-lg text-gray-900">{CURRENT_USER.name}</h2>
                  <p className="text-gray-500 text-sm">{CURRENT_USER.email}</p>
               </div>
               <nav className="p-2">
                 {[
                   { id: 'profile', label: 'Profile Info', icon: User },
                   { id: 'billing', label: 'Billing', icon: CreditCard },
                   { id: 'affiliate', label: 'Affiliate', icon: DollarSign },
                   { id: 'settings', label: 'Settings', icon: Settings },
                 ].map(item => (
                   <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`
                       w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1
                       ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                     `}
                   >
                     <item.icon size={18} />
                     {item.label}
                   </button>
                 ))}
               </nav>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab !== 'profile' && activeTab !== 'settings' && activeTab !== 'affiliate' && (
                <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{activeTab} Dashboard</h1>
            )}
            {renderContent()}
          </div>
       </div>
    </div>
  );
};

export default ProfilePage;