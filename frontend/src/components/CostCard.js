import React from 'react';
import { DollarSign, TrendingDown, CheckCircle } from 'lucide-react';

function CostCard({ hourly, monthly, savings, savingsPercent }) {
  const annual = monthly * 12;
  const potentialAnnualSavings = savings * 24 * 365;

  return (
    <div className="dashboard-card cost-card">
      <div className="card-header">
        <div className="card-title">
          <DollarSign size={18} className="lucide-icon" />
          Cost Savings
        </div>
      </div>
      
      <div className="cost-metrics">
        <div className="cost-row">
          <span className="cost-label">Hourly Cost</span>
          <span className="cost-value">${hourly.toFixed(4)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Monthly Projection</span>
          <span className="cost-value highlight">${monthly.toFixed(2)}</span>
        </div>
        <div className="cost-row pb-border">
          <span className="cost-label">Annual Projection</span>
          <span className="cost-value">${annual.toFixed(2)}</span>
        </div>
        
        <div className={`savings-box ${savings > 0 ? 'active-savings' : 'optimal'}`}>
          {savings > 0 ? (
            <>
              <div className="savings-title">
                <TrendingDown size={16} /> Potential Savings
              </div>
              <div className="savings-data">
                <div className="savings-stat">
                  <span>{savingsPercent.toFixed(1)}%</span>
                  <label>Reduction</label>
                </div>
                <div className="savings-stat">
                  <span>${potentialAnnualSavings.toFixed(0)}</span>
                  <label>Annualized</label>
                </div>
              </div>
            </>
          ) : (
            <div className="optimal-state">
              <CheckCircle size={20} className="success-icon" />
              <div>
                <strong>Infrastructure Optimized</strong>
                <p>Zero overprovisioning detected.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CostCard;
