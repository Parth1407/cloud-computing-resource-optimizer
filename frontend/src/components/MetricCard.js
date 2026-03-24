import React from 'react';
import { Activity, Cpu, HardDrive, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

function MetricCard({ title, current, predicted, unit, type }) {
  const trend = predicted - current;
  
  let TrendIcon = Minus;
  let trendClass = 'neutral';
  if (trend > 2) {
    TrendIcon = ArrowUpRight;
    trendClass = 'critical';
  } else if (trend < -2) {
    TrendIcon = ArrowDownRight;
    trendClass = 'optimal';
  }

  const getIcon = () => {
    switch(type) {
      case 'cpu': return <Cpu size={18} className="lucide-icon" />;
      case 'memory': return <HardDrive size={18} className="lucide-icon" />;
      default: return <Activity size={18} className="lucide-icon" />;
    }
  };

  return (
    <div className={`dashboard-card metric-card`}>
      <div className="card-header">
        <div className="card-title">
          {getIcon()}
          {title}
        </div>
        <TrendIcon size={18} className={`trend-icon ${trendClass}`} />
      </div>

      <div className="metric-primary">
        <div className="metric-current">
          <span className="value">{current.toFixed(1)}<span className="unit">{unit}</span></span>
          <span className="label">Current Load</span>
        </div>
        
        <div className="metric-forecast">
          <span className="value">{predicted.toFixed(1)}{unit}</span>
          <span className="label">Forecast</span>
        </div>
      </div>

      <div className="utilization-bar">
        <div className="bar-track">
          <div 
            className={`bar-fill current ${type}`} 
            style={{ width: `${Math.min(current, 100)}%` }}
          />
        </div>
        <div className="bar-track forecast-track">
          <div 
            className={`bar-fill forecast ${type}`} 
            style={{ width: `${Math.min(predicted, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
