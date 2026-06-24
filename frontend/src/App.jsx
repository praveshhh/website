import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';

// Backend URL selection (configurable via env, defaults to relative path in prod and localhost:8082 in dev)
const BACKEND_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : (import.meta.env.PROD ? '' : 'http://localhost:8082');

export default function App() {
  const [user, setUser] = useState(null);
  const [masterPassword, setMasterPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Restore user session token from localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Master password is kept in memory. If page is refreshed, they must enter it again to decrypt vault items
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleAuthSuccess = (userData, derivedMasterPassword) => {
    setUser(userData);
    setMasterPassword(derivedMasterPassword);
    localStorage.setItem('user', JSON.stringify(userData));
    setActiveTab('dashboard'); // Redirect to dashboard on success
  };

  const handleLogout = () => {
    setUser(null);
    setMasterPassword('');
    localStorage.removeItem('user');
    setActiveTab('home');
  };

  const handleNavigate = (tab) => {
    if (tab === 'dashboard' && !user) {
      setIsAuthOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: '#fff' }}>
      {/* Floating Navbar */}
      <Navbar 
        user={user} 
        activeTab={activeTab}
        onOpenAuth={() => setIsAuthOpen(true)} 
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {/* Main Content Layout */}
      {activeTab === 'home' ? (
        <Hero 
          onOpenAuth={() => setIsAuthOpen(true)} 
          backendUrl={BACKEND_URL}
        />
      ) : (
        <Dashboard 
          user={user} 
          masterPassword={masterPassword} 
          backendUrl={BACKEND_URL}
        />
      )}

      {/* Auth Modal Portal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        backendUrl={BACKEND_URL}
      />
    </div>
  );
}
