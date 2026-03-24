import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Server, Hash, ArrowRight, CheckCircle, BrainCircuit, CloudLightning } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Auth.css';

function LlmSetup() {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
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
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleDemoFill = () => {
    setProvider('anthropic');
    setApiKey('sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxx_DEMO');
    setRegion('global-us');
  };

  return (
    <div className={`auth-container ${theme}`}>
      {/* Background elements */}
      <div className="bg-glow top-glow"></div>
      <div className="bg-glow bottom-glow"></div>
      
      <div className="auth-wrapper">
        <div className="brand-section">
          <div className="brand-logo">
            <BrainCircuit size={40} className="icon-pulse" />
          </div>
          <h1>AI Integration</h1>
          <p>Securely connect your generative model</p>
        </div>

        <div className="auth-card">
          {success ? (
            <div className="success-state">
              <CheckCircle size={64} className="success-icon" style={{ color: '#10b981', margin: '0 auto 1.5rem', display: 'block' }} />
              <h2 style={{ textAlign: 'center', margin: '0 0 0.5rem 0', fontWeight: '500' }}>Engine Secured!</h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Redirecting to operations dashboard...</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleConnect} className="auth-form">
                <div className="form-header">
                  <h2>LLM Config</h2>
                  <span className="secure-badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)' }}>
                    <CloudLightning size={12} /> Sync
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {['openai', 'anthropic', 'gemini'].map(p => (
                    <button 
                      key={p}
                      type="button" 
                      onClick={() => setProvider(p)}
                      style={{ 
                        flex: 1, 
                        border: '1px solid',
                        padding: '0.6rem 0.2rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase', 
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
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
                    type="password" 
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required 
                    className={apiKey ? 'has-value' : ''}
                  />
                  <label htmlFor="apiKey"><Key size={16} /> Secure API Key</label>
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
                       Connect Engine <ArrowRight size={18} />
                     </>
                   )}
                   <div className="button-glare"></div>
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

export default LlmSetup;
