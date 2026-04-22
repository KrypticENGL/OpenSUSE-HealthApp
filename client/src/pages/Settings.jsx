import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Moon, Sun, Bell, BellOff, Globe, Shield, User, ChevronRight, Lock, Eye, Smartphone } from 'lucide-react';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  const [notifications, setNotifications] = useState(true);
  const [medicineReminders, setMedicineReminders] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header className="dashboard-header">
        <h1>Settings</h1>
        <p>Customize your experience and preferences.</p>
      </header>

      <div className="settings-layout">

        {/* Appearance Section */}
        <section className="settings-section">
          <h2 className="settings-section-title">Appearance</h2>

          <Card className="settings-card">
            <div className="settings-row">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <h3 className="settings-row-label">Dark Mode</h3>
                  <p className="settings-row-desc">Switch between light and dark themes</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </Card>
        </section>

        {/* Notifications Section */}
        <section className="settings-section">
          <h2 className="settings-section-title">Notifications</h2>

          <Card className="settings-card">
            <div className="settings-row settings-row-bordered">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  {notifications ? <Bell size={20} /> : <BellOff size={20} />}
                </div>
                <div>
                  <h3 className="settings-row-label">Push Notifications</h3>
                  <p className="settings-row-desc">Receive alerts on your device</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row settings-row-bordered">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Medicine Reminders</h3>
                  <p className="settings-row-desc">Get notified before your scheduled dose</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={medicineReminders}
                  onChange={() => setMedicineReminders(!medicineReminders)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Appointment Reminders</h3>
                  <p className="settings-row-desc">Alerts for upcoming doctor visits</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appointmentReminders}
                  onChange={() => setAppointmentReminders(!appointmentReminders)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </Card>
        </section>

        {/* Account Section */}
        <section className="settings-section">
          <h2 className="settings-section-title">Account</h2>

          <Card className="settings-card">
            <div className="settings-row settings-row-bordered settings-row-clickable">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Profile Information</h3>
                  <p className="settings-row-desc">Update your name, email, and photo</p>
                </div>
              </div>
              <ChevronRight size={20} className="settings-chevron" />
            </div>

            <div className="settings-row settings-row-bordered settings-row-clickable">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Change Password</h3>
                  <p className="settings-row-desc">Update your security credentials</p>
                </div>
              </div>
              <ChevronRight size={20} className="settings-chevron" />
            </div>

            <div className="settings-row settings-row-clickable">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Eye size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Privacy</h3>
                  <p className="settings-row-desc">Manage who can see your health data</p>
                </div>
              </div>
              <ChevronRight size={20} className="settings-chevron" />
            </div>
          </Card>
        </section>

        {/* General Section */}
        <section className="settings-section">
          <h2 className="settings-section-title">General</h2>

          <Card className="settings-card">
            <div className="settings-row settings-row-bordered">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Language</h3>
                  <p className="settings-row-desc">Choose your preferred language</p>
                </div>
              </div>
              <select
                className="settings-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="Hindi">हिन्दी</option>
              </select>
            </div>

            <div className="settings-row settings-row-clickable">
              <div className="settings-row-info">
                <div className="settings-row-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="settings-row-label">Data & Storage</h3>
                  <p className="settings-row-desc">Manage cached data and storage usage</p>
                </div>
              </div>
              <ChevronRight size={20} className="settings-chevron" />
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default Settings;
