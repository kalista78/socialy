
import React, { useState } from 'react';
import { Search, FileText, ArrowLeft, ChevronRight, Printer } from 'lucide-react';
import { Language } from '../types';

interface HelpCenterPageProps {
  language: Language;
}

// --- TRANSLATIONS & DATA ---

const TRANSLATIONS = {
  EN: {
    title: "How can we help?",
    searchPlaceholder: "Search the knowledge base",
    searchButton: "Search",
    member: "Member",
    admin: "Admin",
    categoriesTitle: "Categories",
    backToHome: "Back to Home",
    contactSupport: "Contact Support",
    sortDefault: "Sort by Default",
    sortPopularity: "Sort by Popularity",
    printTitle: "Print this article",
    helpfulQuestion: "Was this article helpful?",
    yes: "Yes",
    no: "No",
    footer: "© Socialy 2025. Powered by Help Scout",
    article: {
      step1: "1. Click on your profile pic and select <strong>Settings</strong>.",
      step2: "2. On the left navigation panel, click <strong>Payment history</strong>.",
      ui_profile: "Profile",
      ui_settings: "Settings",
      ui_payhist: "Payment history"
    }
  },
  TR: {
    title: "Nasıl yardımcı olabiliriz?",
    searchPlaceholder: "Bilgi bankasında ara",
    searchButton: "Ara",
    member: "Üye",
    admin: "Yönetici",
    categoriesTitle: "Kategoriler",
    backToHome: "Ana Sayfaya Dön",
    contactSupport: "Destekle İletişime Geç",
    sortDefault: "Varsayılan Sıralama",
    sortPopularity: "Popülerliğe Göre",
    printTitle: "Bu makaleyi yazdır",
    helpfulQuestion: "Bu makale yardımcı oldu mu?",
    yes: "Evet",
    no: "Hayır",
    footer: "© Socialy 2025. Help Scout tarafından desteklenmektedir",
    article: {
      step1: "1. Profil resminize tıklayın ve <strong>Ayarlar</strong>'ı seçin.",
      step2: "2. Sol menü panelinde <strong>Ödeme geçmişi</strong>'ne tıklayın.",
      ui_profile: "Profil",
      ui_settings: "Ayarlar",
      ui_payhist: "Ödeme geçmişi"
    }
  }
};

interface Category {
  id: string;
  title: string;
  description: string;
}

const DATA_TR = {
  MEMBER_CATEGORIES: [
    { id: 'how-skool-works', title: 'Skool Nasıl Çalışır', description: 'Tüm özelliklerin kullanımı' },
    { id: 'accounts', title: 'Hesaplar', description: 'Profil, isim, şifre vb.' },
    { id: 'payments', title: 'Ödemeler', description: 'Yönetim, güncelleme, iptal, iade' },
  ],
  ADMIN_CATEGORIES: [
    { id: 'skool-101', title: 'Skool 101', description: 'Skool nasıl kullanılır' },
    { id: 'admin-payments', title: 'Ödemeler', description: 'Üyelik ücreti, ödemeler, komisyonlar' },
    { id: 'billing', title: 'Faturalandırma', description: 'Güncelleme, iptal etme, faturalar' },
    { id: 'roles', title: 'Roller', description: 'Sahip, yönetici, mod, fatura yöneticisi' },
    { id: 'admins', title: 'Yöneticiler', description: 'Yöneticiler, modlar, fatura yöneticileri' },
    { id: 'community', title: 'Topluluk', description: 'Kategoriler, kurallar, moderasyon' },
    { id: 'classroom', title: 'Sınıf', description: 'Kurslar ve kilit açma mekanizmaları' },
    { id: 'calendar', title: 'Takvim', description: 'Etkinlikler, Skool Araması, Canlı Yayın' },
    { id: 'leaderboards', title: 'Liderlik Tabloları', description: 'Oyunlaştırma, seviyeler, puanlar' },
    { id: 'discovery', title: 'Keşfet', description: 'Kategoriler, sıralama, algoritma' },
    { id: 'plugins', title: 'Eklentiler', description: 'Üyelik Soruları, Otomatik DM' },
    { id: 'affiliate', title: 'Satış Ortaklığı', description: 'Ortaklık & referanslar' },
  ],
  ARTICLES: {
    'payments': [
      'Ödeme geçmişimi nasıl görürüm? (sadece üyeler)',
      'Yıllık plana nasıl geçerim?',
      'Ödeme yöntemimi nasıl güncellerim? (sadece üyeler)',
      'Bir topluluk üyeliğimi nasıl iptal ederim? (sadece ücretli üyeler)',
      'Kartımı nasıl kaldırırım? (ücretli üyeler)',
      'Son işlem için nasıl iade talep ederim?'
    ],
    'how-skool-works': [
      'Üyeler için Skool temelleri',
      'Puanlar ve seviyeler nasıl çalışır?',
      'Kilitli bir kursu veya etkinliği nasıl açarım?',
      'Günlük aktivite nedir?',
      'Grup yöneticileriyle nasıl iletişime geçerim?',
      'Grup kurallarına nasıl bakarım?',
      'Skool Chat\'te bir üyeyi nasıl engellerim?',
      'İçeriği veya bir kullanıcıyı nasıl bildiririm?',
      'Platform politikası',
      'Hesap Güvenliği',
      'Diğer üyeleri bir topluluğa davet edip nasıl komisyon kazanırım?',
      'Ödemeler için banka hesabımı nasıl değiştiririm?'
    ],
    'accounts': [
      'E-postamı nasıl değiştiririm?',
      'Şifremi nasıl sıfırlarım?',
      'Profil resminimi nasıl değiştiririm?',
      'Hesabımı nasıl silerim?'
    ]
  } as Record<string, string[]>
};

