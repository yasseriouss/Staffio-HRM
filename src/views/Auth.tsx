import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Fingerprint, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
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
        background: 'var(--bg-main)',
        backgroundImage: 'radial-gradient(circle at 50% 0%, var(--surface-bg) 0%, transparent 70%)',
        fontFamily: rtl ? "'Cairo', 'Public Sans', sans-serif" : "'Public Sans', sans-serif"
      }}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      {/* Language Switcher */}
      <div className="absolute top-6 right-8 flex gap-2">
        <button onClick={() => setLang('en')} className={`text-12 font-500 ${lang === 'en' ? 'text-primary' : 'text-faint'}`}>EN</button>
        <span className="text-12 text-faint">|</span>
        <button onClick={() => setLang('ar')} className={`text-12 font-500 ${lang === 'ar' ? 'text-primary' : 'text-faint'}`}>عربي</button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '40px',
          background: 'var(--surface-bg)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative corner marks */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 24, height: 24, borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderBottom: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)', opacity: 0.5 }} />

        <div className="flex flex-col items-center mb-10">
          <div 
            className="flex items-center justify-center mb-6"
            style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 'var(--radius-lg)', 
              background: 'rgba(74, 76, 166, 0.1)', // Subdued primary
              border: '1px solid rgba(74, 76, 166, 0.2)'
            }}
          >
            <Fingerprint size={28} color="var(--color-primary)" />
          </div>
          <h1 className="text-24 font-700 text-primary mb-2" style={{ letterSpacing: rtl ? '0' : '-0.02em' }}>
            {t('auth.title')}
          </h1>
          <p className="text-14 text-muted text-center">
            {t('auth.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-12 font-500 text-secondary mb-2 uppercase tracking-wider">
              {t('auth.email')}
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted" style={{ [rtl ? 'right' : 'left']: 14 }}>
                <Mail size={16} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-main border border-surface-border text-primary text-14 outline-none focus:border-primary transition-colors"
                style={{ 
                  height: 44, 
                  borderRadius: 'var(--radius-md)', 
                  padding: rtl ? '0 40px 0 16px' : '0 16px 0 40px',
                }}
                placeholder="admin@staffio.local"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-12 font-500 text-secondary uppercase tracking-wider">
                {t('auth.password')}
              </label>
              <button type="button" className="text-12 text-primary hover:underline">
                {t('auth.forgot')}
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted" style={{ [rtl ? 'right' : 'left']: 14 }}>
                <Lock size={16} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-main border border-surface-border text-primary text-14 outline-none focus:border-primary transition-colors"
                style={{ 
                  height: 44, 
                  borderRadius: 'var(--radius-md)', 
                  padding: rtl ? '0 40px 0 16px' : '0 16px 0 40px',
                  fontFamily: 'monospace'
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 text-14 font-600 transition-all"
            style={{
              height: 48,
              background: isLoading ? 'var(--surface-border)' : 'var(--color-primary)',
              color: isLoading ? 'var(--text-muted)' : '#fff',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
            ) : (
              <>
                {t('auth.login')}
                <ArrowRight size={16} style={{ transform: rtl ? 'rotate(180deg)' : 'none' }} />
              </>
            )}
          </button>
        </form>
        
        {/* Minimal branding at bottom */}
        <div className="mt-10 flex justify-center opacity-40">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
