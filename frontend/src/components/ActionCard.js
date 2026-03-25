import React from 'react';
import { ShieldAlert, ShieldCheck, ArrowUpCircle, ArrowDownCircle, AlertTriangle } from 'lucide-react';

function ActionCard({ action, urgency, reason, confidence }) {
  const getActionConfig = (action) => {
    switch (action) {
      case 'Scale Up':
        return { icon: <ArrowUpCircle size={32} className="action-icon warning" />, color: '#f59e0b', bg: '#fef3c7', text: 'Provision Resources' };
      case 'Scale Down':
        return { icon: <ArrowDownCircle size={32} className="action-icon success" />, color: '#10b981', bg: '#d1fae5', text: 'Optimize Resources' };
      default:
        return { icon: <ShieldCheck size={32} className="action-icon optimal" />, color: '#3b82f6', bg: '#dbeafe', text: 'Maintain Configuration' };
    }
  };

  const config = getActionConfig(action);

  return (
    <div className={`dashboard-card action-card ${action.replace(' ', '-').toLowerCase()}`}>
      <div className="card-header">
        <div className="card-title">
          <ShieldAlert size={18} className="lucide-icon" />
          AI Recommendation
        </div>
        <span className={`urgency-pill ${urgency}`}>{urgency} Priority</span>
      </div>

      <div className="action-hero">
        <div className="action-visual" style={{ color: config.color }}>
          {config.icon}
        </div>
        <div className="action-meta">
          <h3>{config.text}</h3>
        </div>
      </div>
      
      {reason && (
        <div className="action-context">
          <AlertTriangle size={14} className="context-icon" />
          <p>{reason}</p>
        </div>
      )}

      <div className="confidence-meter">
        <div className="meter-label">
          <span>AI Confidence</span>
          <span>{Math.round(confidence * 100)}%</span>
        </div>
        <div className="meter-track">
          <div 
            className="meter-fill" 
            style={{ 
              width: `${confidence * 100}%`,
              background: confidence > 0.8 ? '#10b981' : confidence > 0.5 ? '#f59e0b' : '#ef4444'
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default ActionCard;