const DATA_EN = {
  MEMBER_CATEGORIES: [
    { id: 'how-skool-works', title: 'How Skool Works', description: 'How to use all the features' },
    { id: 'accounts', title: 'Accounts', description: 'Profile, name, password, etc.' },
    { id: 'payments', title: 'Payments', description: 'Manage, update, cancel, refund' },
  ],
  ADMIN_CATEGORIES: [
    { id: 'skool-101', title: 'Skool 101', description: 'How to use Skool' },
    { id: 'admin-payments', title: 'Payments', description: 'Charge for membership, payouts, fees' },
    { id: 'billing', title: 'Billing', description: 'Updating, canceling, invoices' },
    { id: 'roles', title: 'Roles', description: 'Owner, admin, mod, billing manager' },
    { id: 'admins', title: 'Admins', description: 'Admins, mods, billing managers' },
    { id: 'community', title: 'Community', description: 'Categories, rules, moderation' },
    { id: 'classroom', title: 'Classroom', description: 'Courses and unlock mechanisms' },
    { id: 'calendar', title: 'Calendar', description: 'Events, Skool Call, Go Live' },
    { id: 'leaderboards', title: 'Leaderboards', description: 'Gamification, levels, points' },
    { id: 'discovery', title: 'Discovery', description: 'Categories, ranking, algorithm' },
    { id: 'plugins', title: 'Plugins', description: 'Membership Questions, Auto DM' },
    { id: 'affiliate', title: 'Affiliate', description: 'Affiliate & referrals' },
  ],
  ARTICLES: {
    'payments': [
      'How to see my payment history? (members only)',
      'How to upgrade to annual?',
      'How to update my payment method? (members only)',
      'How to cancel my membership to a community? (paid members only)',
      'How to remove my card? (paid members)',
      'How to seek a refund for the most recent transaction?'
    ],
    'how-skool-works': [
      'Skool basics for members',
      'How do points and levels work?',
      'How to unlock a locked course or event?',
      'What is daily activity?',
      'How to contact the group admins?',
      'How to look up group rules?',
      'How to block a member on Skool Chat?',
      'How to report content or a user?',
      'Platform policy',
      'Account Security',
      'How to refer other members to a community and earn affiliate commissions?',
      'How to change bank accounts for payouts?'
    ],
    'accounts': [
      'How to change my email?',
      'How to reset my password?',
      'How to change my profile picture?',
      'How to delete my account?'
    ]
  } as Record<string, string[]>
};

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [persona, setPersona] = useState<'Member' | 'Admin'>('Member');

  const t = TRANSLATIONS[language];
  const data = language === 'TR' ? DATA_TR : DATA_EN;

  const categories = persona === 'Member' ? data.MEMBER_CATEGORIES : data.ADMIN_CATEGORIES;
  const selectedCategoryData = categories.find(c => c.id === activeCategory);

  // Reset active article when category changes
  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setActiveArticle(null);
  };

  // Reset everything when going back to home
  const handleBackToHome = () => {
    setActiveCategory(null);
    setActiveArticle(null);
  };

  // -- RENDER: CATEGORY / ARTICLE VIEW --
  if (activeCategory && selectedCategoryData) {
    const articles = data.ARTICLES[activeCategory] || (language === 'TR' ? ['Makale 1', 'Makale 2'] : ['Article 1', 'Article 2']);

    return (
      <div className="min-h-screen bg-[#F8F9FB] flex justify-center pb-20">
        <div className="max-w-[1000px] w-full px-6 pt-12 flex flex-col md:flex-row gap-12">
          
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-64 shrink-0">
            <div className="mb-8 relative">
               <input 
                 type="text" 
                 placeholder={t.searchPlaceholder}
                 className="w-full bg-gray-100 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-200 outline-none"
               />
               <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>

            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">{t.categoriesTitle}</h3>
            <ul className="space-y-1">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`
                      text-sm block w-full text-left py-1.5 px-2 rounded-md transition-colors flex justify-between items-center
                      ${activeCategory === cat.id 
                        ? 'font-bold text-gray-900 bg-gray-100' 
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {cat.title}
                    {activeCategory === cat.id && <ChevronRight size={14} className="text-gray-400" />}
                  </button>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-gray-100">
                 <button 
                   onClick={handleBackToHome}
                   className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2"
                 >
                   <ArrowLeft size={14} /> {t.backToHome}
                 </button>
              </li>
            </ul>
            
            <div className="mt-8 pt-4 border-t border-gray-100">
                 <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    {t.contactSupport}
                 </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1">
             {activeArticle ? (
                // --- ARTICLE DETAIL VIEW ---
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-start justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 leading-tight max-w-3xl">
                            {activeArticle}
                        </h1>
                        <button 
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            title={t.printTitle}
                        >
                            <Printer size={20} />
                        </button>
                    </div>

                    <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed">
                        <p className="mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t.article.step1 }} />
                        
                        <div className="mb-10 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-2">
                             {/* Placeholder for UI screenshot */}
                             <div className="bg-gray-50 w-full aspect-[3/1] rounded flex items-center justify-center relative border border-dashed border-gray-300">
                                <div className="text-center">
                                    <div className="w-32 h-8 bg-white border border-gray-200 shadow-sm mx-auto mb-2 rounded flex items-center px-2 text-xs text-gray-400">
                                        {t.article.ui_profile}
                                    </div>
                                    <div className="w-32 h-8 bg-blue-50 border border-blue-200 shadow-sm mx-auto rounded flex items-center px-2 text-xs font-bold text-blue-600 relative">
                                        {t.article.ui_settings}
                                        <div className="absolute -right-12 -top-2">
                                           <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-yellow-400 transform rotate-12">
                                              <path d="M0 10 Q 20 20 40 10" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
                                           </svg>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                        <p className="mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t.article.step2 }} />
                        
                        <div className="mb-10 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-2">
                             <div className="bg-gray-50 w-full aspect-[3/1] rounded flex items-center justify-start pl-10 relative border border-dashed border-gray-300">
                                <div className="space-y-2 w-48">
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-full bg-white border border-gray-200 rounded flex items-center px-3 font-bold text-gray-900 shadow-sm">
                                        {t.article.ui_payhist}
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                        <div className="mt-12 border-t border-gray-200 pt-8 flex items-center gap-4">
                            <span className="text-sm text-gray-500 italic">{t.helpfulQuestion}</span>
                            <div className="flex gap-4">
                                <button className="text-sm font-medium text-blue-600 hover:underline">{t.yes}</button>
                                <button className="text-sm font-medium text-blue-600 hover:underline">{t.no}</button>
                            </div>
                        </div>
                    </div>
                </div>
             ) : (
                // --- ARTICLE LIST VIEW ---
                <div className="animate-in fade-in duration-300">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCategoryData.title}</h1>
                        <p className="text-gray-500">{selectedCategoryData.description}</p>
                    </div>
                    <div className="relative">
                        <select className="bg-white border border-gray-200 text-gray-500 text-sm rounded px-2 py-1 pr-6 appearance-none cursor-pointer focus:outline-none focus:border-gray-300">
                            <option>{t.sortDefault}</option>
                            <option>{t.sortPopularity}</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L0.535898 0L7.4641 0L4 6Z" fill="#9CA3AF"/></svg>
                        </div>
                    </div>
                    </div>

                    <div className="space-y-4">
                    {articles.map((article, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setActiveArticle(article)}
                            className="group flex items-start gap-3 cursor-pointer p-2 -ml-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FileText size={18} className="text-gray-400 mt-0.5 group-hover:text-blue-600 transition-colors" />
                            <span className="text-blue-600 group-hover:underline text-base">{article}</span>
                        </div>
                    ))}
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // -- RENDER: HOME VIEW --
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t.title}</h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl gap-3 mb-10">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full h-12 bg-gray-100 rounded-lg px-4 text-base focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all placeholder:text-gray-400"
          />
        </div>
        <button className="px-8 h-12 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg transition-colors">
          {t.searchButton}
        </button>
      </div>

      {/* Toggle Persona */}
      <div className="bg-gray-100 p-1 rounded-full flex mb-16">
        <button 
          onClick={() => setPersona('Member')}
          className={`px-12 py-2 rounded-full text-sm font-medium transition-all ${persona === 'Member' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.member}
        </button>
        <button 
          onClick={() => setPersona('Admin')}
          className={`px-12 py-2 rounded-full text-sm font-medium transition-all ${persona === 'Admin' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.admin}
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {categories.map(category => (
          <div 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
          >
             <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
               {category.title}
             </h3>
             <p className="text-gray-500 text-sm">
               {category.description}
             </p>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-20 text-center text-gray-400 text-xs">
         {t.footer}
      </div>
    </div>
  );
};

export default HelpCenterPage;
