import React from 'react';
import { Settings as SettingsIcon, Bell, Mail, Database, Terminal } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Dashboard.css';

function Settings() {
  const { theme } = useTheme();

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="dashboard-header">
        <div className="toolbar-title" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SettingsIcon size={20} /> Global Settings
        </div>
      </div>

      <div className="main-content-row" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        <div className="dashboard-card">
          <div className="card-header">
             <div className="card-title">Instance Preferences</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            
            <div className="hitl-header-box" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' , marginBottom: '0.3rem' }}><Bell size={14} style={{ display: 'inline', marginRight: '5px' }} /> Email Alerts</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Send critical alert notifications via SendGrid.</div>
              </div>
              <div className="toggle-track">
                <div className="toggle-thumb" style={{ transform: 'translateX(20px)' }}></div>
              </div>
            </div>

            <div className="hitl-header-box" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' , marginBottom: '0.3rem' }}><Terminal size={14} style={{ display: 'inline', marginRight: '5px' }} /> Verbose App Logging</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Store expanded debug traces on S3 buckets.</div>
              </div>
              <div className="toggle-track disabled">
                <div className="toggle-thumb" style={{ transform: 'translateX(0)' }}></div>
              </div>
            </div>
            
            <div className="hitl-header-box" style={{ paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' , marginBottom: '0.3rem' }}><Database size={14} style={{ display: 'inline', marginRight: '5px' }} /> Data Retention Period</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Telemetry cache drops after this window.</div>
              </div>
              <select className="tool-select" style={{ minWidth: '150px' }}>
                <option>7 Days</option>
                <option>30 Days</option>
                <option>90 Days</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
