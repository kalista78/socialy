
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DiscoverPage from './pages/DiscoverPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import CreateCommunityPage from './pages/CreateCommunityPage';
import HelpCenterPage from './pages/HelpCenterPage';
import AuthModal from './components/AuthModal';
import { PageView, AuthModalType, Language } from './types';
import { MOCK_COMMUNITIES } from './constants';

const App: React.FC = () => {
  // Application State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('DISCOVER');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);
  const [language, setLanguage] = useState<Language>('TR');

  // Derived State
  const selectedCommunity = MOCK_COMMUNITIES.find(c => c.id === selectedCommunityId);

  // Handlers
  const handleCommunityClick = (id: string) => {
    setSelectedCommunityId(id);
    setCurrentPage('COMMUNITY');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setAuthModalType(null);
    // If on community preview, stay there but refresh view (done by state)
  };

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      setAuthModalType('SIGNUP');
    } else {
      // Logic to join would go here
      alert('Joined community!');
    }
  };

  // Render Page Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'DISCOVER':
        return (
          <DiscoverPage 
            onCommunityClick={handleCommunityClick} 
            onOpenAuth={setAuthModalType}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'COMMUNITY':
        if (!selectedCommunity) return <div>Community not found</div>;
        return (
          <CommunityPage 
            community={selectedCommunity} 
            isAuthenticated={isAuthenticated}
            onJoin={handleJoinCommunity}
          />
        );
      case 'PROFILE':
        return isAuthenticated ? <ProfilePage /> : (
          <div className="h-screen flex items-center justify-center">
            <p>Please log in to view profile.</p>
          </div>
        );
      case 'CREATE_COMMUNITY':
        return <CreateCommunityPage />;
      case 'HELP_CENTER':
        return <HelpCenterPage language={language} />;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div className="font-sans text-socialy-text bg-socialy-bg min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onOpenAuth={setAuthModalType}
        onNavigate={handleNavigate}
        onLogout={() => { setIsAuthenticated(false); handleNavigate('DISCOVER'); }}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <div className="flex-1">
        {renderPage()}
      </div>

      <AuthModal 
        type={authModalType}
        isOpen={!!authModalType}
        onClose={() => setAuthModalType(null)}
        onSwitch={setAuthModalType}
        onAuthenticate={handleAuth}
      />
    </div>
  );
};

export default App;
