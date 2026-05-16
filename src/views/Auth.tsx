import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Fingerprint, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLang } from '../context/LangContext';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const { t, rtl, lang, setLang } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ 
        background: '#0a0a0a',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        fontFamily: rtl ? "'Cairo', 'Public Sans', sans-serif" : "'Public Sans', sans-serif"
      }}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      {/* Top Bar Actions */}
      <div className="absolute top-6 left-8 right-8 flex justify-between items-center">
        <button 
          onClick={onBack}
          style={{ 
            display: 'flex', alignItems: 'center', gap: 8, 
            background: 'none', border: 'none', color: '#666', 
            fontSize: 12, fontWeight: 800, cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}
        >
          <ArrowLeft size={16} style={{ transform: rtl ? 'rotate(180deg)' : 'none' }} />
          {rtl ? 'العودة للرئيسية' : 'Back to Home'}
        </button>

        <div className="flex gap-4">
          <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: lang === 'en' ? 'var(--color-primary)' : '#444' }}>EN</button>
          <button onClick={() => setLang('ar')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: lang === 'ar' ? 'var(--color-primary)' : '#444' }}>عربي</button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '48px',
          background: '#111',
          border: '1px solid #222',
          borderRadius: 0,
          boxShadow: '20px 20px 0 rgba(0,0,0,0.5)',
          position: 'relative'
        }}
      >
        {/* Decorative corner marks */}
        <div style={{ position: 'absolute', top: -1, left: -1, width: 32, height: 32, borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)' }} />
        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 32, height: 32, borderBottom: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }} />

        <div className="flex flex-col items-center mb-12">
          <div 
            className="flex items-center justify-center mb-8"
            style={{ 
              width: 64, 
              height: 64, 
              borderRadius: 0, 
              background: 'var(--color-primary)', 
              boxShadow: '4px 4px 0 #1a1a1a'
            }}
          >
            <Fingerprint size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {t('auth.title')}
          </h1>
          <p style={{ fontSize: 13, color: '#666', textAlign: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('auth.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#444', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t('auth.email')}
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted" style={{ [rtl ? 'right' : 'left']: 16 }}>
                <Mail size={16} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                style={{ 
                  height: 52, 
                  background: '#0a0a0a',
                  border: '1px solid #222',
                  color: '#fff',
                  borderRadius: 0, 
                  padding: rtl ? '0 48px 0 16px' : '0 16px 0 48px',
                  fontSize: 14,
                  outline: 'none'
                }}
                placeholder="ADMIN@STAFFIO.LOCAL"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {t('auth.password')}
              </label>
              <button type="button" style={{ background: 'none', border: 'none', fontSize: 11, fontWeight: 800, color: 'var(--color-primary)', cursor: 'pointer', textTransform: 'uppercase' }}>
                {t('auth.forgot')}
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted" style={{ [rtl ? 'right' : 'left']: 16 }}>
                <Lock size={16} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                style={{ 
                  height: 52, 
                  background: '#0a0a0a',
                  border: '1px solid #222',
                  color: '#fff',
                  borderRadius: 0, 
                  padding: rtl ? '0 48px 0 16px' : '0 16px 0 48px',
                  fontSize: 14,
                  outline: 'none',
                  letterSpacing: '0.3em'
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              height: 56,
              background: isLoading ? '#222' : 'var(--color-primary)',
              color: '#fff',
              borderRadius: 0,
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginTop: 12,
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: isLoading ? 'none' : '4px 4px 0 #1a1a1a'
            }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
            ) : (
              <>
                {t('auth.login')}
                <ArrowRight size={18} style={{ transform: rtl ? 'rotate(180deg)' : 'none' }} />
              </>
            )}
          </button>
        </form>
        
        {/* Minimal branding at bottom */}
        <div className="mt-12 flex justify-center opacity-10">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
