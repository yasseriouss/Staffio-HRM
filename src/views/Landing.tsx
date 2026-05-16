import React, { useState } from 'react';
import { ArrowRight, Clock, CreditCard, Target, LayoutDashboard } from 'lucide-react';
import { useLang } from '../context/LangContext';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  const { t, rtl } = useLang();
  const [activeTab, setActiveTab] = useState<'hr' | 'employee'>('hr');

  return (
    <div className="landing-page" dir={rtl ? 'rtl' : 'ltr'} style={{
      fontFamily: rtl ? "'Cairo', 'Public Sans', sans-serif" : "'Public Sans', sans-serif",
      backgroundColor: '#0a0a1a',
      color: '#fff',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* ── Navbar ── */}
      <nav className="landing-nav" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 5%', maxWidth: 1400, margin: '0 auto',
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(10, 10, 26, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="logo" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em' }}>
          Staff<span style={{ color: 'var(--color-primary-200)' }}>io</span>
        </div>
        <div className="nav-links desktop-only" style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 600, color: '#98a1b2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <a href="#home" style={{ color: '#fff' }}>{t('landing.nav_home')}</a>
          <a href="#features" style={{ transition: 'color 0.2s' }}>{t('landing.nav_features')}</a>
          <a href="#reviews">{t('landing.nav_reviews')}</a>
          <a href="#plans">{t('landing.nav_plans')}</a>
          <a href="#faqs">{t('landing.nav_faqs')}</a>
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onLogin} style={{ color: '#fff', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>{t('landing.nav_login')}</button>
          <button onClick={onSignup} style={{
            background: 'var(--color-primary)', color: '#fff',
            padding: '12px 24px', borderRadius: 0, fontWeight: 800, fontSize: 13,
            border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
            boxShadow: '4px 4px 0 var(--color-primary-300)'
          }}>{t('landing.nav_signup')}</button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="hero" style={{
        textAlign: 'center', padding: '120px 20px',
        background: 'linear-gradient(to bottom, #0a0a1a, #111122)',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, 
            background: 'rgba(112, 112, 243, 0.1)', border: '1px solid var(--color-primary-200)',
            padding: '6px 16px', marginBottom: 32, fontSize: 12, fontWeight: 700, color: 'var(--color-primary-100)',
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>
            <span style={{ width: 6, height: 6, background: 'var(--color-primary)', borderRadius: '50%' }} />
            New Version 2.4 Available
          </div>

          <h1 style={{ 
            fontSize: 'clamp(48px, 8vw, 84px)', 
            fontWeight: 900, 
            lineHeight: 0.95, 
            marginBottom: 32, 
            maxWidth: 1000, 
            margin: '0 auto 32px',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}>
            {t('landing.hero_title').split(' ').map((word, i) => 
              word === 'Clear' || word === 'Insights' || word === 'رؤى' || word === 'واضحة' ? 
              <span key={i} style={{ color: 'var(--color-primary-200)', WebkitTextStroke: '1px var(--color-primary)' }}>{word} </span> : word + ' '
            )}
          </h1>
          <p style={{ fontSize: 18, color: '#98a1b2', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}>
            {t('landing.hero_sub')}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <button onClick={onSignup} style={{
              background: 'var(--color-primary)', 
              color: '#fff',
              padding: '20px 40px', borderRadius: 0, fontWeight: 900, fontSize: 16,
              border: 'none', cursor: 'pointer',
              boxShadow: '6px 6px 0 #1a1a3a',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              {t('landing.cta_signup')}
            </button>
            <button onClick={onLogin} style={{
              background: 'rgba(255,255,255,0.05)', 
              color: '#fff',
              padding: '20px 40px', borderRadius: 0, fontWeight: 900, fontSize: 16,
              border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <LayoutDashboard size={20} />
              Try System
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div style={{ marginTop: 100, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 1200, height: 600,
            background: '#05050a', borderRadius: 0,
            boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            position: 'relative'
          }}>
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: '#111', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
             </div>
            <div style={{ display: 'flex', height: 'calc(100% - 40px)', marginTop: 40 }}>
              <div style={{ width: 220, background: '#0a0a0a', borderRight: '1px solid #1a1a1a', padding: 24 }}>
                 <div style={{ height: 2, width: '40%', background: 'var(--color-primary)', marginBottom: 32 }} />
                 {[1,2,3,4,5,6].map(i => <div key={i} style={{ height: 12, background: i === 1 ? 'var(--color-primary)' : '#1a1a1a', marginBottom: 24, opacity: i === 1 ? 1 : 0.3 }} />)}
              </div>
              <div style={{ flex: 1, padding: 48, textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 60 }}>
                   <div style={{ height: 40, width: 300, background: '#111', border: '1px solid #222' }} />
                   <div style={{ height: 40, width: 40, background: 'var(--color-primary-100)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginBottom: 60 }}>
                   {[1,2,3].map(i => <div key={i} style={{ height: 140, background: '#0a0a0a', border: '1px solid #1a1a1a', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: i === 1 ? 'var(--color-primary)' : '#222' }} />
                   </div>)}
                </div>
                <div style={{ height: 260, background: '#0a0a0a', border: '1px solid #1a1a1a' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" style={{ background: '#fff', color: '#0a0a1a', padding: '140px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 80, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>Precision Engineering</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 1 }}>
            {[
              { title: t('landing.feature_1'), desc: 'Industrial-grade tracking with sub-second accuracy and geofencing.', icon: <Clock size={32} /> },
              { title: t('landing.feature_2'), desc: 'Automated high-volume payroll with multi-currency support.', icon: <CreditCard size={32} /> },
              { title: t('landing.feature_3'), desc: 'Systemic performance analysis via unified OKR frameworks.', icon: <Target size={32} /> }
            ].map((f, i) => (
              <div key={i} style={{ padding: 60, background: '#fff', border: '1px solid #f0f0f0', textAlign: 'left', transition: 'background 0.3s' }}>
                <div style={{ color: 'var(--color-primary)', marginBottom: 32 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{f.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 16 }}>{f.desc}</p>
                <div style={{ marginTop: 32, width: 40, height: 2, background: 'var(--color-primary)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{ marginTop: 140 }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 60, textTransform: 'uppercase' }}>System Modules</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, borderBottom: '2px solid #f0f0f0', maxWidth: 800, margin: '0 auto 60px' }}>
            <button 
              onClick={() => setActiveTab('hr')}
              style={{ padding: '24px 40px', borderBottom: activeTab === 'hr' ? '4px solid var(--color-primary)' : '4px solid transparent', fontWeight: 900, color: activeTab === 'hr' ? 'var(--color-primary)' : '#999', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.1em' }}>
              HR Administration
            </button>
            <button 
              onClick={() => setActiveTab('employee')}
              style={{ padding: '24px 40px', borderBottom: activeTab === 'employee' ? '4px solid var(--color-primary)' : '4px solid transparent', fontWeight: 900, color: activeTab === 'employee' ? 'var(--color-primary)' : '#999', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.1em' }}>
              Employee Portal
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 40, maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Real-time Operational Dashboard', 'Secure Personnel Records', 'Strategic Talent Acquisition', 'Enterprise Attendance Matrix', 'Compliant Payroll Processing'].map((item, i) => (
                <div key={i} style={{ 
                  padding: '24px 32px', 
                  border: i === 0 ? '1px solid var(--color-primary)' : '1px solid #f0f0f0', 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  background: i === 0 ? 'var(--color-primary-100)' : '#fff', 
                  color: i === 0 ? 'var(--color-primary)' : '#666', 
                  fontWeight: 800, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em'
                }}>
                  {item}
                  <ArrowRight size={16} opacity={i === 0 ? 1 : 0.3} />
                </div>
              ))}
            </div>
            <div style={{ background: '#f8f9fc', border: '1px solid #f0f0f0', padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
               Structural Interface Preview
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="plans" style={{ padding: '140px 20px', background: '#000', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 24, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>{t('landing.pricing_title')}</h2>
        <p style={{ fontSize: 18, color: '#666', maxWidth: 700, margin: '0 auto 80px', fontWeight: 500 }}>
          {t('landing.pricing_sub')}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0, maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
          {[
            { title: 'Base', price: '$19', features: ['Employee Database', 'Leave & Attendance', 'Basic Payroll', 'Self-Service'], button: 'Initialize' },
            { title: 'Advanced', price: '$49', features: ['Advanced Payroll', 'Performance Tracking', 'Workflow Automation', 'Reports'], button: 'Upgrade Now', highlight: true },
            { title: 'Enterprise', price: 'Contact', features: ['AI Recruitment', 'Multi-Entity Support', 'API Access', '24/7 Support'], button: 'Consultation' }
          ].map((p, i) => (
            <div key={i} style={{ 
              flex: '1 1 350px', 
              background: p.highlight ? '#111' : '#000', 
              color: '#fff', 
              padding: 60, 
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative'
            }}>
              {p.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--color-primary)' }} />}
              <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 12, color: p.highlight ? 'var(--color-primary)' : '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.title}</div>
              <div style={{ fontSize: 64, fontWeight: 900, color: '#fff', marginBottom: 40, letterSpacing: '-0.05em' }}>{p.price}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#999', fontWeight: 600 }}>
                    <div style={{ width: 4, height: 4, background: 'var(--color-primary)' }} />
                    {f}
                  </div>
                ))}
              </div>
              <button style={{ 
                width: '100%', padding: '20px', 
                background: p.highlight ? 'var(--color-primary)' : 'transparent', 
                color: '#fff', fontWeight: 900, fontSize: 14, border: p.highlight ? 'none' : '1px solid #333', cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.1em'
              }}>
                {p.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#050505', color: '#444', padding: '100px 20px 60px', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 80, paddingBottom: 80, marginBottom: 60 }}>
          <div>
            <div className="logo" style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 32, letterSpacing: '-0.05em' }}>
              STAFFIO
            </div>
            <p style={{ marginBottom: 40, lineHeight: 1.6, fontSize: 15 }}>Next-generation Human Capital Management system built for high-performance organizations.</p>
            <div style={{ display: 'flex', gap: 1 }}>
              <input type="email" placeholder="ENTER EMAIL" style={{ padding: '16px 24px', background: '#111', border: '1px solid #222', color: '#fff', width: '100%', fontSize: 12, fontWeight: 700 }} />
              <button style={{ padding: '16px 32px', background: 'var(--color-primary)', color: '#fff', fontWeight: 900, border: 'none', cursor: 'pointer', fontSize: 12 }}>SUBMIT</button>
            </div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 900, marginBottom: 32, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, fontWeight: 600 }}>
              <a href="#features">Features</a><a href="#reviews">Reviews</a><a href="#plans">Plans</a>
            </div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 900, marginBottom: 32, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Support</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, fontWeight: 600 }}>
              <a href="#">Information</a><a href="#">Help Center</a><a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>
          <div>© 2026 STAFFIO SYSTEM OPS. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: 40 }}>
            <a href="#">PRIVACY</a><a href="#">SECURITY</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
