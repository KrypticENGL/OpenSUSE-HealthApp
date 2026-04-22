import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Clock, MapPin, Plus, Trash2, X, User } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Jenkins', type: 'Cardiology Follow-up', time: '10:30 AM', date: 'Tomorrow', location: 'North Wing, Rm 402' },
    { id: 2, doctor: 'Dr. Michael Chen', type: 'General Check-up', time: '2:15 PM', date: 'April 28, 2026', location: 'Main Clinic, Suite 12' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newAppt, setNewAppt] = useState({ doctor: '', type: '', time: '', date: '', location: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAppt.doctor || !newAppt.date || !newAppt.time) return;
    
    setAppointments([...appointments, { ...newAppt, id: Date.now() }]);
    setNewAppt({ doctor: '', type: '', time: '', date: '', location: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Appointments</h1>
          <p>Your upcoming medical consultations.</p>
        </div>
        {!isAdding && (
          <Button variant="primary" onClick={() => setIsAdding(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Schedule New
          </Button>
        )}
      </header>

      {isAdding && (
        <Card className="add-medicine-form" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>Schedule Appointment</h2>
            <button onClick={() => setIsAdding(false)}><X size={24} color="var(--color-outline)" /></button>
          </div>
          
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="form-label">Doctor Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Dr. Jane Doe"
                value={newAppt.doctor}
                onChange={(e) => setNewAppt({...newAppt, doctor: e.target.value})}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Appointment Type</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Consultation"
                  value={newAppt.type}
                  onChange={(e) => setNewAppt({...newAppt, type: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Room 302"
                  value={newAppt.location}
                  onChange={(e) => setNewAppt({...newAppt, location: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Tomorrow or May 5"
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({...newAppt, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 10:00 AM"
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({...newAppt, time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Appointment</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="appointments-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {appointments.map((appt) => (
          <Card key={appt.id} className="appointment-list-item">
            <div className="appointment-list-content">
              {/* Left: Doctor Info */}
              <div className="appointment-list-info">
                <div className="appointment-icon-box">
                  <User size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="appointment-list-doctor">{appt.doctor}</h3>
                  <p className="appointment-list-type">{appt.type}</p>
                </div>
              </div>

              {/* Middle: Schedule */}
              <div className="appointment-list-schedule">
                <div className="appointment-schedule-item">
                  <Calendar size={14} />
                  <span>{appt.date}</span>
                </div>
                <div className="appointment-schedule-item">
                  <Clock size={14} />
                  <span>{appt.time}</span>
                </div>
              </div>

              {/* Middle-Right: Location */}
              <div className="appointment-list-location">
                <MapPin size={14} />
                <span>{appt.location}</span>
              </div>

              {/* Right: Actions */}
              <div className="appointment-list-actions">
                <button 
                  className="appointment-delete-btn"
                  onClick={() => handleDelete(appt.id)}
                  aria-label="Delete appointment"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {appointments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-outline)' }}>
            <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No upcoming appointments. Schedule one to stay on top of your health.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
