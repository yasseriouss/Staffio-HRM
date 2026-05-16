import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { useLang } from '../context/LangContext';
import type { Lang } from '../context/LangContext';

interface TopbarProps {
  onLogout?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onLogout }) => {
  const { t, lang, setLang } = useLang();

  return (
    <header className="topbar mobile-header-card">
      {/* Mobile Logo (Visible only on mobile via CSS) */}
      <div className="mobile-only-logo" style={{ display: 'none' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
          Staff<span style={{ color: 'var(--color-primary-200)' }}>io</span>
        </h1>
      </div>

      {/* Search (Hidden on mobile) */}
      <div className="search-box desktop-only">
        <Search size={15} color="var(--text-faint)" />
        <input type="text" placeholder={t('app.search')} />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 flex-wrap topbar-actions">
        {/* Language switcher */}
        <div className="desktop-only" style={{ display: 'flex', gap: 4, background: 'var(--surface-bg)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', padding: 3 }}>
          {(['en', 'ar'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
                background: lang === l ? 'var(--color-primary)' : 'transparent',
                color: lang === l ? '#fff' : 'var(--text-muted)',
              }}
            >
              {l === 'en' ? 'EN' : 'عر'}
            </button>
          ))}
        </div>

        {/* Chat / Messages icon (added for mobile parity) */}
        <button style={{ position: 'relative', color: 'var(--text-muted)' }} className="mobile-icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span style={{
            position: 'absolute', top: -2, right: -2,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-error)',
            border: '2px solid var(--surface-card)',
          }} />
        </button>

        {/* Notification bell */}
        <button style={{ position: 'relative', color: 'var(--text-muted)' }} className="mobile-icon-btn">
          <Bell size={20} />
          <span style={{
            position: 'absolute', top: -2, right: -2,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-error)',
            border: '2px solid var(--surface-card)',
          }} />
        </button>

        <div className="desktop-only" style={{ width: 1, height: 24, background: 'var(--surface-border)' }} />

        {/* Status */}
        <div className="flex items-center gap-2 desktop-only">
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-success)',
            boxShadow: '0 0 0 3px rgba(61,220,151,0.2)',
          }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 16 }}>{t('app.status')}</span>
        </div>

        {/* Logout */}
        {onLogout && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 transition-colors desktop-only" 
            style={{ color: 'var(--color-error)', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
            title={t('app.logout')}
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
