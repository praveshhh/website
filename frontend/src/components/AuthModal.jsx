import React, { useState } from 'react';
import { X, Mail, Lock, ShieldAlert, CheckCircle, RefreshCw, Key } from 'lucide-react';
import axios from 'axios';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, backendUrl }) {
  if (!isOpen) return null;

  // View state: 'login' | 'signup' | 'otp' | 'setup_pass'
  const [mode, setMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setOtpCode('');
    setMasterPassword('');
    setError(null);
    setMessage(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Sign In Flow
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${backendUrl}/api/auth/signin`, { email, password });
      const data = response.data; // { token, id, email, verified, role }
      
      if (!data.verified) {
        setMessage("Your account is not verified yet. A verification code has been sent.");
        await axios.post(`${backendUrl}/api/auth/resend-otp?email=${email}`);
        setMode('otp');
      } else {
        setMode('setup_pass');
        setPassword(password); // Keep it to sign in after
        setMessage("Enter your Master Password to unlock your E2EE Vault.");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Sign Up Flow - Step 1: Submit Email & Register
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, { email, password });
      setMessage(response.data.message);
      setMode('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Sign Up Flow - Step 2: Verify OTP
  const handleVerifyOtpSimple = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${backendUrl}/api/auth/verify`, { email, code: otpCode });
      
      // Auto login after verification
      const loginResponse = await axios.post(`${backendUrl}/api/auth/signin`, { email, password });
      const data = loginResponse.data;

      // Master password is the password used for encryption (client-side only)
      onAuthSuccess(data, password); // Using password as master key for simplicity
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Verification or sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockVault = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${backendUrl}/api/auth/signin`, { email, password })
      .then(res => {
        onAuthSuccess(res.data, masterPassword);
        handleClose();
      })
      .catch(err => {
        setError("Could not unlock vault. Verify email, password, and master password.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(94, 92, 230, 0.08)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="card-cred" style={{
        maxWidth: '440px',
        width: '100%',
        position: 'relative',
        border: '1px solid var(--border-primary)',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 30px 60px rgba(94, 92, 230, 0.12)',
        padding: '32px'
      }}>
        {/* Close Button */}
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(0, 0, 0, 0.08)'; }}
          onMouseOut={(e) => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'rgba(0, 0, 0, 0.03)'; }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(94, 92, 230, 0.05)',
            border: '1px solid rgba(94, 92, 230, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Key size={18} color="var(--accent-periwinkle)" />
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {mode === 'login' && 'Unlock Account'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'otp' && 'Verify OTP'}
            {mode === 'setup_pass' && 'Initialize Vault'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {mode === 'login' && 'Enter details to enter your secure E2EE dashboard.'}
            {mode === 'signup' && 'Sign up for a secure merchant wallet node.'}
            {mode === 'otp' && 'Check your Gmail for the 6-digit confirmation code.'}
            {mode === 'setup_pass' && 'Establish E2EE master password.'}
          </p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div style={{
            background: 'rgba(255, 72, 72, 0.04)',
            border: '1px solid rgba(255, 72, 72, 0.12)',
            borderRadius: '8px',
            color: '#ff4d4d',
            fontSize: '13px',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div style={{
            background: 'rgba(36, 178, 99, 0.04)',
            border: '1px solid rgba(36, 178, 99, 0.12)',
            borderRadius: '8px',
            color: 'var(--accent-green)',
            fontSize: '13px',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        {/* Modes */}
        
        {/* LOGIN MODE */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group-cred">
              <label htmlFor="login-email">Merchant Email</label>
              <input 
                type="email" 
                id="login-email" 
                placeholder="email@example.com"
                className="form-control-cred"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group-cred">
              <label htmlFor="login-pass">Account Password</label>
              <input 
                type="password" 
                id="login-pass" 
                placeholder="••••••••"
                className="form-control-cred"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-cred" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Processing...' : 'Unlock Account'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
              <button 
                type="button" 
                onClick={() => { setMode('signup'); setError(null); setMessage(null); }}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-periwinkle)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP MODE */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group-cred">
              <label htmlFor="signup-email">Merchant Email</label>
              <input 
                type="email" 
                id="signup-email" 
                placeholder="email@example.com"
                className="form-control-cred"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group-cred">
              <label htmlFor="signup-pass">Create Password</label>
              <input 
                type="password" 
                id="signup-pass" 
                placeholder="••••••••"
                className="form-control-cred"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-cred" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Register Account'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Already registered? </span>
              <button 
                type="button" 
                onClick={() => { setMode('login'); setError(null); setMessage(null); }}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-periwinkle)', fontWeight: 600, cursor: 'pointer' }}
              >
                Log In
              </button>
            </div>
          </form>
        )}

        {/* OTP VERIFICATION MODE */}
        {mode === 'otp' && (
          <form onSubmit={handleVerifyOtpSimple}>
            <div className="form-group-cred" style={{ textAlign: 'center' }}>
              <label htmlFor="otp-code">6-Digit Code</label>
              <input 
                type="text" 
                id="otp-code" 
                placeholder="123456"
                maxLength="6"
                className="form-control-cred"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', padding: '12px' }}
                required 
              />
            </div>

            <button type="submit" className="btn-cred" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', fontSize: '13px' }}>
              <button 
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await axios.post(`${backendUrl}/api/auth/resend-otp?email=${email}`);
                    setMessage("OTP resent. Check your Gmail inbox.");
                  } catch(e) {
                    setError("Failed to resend OTP.");
                  } finally {
                    setLoading(false);
                  }
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RefreshCw size={12} /> Resend OTP
              </button>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <button 
                type="button" 
                onClick={() => setMode('signup')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                Back to signup
              </button>
            </div>
          </form>
        )}

        {/* UNLOCK E2EE VAULT MODE */}
        {mode === 'setup_pass' && (
          <form onSubmit={handleUnlockVault}>
            <div className="form-group-cred">
              <label htmlFor="master-pass">E2EE Master Password</label>
              <input 
                type="password" 
                id="master-pass" 
                placeholder="Enter Master Password"
                className="form-control-cred"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                required 
              />
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
                This password is used to decrypt your vault items in the browser. It is never stored on the server.
              </p>
            </div>

            <button type="submit" className="btn-cred" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Unlocking...' : 'Unlock E2EE Vault'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
