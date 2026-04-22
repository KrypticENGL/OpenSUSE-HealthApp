import React from 'react';
import Card from '../components/ui/Card';
import Sparkline from '../components/ui/Sparkline';
import { Heart, Activity, Droplets, Thermometer, Wind } from 'lucide-react';

const MyHealth = () => {
  const vitalsData = [
    {
      id: 'hr',
      title: 'Heart Rate',
      icon: <Heart size={20} color="var(--color-primary)" />,
      value: '72',
      unit: 'bpm',
      status: 'normal',
      statusText: 'Normal',
      history: [68, 70, 75, 78, 74, 72, 72],
      color: '#246a51', // secondary (greenish)
    },
    {
      id: 'bp',
      title: 'Blood Pressure',
      icon: <Activity size={20} color="var(--color-primary)" />,
      value: '135/85',
      unit: 'mmHg',
      status: 'warning',
      statusText: 'Elevated',
      history: [120, 122, 128, 130, 134, 136, 135],
      color: '#f59e0b', // warning (amber)
    },
    {
      id: 'spo2',
      title: 'SpO2',
      icon: <Wind size={20} color="var(--color-primary)" />,
      value: '98',
      unit: '%',
      status: 'normal',
      statusText: 'Normal',
      history: [99, 98, 97, 98, 99, 98, 98],
      color: '#246a51',
    },
    {
      id: 'glucose',
      title: 'Blood Glucose',
      icon: <Droplets size={20} color="var(--color-primary)" />,
      value: '110',
      unit: 'mg/dL',
      status: 'normal',
      statusText: 'Normal',
      history: [105, 108, 102, 115, 112, 109, 110],
      color: '#246a51',
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'normal': return 'vital-badge-normal';
      case 'warning': return 'vital-badge-warning';
      case 'critical': return 'vital-badge-critical';
      default: return 'vital-badge-normal';
    }
  };

  return (
    <div className="dashboard-container" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header className="dashboard-header">
        <h1>My Health</h1>
        <p>Your current vitals and historical trends.</p>
      </header>

      <div className="vitals-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {vitalsData.map((vital) => (
          <Card key={vital.id} className="vital-list-item">
            <div className="vital-list-content">
              {/* Left: Icon & Title */}
              <div className="vital-list-info">
                <div className="vital-icon-box">
                  {vital.icon}
                </div>
                <div>
                  <h3 className="vital-list-title">{vital.title}</h3>
                  <p className="vital-list-subtitle">Updated today</p>
                </div>
              </div>
              
              {/* Middle: Value */}
              <div className="vital-list-value-box">
                <span className="vital-list-value">{vital.value}</span>
                <span className="vital-list-unit">{vital.unit}</span>
              </div>

              {/* Middle-Right: Sparkline */}
              <div className="vital-list-graph">
                <Sparkline data={vital.history} color={vital.color} height={40} width={120} />
              </div>

              {/* Right: Badge */}
              <div className="vital-list-status">
                <span className={`vital-badge ${getStatusClass(vital.status)}`}>
                  {vital.statusText}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyHealth;
