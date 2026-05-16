import React, { useState, useEffect } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from './context/LangContext';

import Auth        from './views/Auth';
import Dashboard   from './views/Dashboard';
import Recruitment from './views/Recruitment';
import Employees   from './views/Employees';
import Payroll     from './views/Payroll';
import Messages    from './views/Messages';
import Settings    from './views/Settings';
import Profile     from './views/Profile';
import OrgChart    from './views/OrgChart';
import LandingPage from './views/Landing';
import Attendance  from './views/Attendance';
import Performance from './views/Performance';

const VIEWS_WITH_ACTIONS = ['dashboard', 'employees', 'recruitment', 'payroll'];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewRoute, setViewRoute] = useState<'landing' | 'auth' | 'app'>('landing');
  const [activeView, setActiveView] = useState('dashboard');
  const { t, rtl } = useLang();

  // Simple persistence for auth state during dev
  useEffect(() => {
    const storedAuth = localStorage.getItem('staffio_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setViewRoute('app');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setViewRoute('app');
    localStorage.setItem('staffio_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setViewRoute('landing');
    localStorage.removeItem('staffio_auth');
  };

  const PAGE_LABELS: Record<string, string> = {
    dashboard:   t('nav.dashboard'),
    recruitment: t('nav.recruitment'),
    employees:   t('nav.employees'),
    payroll:     t('nav.payroll'),
    messages:    t('nav.messages'),
    settings:    t('nav.settings'),
    profile:     t('nav.profile'),
    orgchart:    t('nav.orgchart'),
    attendance:  t('nav.attendance'),
    performance: t('nav.performance'),
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':   return <Dashboard />;
      case 'recruitment': return <Recruitment />;
      case 'employees':   return <Employees />;
      case 'payroll':     return <Payroll />;
      case 'messages':    return <Messages />;
      case 'settings':    return <Settings />;
      case 'profile':     return <Profile />;
      case 'orgchart':    return <OrgChart />;
      case 'attendance':  return <Attendance />;
      case 'performance': return <Performance />;
      default:            return <Dashboard />;
    }
  };

  if (viewRoute === 'landing') {
    return <LandingPage onLogin={() => setViewRoute('auth')} onSignup={() => setViewRoute('auth')} />;
  }

  if (viewRoute === 'auth' || !isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div
      className="app-container"
      dir={rtl ? 'rtl' : 'ltr'}
      style={{ fontFamily: rtl ? "'Cairo', 'Public Sans', sans-serif" : "'Public Sans', sans-serif" }}
    >
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="main-wrapper">
        <Topbar onLogout={handleLogout} />

        <main className="content-area mobile-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {/* Page header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: rtl ? '0' : '-0.02em' }}>
                    {PAGE_LABELS[activeView]}
                  </h1>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                    {t('app.subtitle')}
                  </p>
                </div>

                {VIEWS_WITH_ACTIONS.includes(activeView) && (
                  <div className="flex items-center gap-3">
                    <button className="btn btn-outline" style={{ gap: 6 }}>
                      <SlidersHorizontal size={14} />
                      {t('action.filter')}
                    </button>
                    <button className="btn btn-primary" style={{ gap: 6 }}>
                      <Plus size={14} />
                      {t('action.new_entry')}
                    </button>
                  </div>
                )}
              </div>

              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
