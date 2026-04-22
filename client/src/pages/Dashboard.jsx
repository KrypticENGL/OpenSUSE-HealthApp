import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Activity, Pill, Droplets, Moon, CheckCircle2, Circle, Clock, ChevronRight, Plus, X } from 'lucide-react';

const Dashboard = () => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Morning Medication', desc: 'Lisinopril 10mg', time: '8:00 AM', completed: true, type: 'medicine' },
    { id: 2, title: 'Afternoon Check-in', desc: 'Blood Pressure Reading', time: '2:00 PM', completed: false, type: 'activity' },
    { id: 3, title: 'Evening Walk', desc: '30 minutes light activity', time: '5:30 PM', completed: false, type: 'activity' },
  ]);

  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDesc, setNewMedDesc] = useState('');
  const [newMedTime, setNewMedTime] = useState('');

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMedName || !newMedTime) return;

    const newItem = {
      id: Date.now(),
      title: newMedName,
      desc: newMedDesc || 'Medicine',
      time: newMedTime,
      completed: false,
      type: 'medicine',
    };

    setChecklistItems([...checklistItems, newItem]);
    setIsAddingMedicine(false);
    setNewMedName('');
    setNewMedDesc('');
    setNewMedTime('');
  };

  const toggleTaskCompletion = (id) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklistItems.filter(item => item.completed).length;

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header className="dashboard-header">
        <h1>Good morning, Alex.</h1>
        <p>Here's your health summary for today.</p>
      </header>

      {/* Primary Status Card */}
      <Card className="status-card">
        <div className="status-card-icon">
           <Activity size={120} />
        </div>
        <div className="status-card-content">
          <div>
            <h2>Overall Status</h2>
            <p>Your symptoms are well-managed today. Keep up the good work!</p>
            <div className="status-tags">
               <span className="tag-stable">Stable</span>
               <span className="tag-streak">Day 14 Streak</span>
            </div>
          </div>
          <Button variant="primary">Log Symptoms</Button>
        </div>
      </Card>

      <div className="dashboard-grid">
        
        {/* Left Column: Daily Tasks */}
        <div className="dashboard-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <div className="section-header">
              <h3 className="section-title">Daily Checklist</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="section-subtitle">{completedCount} of {checklistItems.length} completed</span>
                <button 
                  onClick={() => setIsAddingMedicine(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  <Plus size={16} /> Add Medicine
                </button>
              </div>
            </div>

            {isAddingMedicine && (
              <form onSubmit={handleAddMedicine} className="add-medicine-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 600, color: 'var(--color-primary)' }}>New Medicine</h4>
                  <button type="button" onClick={() => setIsAddingMedicine(false)} style={{ color: 'var(--color-outline)' }}>
                    <X size={20} />
                  </button>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Medicine Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Amoxicillin" 
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Dosage (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 500mg" 
                      value={newMedDesc}
                      onChange={(e) => setNewMedDesc(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time to Consume</label>
                    <input 
                      type="time" 
                      className="form-input" 
                      value={newMedTime}
                      onChange={(e) => setNewMedTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <Button type="button" variant="secondary" onClick={() => setIsAddingMedicine(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Add to List</Button>
                </div>
              </form>
            )}
            
            <div className="checklist-container">
              {checklistItems.map(item => (
                <Card 
                  key={item.id} 
                  className="task-item" 
                  onClick={() => toggleTaskCompletion(item.id)}
                >
                  <button className={item.completed ? "task-btn-completed" : "task-btn-pending"}>
                    {item.completed ? <CheckCircle2 size={28} /> : <Circle size={28} strokeWidth={2} />}
                  </button>
                  <div className="task-content">
                    <h4 className={`task-title ${item.completed ? 'completed' : ''}`}>{item.title}</h4>
                    <p className="task-desc">
                      {item.type === 'medicine' ? <Pill size={14} /> : <Activity size={14} />} 
                      {item.desc}
                    </p>
                  </div>
                  <span className={item.completed ? "task-time-completed" : "task-time-pending"}>
                    {!item.completed && <Clock size={12} />} {item.time}
                  </span>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>Recent Insights</h3>
            <div className="insights-grid">
              <Card className="insight-card">
                <div className="insight-icon-sleep">
                  <Moon size={20} />
                </div>
                <h4 className="insight-title">Sleep Quality</h4>
                <p className="insight-desc">You've averaged 7.5 hours of sleep this week, improving your recovery score.</p>
                <a href="#" className="insight-link" style={{ color: 'var(--color-primary)' }}>View details <ChevronRight size={16} /></a>
              </Card>
              <Card className="insight-card">
                <div className="insight-icon-water">
                  <Droplets size={20} />
                </div>
                <h4 className="insight-title">Hydration Level</h4>
                <p className="insight-desc">You're slightly below your daily water intake goal. Try to drink more.</p>
                <a href="#" className="insight-link" style={{ color: 'var(--color-primary)' }}>View details <ChevronRight size={16} /></a>
              </Card>
            </div>
          </section>
        </div>

        {/* Right Column: Quick Stats & Appointments */}
        <div className="dashboard-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>Upcoming Care</h3>
            <Card className="appointment-card">
               <div className="appointment-header">
                 <div>
                   <span className="appointment-tag">Tomorrow</span>
                   <h4 className="appointment-doctor">Dr. Sarah Jenkins</h4>
                   <p className="appointment-type">Cardiology Follow-up</p>
                 </div>
               </div>
               <div className="appointment-details">
                  <div className="appointment-detail-col">
                     <p className="appointment-detail-label">Time</p>
                     <p className="appointment-detail-value">10:30 AM</p>
                  </div>
                  <div className="appointment-detail-col">
                     <p className="appointment-detail-label">Location</p>
                     <p className="appointment-detail-value">North Wing, Rm 402</p>
                  </div>
               </div>
            </Card>
          </section>

          <section>
             <h3 className="section-title" style={{ marginBottom: '1rem' }}>Vitals Snapshot</h3>
             <div className="vitals-container">
               <Card className="vital-card">
                  <div>
                    <p className="vital-label">Heart Rate</p>
                    <p className="vital-value">72 <span className="vital-unit">bpm</span></p>
                  </div>
                  <div className="vital-chart-placeholder">Chart</div>
               </Card>
               <Card className="vital-card">
                  <div>
                    <p className="vital-label">Blood Pressure</p>
                    <p className="vital-value">118/76 <span className="vital-unit">mmHg</span></p>
                  </div>
                  <div className="vital-chart-placeholder">Chart</div>
               </Card>
             </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
