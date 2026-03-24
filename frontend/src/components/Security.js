import React from 'react';
import { Shield, Key, Lock, Users } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Dashboard.css';

function Security() {
  const { theme } = useTheme();

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="dashboard-header">
        <div className="toolbar-title" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} /> Security POSTURE
        </div>
      </div>

      <div className="main-content-row" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        <div className="dashboard-card chart-glow-bg">
          <div className="card-header">
             <div className="card-title">Identity & Access Management</div>
             <span className="pro-badge">PRO</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="node-card optimal">
               <div className="node-icon"><Key size={20} /></div>
               <div className="node-info">
                 <div className="node-id">Cloud IAM Sync</div>
                 <div className="node-ip">AWS STS / Temporary Credentials</div>
               </div>
               <div className="node-meta">
                 <span className="node-lag" style={{ color: '#10b981' }}>Active</span>
               </div>
            </div>

            <div className="node-card optimal">
               <div className="node-icon"><Lock size={20} /></div>
               <div className="node-info">
                 <div className="node-id">LLM Token Encryption</div>
                 <div className="node-ip">AES-256 At Rest</div>
               </div>
               <div className="node-meta">
                 <span className="node-lag" style={{ color: '#10b981' }}>Secured</span>
               </div>
            </div>

            <div className="node-card warning">
               <div className="node-icon"><Users size={20} /></div>
               <div className="node-info">
                 <div className="node-id">SSO Integration</div>
                 <div className="node-ip">Okta / Azure AD</div>
               </div>
               <div className="node-meta">
                 <span className="node-lag" style={{ color: '#f59e0b' }}>Pending</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
