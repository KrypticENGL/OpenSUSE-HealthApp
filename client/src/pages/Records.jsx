import React from 'react';
import Card from '../components/ui/Card';
import { Pill, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

const Records = () => {
  const medicationLogs = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', time: '8:05 AM', date: 'Today', status: 'Taken' },
    { id: 2, name: 'Metformin', dosage: '500mg', time: '1:15 PM', date: 'Today', status: 'Taken' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', time: '9:00 PM', date: 'Yesterday', status: 'Taken' },
    { id: 4, name: 'Lisinopril', dosage: '10mg', time: '8:10 AM', date: 'Yesterday', status: 'Taken' },
    { id: 5, name: 'Metformin', dosage: '500mg', time: '1:05 PM', date: 'Yesterday', status: 'Taken' },
    { id: 6, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', date: 'April 20, 2026', status: 'Taken' },
  ];

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header className="dashboard-header">
        <h1>Health Records</h1>
        <p>A history of your medication logs and activities.</p>
      </header>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Medication History</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
             <button className="tag-stable" style={{ border: 'none', cursor: 'pointer' }}>All</button>
             <button className="tag-streak" style={{ cursor: 'pointer' }}>This Week</button>
          </div>
        </div>

        <div className="records-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {medicationLogs.map((log) => (
            <Card key={log.id} className="record-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: 'rgba(45, 91, 122, 0.1)', borderRadius: 'var(--radius-lg)', color: 'var(--color-primary)' }}>
                    <Pill size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-primary)' }}>{log.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-outline)' }}>{log.dosage}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                      <Clock size={14} /> {log.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
                      <Calendar size={14} /> {log.date}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: '600', fontSize: '0.875rem' }}>
                    <CheckCircle2 size={18} />
                    {log.status}
                  </div>

                  <button style={{ color: 'var(--color-outline)' }}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Records;
