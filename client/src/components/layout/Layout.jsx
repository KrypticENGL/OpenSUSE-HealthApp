import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentView, setCurrentView }) => {
  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Header />
        <main className="content-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
