import React from 'react';
import {
  LayoutDashboard, UserPlus, Users,
  CreditCard, MessageSquare, Settings
} from 'lucide-react';
import { useLang } from '../context/LangContext';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NAV = [
  { id: 'dashboard',   labelKey: 'nav.dashboard',   icon: LayoutDashboard },
  { id: 'recruitment', labelKey: 'nav.recruitment',  icon: UserPlus        },
  { id: 'employees',   labelKey: 'nav.employees',    icon: Users           },
  { id: 'payroll',     labelKey: 'nav.payroll',      icon: CreditCard      },
  { id: 'messages',    labelKey: 'nav.messages',     icon: MessageSquare   },
  { id: 'settings',    labelKey: 'nav.settings',     icon: Settings        },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { t, rtl } = useLang();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h1>Staff<span>io</span></h1>
        <p>{t('app.logo_sub')}</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV.map(({ id, labelKey, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-item ${activeView === id ? 'active' : ''}`}
            onClick={() => setActiveView(id)}
          >
            <Icon size={17} />
            <span>{t(labelKey)}</span>
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-footer">
        <button
          className="flex items-center gap-3"
          style={{ width: '100%' }}
          onClick={() => setActiveView('profile')}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(226,226,253,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            JD
          </div>
          <div style={{ textAlign: rtl ? 'right' : 'left' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
              {t('user.name')}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
              {t('profile.role')}
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
