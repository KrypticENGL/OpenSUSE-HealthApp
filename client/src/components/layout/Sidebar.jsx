import React from 'react';
import { Home, FileText, Calendar, Activity, Settings, User } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={24} />, label: 'Dashboard' },
    { id: 'myHealth', icon: <Activity size={24} />, label: 'My Health' },
    { id: 'records', icon: <FileText size={24} />, label: 'Records' },
    { id: 'appointments', icon: <Calendar size={24} />, label: 'Appointments' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setCurrentView(id);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          S
        </div>
        <h1 className="sidebar-logo-text">Serene</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => handleNavClick(e, item.id)}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
         <a 
           href="#" 
           className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
           onClick={(e) => handleNavClick(e, 'settings')}
         >
            <Settings size={24} />
            <span>Settings</span>
          </a>
          <div className="user-profile">
             <div className="user-avatar">
                <User size={20} />
             </div>
             <div className="user-info">
               <span className="user-name">Alex Morgan</span>
               <span className="user-role">Patient</span>
             </div>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
