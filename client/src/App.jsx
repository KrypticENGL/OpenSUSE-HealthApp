import React, { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import MyHealth from './pages/MyHealth'
import Records from './pages/Records'
import Appointments from './pages/Appointments'
import Settings from './pages/Settings'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('serene-dark-mode');
    return saved === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('serene-dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'myHealth': return <MyHealth />;
      case 'records': return <Records />;
      case 'appointments': return <Appointments />;
      case 'settings': return <Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  )
}

export default App
