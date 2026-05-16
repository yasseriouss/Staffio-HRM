import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useLang } from '../context/LangContext';
import type { Lang } from '../context/LangContext';

const Topbar: React.FC = () => {
  const { t, lang, setLang } = useLang();

  return (
    <header className="topbar">
      {/* Search */}
      <div className="search-box">
        <Search size={15} color="var(--text-faint)" />
        <input type="text" placeholder={t('app.search')} />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Language switcher */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface-bg)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', padding: 3 }}>
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

        {/* Notification bell */}
        <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
          <Bell size={19} />
          <span style={{
            position: 'absolute', top: -2, right: -2,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-primary)',
            border: '2px solid var(--surface-card)',
          }} />
        </button>

        <div style={{ width: 1, height: 24, background: 'var(--surface-border)' }} />

        {/* Status */}
        <div className="flex items-center gap-2">
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-success)',
            boxShadow: '0 0 0 3px rgba(61,220,151,0.2)',
          }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('app.status')}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
