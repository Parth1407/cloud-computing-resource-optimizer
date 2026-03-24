import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Server, Hash, ArrowRight, CheckCircle, CloudLightning } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Auth.css';

function CloudSetup() {
  const [provider, setProvider] = useState('aws');
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleConnect = (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    setTimeout(() => {
      setIsValidating(false);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/llm-setup');
      }, 1500);
    }, 2000);
  };

  const handleDemoFill = () => {
    setProvider('aws');
    setAccessKey('AKIAIOSFODNN7EXAMPLE');
    setSecretKey('wJalrXUtnFEMI/K7MDENG/bPxR');
    setRegion('us-east-1');
  };

  return (
    <div className={`auth-container ${theme}`}>
      {/* Background elements */}
      <div className="bg-glow top-glow"></div>
      <div className="bg-glow bottom-glow"></div>
      
      <div className="auth-wrapper">
        <div className="brand-section">
          <div className="brand-logo">
            <Server size={40} className="icon-pulse" />
          </div>
          <h1>Cloud Integration</h1>
          <p>Securely connect your infrastructure</p>
        </div>

        <div className="auth-card">
          {success ? (
            <div className="success-state">
              <CheckCircle size={64} className="success-icon" style={{ color: '#10b981', margin: '0 auto 1.5rem', display: 'block' }} />
              <h2 style={{ textAlign: 'center', margin: '0 0 0.5rem 0', fontWeight: '500' }}>Connection Active!</h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Redirecting to intelligence config...</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleConnect} className="auth-form">
                <div className="form-header">
                  <h2>Provider Config</h2>
                  <span className="secure-badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)' }}>
                    <CloudLightning size={12} /> Sync
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {['aws', 'gcp', 'azure'].map(p => (
                    <button 
                      key={p}
                      type="button" 
                      onClick={() => setProvider(p)}
                      style={{ 
                        flex: 1, 
                        border: '1px solid',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase', 
                        borderColor: provider === p ? 'var(--accent)' : 'var(--border-focus)',
                        color: provider === p ? 'var(--accent)' : 'var(--text-main)',
                        background: provider === p ? 'rgba(56, 189, 248, 0.05)' : 'transparent'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    id="accessKey"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    required 
                    className={accessKey ? 'has-value' : ''}
                  />
                  <label htmlFor="accessKey"><Key size={16} /> Access Key ID</label>
                </div>

                <div className="input-group">
                  <input 
                    type="password" 
                    id="secretKey"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required 
                    className={secretKey ? 'has-value' : ''}
                  />
                  <label htmlFor="secretKey"><Hash size={16} /> Secret Access Key</label>
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required 
                    className={region ? 'has-value' : ''}
                  />
                  <label htmlFor="region"><Server size={16} /> Data Region</label>
                </div>

                <button type="submit" className={`auth-button ${isValidating ? 'loading' : ''}`} disabled={isValidating}>
                  {isValidating ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      Connect Cloud <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
              
              <div className="demo-credentials">
                <div className="demo-hint-title">
                  <CloudLightning size={14} className="accent-color" /> Test Sandbox
                </div>
                <p>Skip configuring live API keys and connect to our demo simulation.</p>
                <button type="button" className="demo-fill-btn" onClick={handleDemoFill}>
                  Load Simulated Sandbox Keys
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CloudSetup;
