import React, { useState } from 'react';
import { ChevronDown, Check, Star, ArrowRight, Clock, CreditCard, Target } from 'lucide-react';
import { useLang } from '../context/LangContext';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  const { t, rtl } = useLang();
  const [activeTab, setActiveTab] = useState<'hr' | 'employee'>('hr');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        background: 'rgba(10, 10, 26, 0.8)', backdropFilter: 'blur(12px)'
      }}>
        <div className="logo" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em' }}>
          Staff<span style={{ color: 'var(--color-primary-200)' }}>io</span>
        </div>
        <div className="nav-links desktop-only" style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600, color: '#e2e2fd' }}>
          <a href="#home" style={{ color: '#fff', borderBottom: '2px solid var(--color-primary-200)', paddingBottom: 4 }}>{t('landing.nav_home')}</a>
          <a href="#features">{t('landing.nav_features')}</a>
          <a href="#reviews">{t('landing.nav_reviews')}</a>
          <a href="#plans">{t('landing.nav_plans')}</a>
          <a href="#faqs">{t('landing.nav_faqs')}</a>
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onLogin} style={{ color: '#e2e2fd', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>{t('landing.nav_login')}</button>
          <button onClick={onSignup} style={{
            background: 'var(--color-primary-300)', color: '#fff',
            padding: '10px 24px', borderRadius: 99, fontWeight: 700, fontSize: 14,
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(112, 112, 243, 0.3)'
          }}>{t('landing.nav_signup')}</button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="hero" style={{
        textAlign: 'center', padding: '100px 20px',
        background: 'radial-gradient(circle at center, #1a1a3a 0%, #0a0a1a 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '60%', background: 'var(--color-primary)', opacity: 0.05,
          filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none'
        }} />
        
        <h1 style={{ 
          fontSize: 'clamp(42px, 7vw, 72px)', 
          fontWeight: 900, 
          lineHeight: 1.05, 
          marginBottom: 24, 
          maxWidth: 900, 
          margin: '0 auto 24px',
          letterSpacing: '-0.03em'
        }}>
          {t('landing.hero_title').split(' ').map((word, i) => 
            word === 'Clear' || word === 'Insights' || word === 'رؤى' || word === 'واضحة' ? 
            <span key={i} style={{ color: 'var(--color-primary-100)' }}>{word} </span> : word + ' '
          )}
        </h1>
        <p style={{ fontSize: 20, color: '#c6c6fa', maxWidth: 650, margin: '0 auto 48px', lineHeight: 1.6, opacity: 0.9 }}>
          {t('landing.hero_sub')}
        </p>
        <button onClick={onSignup} style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-300) 100%)', 
          color: '#fff',
          padding: '20px 48px', borderRadius: 99, fontWeight: 800, fontSize: 18,
          border: 'none', cursor: 'pointer',
          boxShadow: '0 12px 32px rgba(112, 112, 243, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {t('landing.cta_signup')}
        </button>

        {/* Dashboard Preview */}
        <div style={{ marginTop: 80, display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
          <div style={{
            width: '95%', maxWidth: 1100, height: 600,
            background: '#121212', borderRadius: '32px 32px 0 0',
            boxShadow: '0 -40px 100px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none',
            overflow: 'hidden',
            transform: 'rotateX(10deg)',
            transformOrigin: 'top center'
          }}>
            {/* Mock UI */}
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ width: 200, background: '#0a0a0a', borderRight: '1px solid #222', padding: 20 }}>
                 <div style={{ height: 20, width: '80%', background: '#222', borderRadius: 4, marginBottom: 20 }} />
                 {[1,2,3,4,5].map(i => <div key={i} style={{ height: 32, background: i === 1 ? 'var(--color-primary-300)' : '#1a1a1a', borderRadius: 8, marginBottom: 12, opacity: i === 1 ? 1 : 0.4 }} />)}
              </div>
              <div style={{ flex: 1, padding: 32, textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                   <div style={{ height: 24, width: 200, background: '#222', borderRadius: 4 }} />
                   <div style={{ height: 24, width: 100, background: '#222', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
                   {[1,2,3].map(i => <div key={i} style={{ height: 120, background: '#1a1a1a', borderRadius: 16, border: '1px solid #222' }} />)}
                </div>
                <div style={{ height: 240, background: '#1a1a1a', borderRadius: 16, border: '1px solid #222' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" style={{ background: '#fff', color: '#0a0a1a', padding: '120px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 80, letterSpacing: '-0.02em' }}>What Is Staffio?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48, maxWidth: 1200, margin: '0 auto' }}>
          {[
            { title: t('landing.feature_1'), desc: 'Real-time monitoring with geofencing and biometric integration.', icon: <Clock size={40} /> },
            { title: t('landing.feature_2'), desc: 'Automated tax calculations and direct deposits in one click.', icon: <CreditCard size={40} /> },
            { title: t('landing.feature_3'), desc: 'Data-driven OKRs and continuous feedback loops for growth.', icon: <Target size={40} /> }
          ].map((f, i) => (
            <div key={i} style={{ flex: '1 1 300px', padding: 40, background: '#f8f9fc', borderRadius: 24, textAlign: 'left' }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, color: '#fff', boxShadow: '0 8px 20px rgba(112,112,243,0.2)' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, color: 'var(--color-primary)' }}>{f.title}</h3>
              <p style={{ color: '#475467', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Partners Placeholder */}
        <div style={{ marginTop: 80, opacity: 0.5, fontSize: 14, fontWeight: 600 }}>
          [ Partner Logos Asset Here ]
        </div>

        {/* Tabs Section */}
        <div style={{ marginTop: 100 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 40 }}>See What Staffio Can Do</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, borderBottom: '1px solid var(--surface-border)', maxWidth: 600, margin: '0 auto 40px' }}>
            <button 
              onClick={() => setActiveTab('hr')}
              style={{ padding: '16px 32px', borderBottom: activeTab === 'hr' ? '3px solid var(--color-primary)' : '3px solid transparent', fontWeight: 600, color: activeTab === 'hr' ? 'var(--color-primary)' : 'var(--text-muted)' }}>
              HR Manager
            </button>
            <button 
              onClick={() => setActiveTab('employee')}
              style={{ padding: '16px 32px', borderBottom: activeTab === 'employee' ? '3px solid var(--color-primary)' : '3px solid transparent', fontWeight: 600, color: activeTab === 'employee' ? 'var(--color-primary)' : 'var(--text-muted)' }}>
              Employee
            </button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['A Dashboard That Puts Everything in Sight', 'Employee Management Made Effortless', 'Recruitment That Speeds Up Hiring', 'Attendance Tracking You Can Trust', 'Payroll Made Simple and Accurate'].map((item, i) => (
                <div key={i} style={{ padding: 20, border: '1px solid var(--surface-border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: i === 2 ? '#fff' : '#fafafa', boxShadow: i === 2 ? '0 4px 20px rgba(0,0,0,0.05)' : 'none', color: i === 2 ? 'var(--color-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>
                  {item}
                  {i === 2 ? <ArrowRight size={20} /> : <ChevronDown size={20} />}
                </div>
              ))}
            </div>
            <div style={{ flex: '2 1 400px', background: 'var(--surface-bg)', borderRadius: 24, padding: 40, border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              [ Tab Content UI Mockup Asset Here ]
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="reviews" style={{ padding: '100px 20px', background: '#f9f9f9', color: '#121212', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 60 }}>What Customers Say</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ flex: '1 1 350px', background: '#fff', padding: 40, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                The HR dashboard is user-friendly and intuitive, making navigation easy. It saves me so much time every day by putting all the HR tools I need in one clean place.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary-100)' }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Ahmed Maher</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Google</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                  4.8 <Star size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="plans" style={{ padding: '100px 20px', background: '#0a0a1a', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>{t('landing.pricing_title')}</h2>
        <p style={{ fontSize: 18, color: '#98a1b2', maxWidth: 700, margin: '0 auto 60px', opacity: 0.8 }}>
          {t('landing.pricing_sub')}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
          {[
            { title: 'Basic', price: '$19', features: ['Employee Database', 'Leave & Attendance', 'Basic Payroll', 'Self-Service'], button: 'Get Started' },
            { title: 'Standard', price: '$49', features: ['Advanced Payroll', 'Performance Tracking', 'Workflow Automation', 'Reports'], button: 'Try Standard', highlight: true },
            { title: 'Enterprise', price: 'Custom', features: ['AI Recruitment', 'Multi-Entity Support', 'API Access', '24/7 Support'], button: 'Contact Sales' }
          ].map((p, i) => (
            <div key={i} style={{ 
              flex: '1 1 320px', 
              background: p.highlight ? 'linear-gradient(145deg, #1a1a3a 0%, #0a0a1a 100%)' : '#111122', 
              color: '#fff', 
              borderRadius: 32, 
              padding: 48, 
              border: p.highlight ? '2px solid var(--color-primary-300)' : '1px solid rgba(255,255,255,0.05)',
              boxShadow: p.highlight ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
              transform: p.highlight ? 'scale(1.05)' : 'none',
              zIndex: p.highlight ? 10 : 1
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: p.highlight ? 'var(--color-primary-100)' : '#fff' }}>{p.title}</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: 32 }}>{p.price}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#c6c6fa' }}>
                    <Check size={18} color="var(--color-primary-200)" />
                    {f}
                  </div>
                ))}
              </div>
              <button style={{ 
                width: '100%', padding: '16px', borderRadius: 99, 
                background: p.highlight ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)', 
                color: '#fff', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer'
              }}>
                {p.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" style={{ padding: '100px 20px', background: '#fff', color: '#121212', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 60 }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { q: 'What can I do with this HR system?', a: 'You can manage employees, track attendance, handle payroll, post jobs, and send company announcements all from one place.' },
            { q: 'Can I customize the system for my company\'s needs?', a: 'Yes, our platform is highly customizable.' },
            { q: 'Is the system easy to use for non-technical users?', a: 'Absolutely, it was designed with simplicity in mind.' },
            { q: 'Is the payroll automatically calculated?', a: 'Yes, automated payroll processing is included in standard and higher plans.' }
          ].map((faq, i) => (
            <div key={i} style={{ border: '1px solid var(--surface-border)', borderRadius: 16, overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: openFaq === i ? '#f9f9f9' : '#fff', fontWeight: 600, color: openFaq === i ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                {faq.q}
                <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 24px', background: '#f9f9f9', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#1d2939', color: '#98a1b2', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 40, marginBottom: 40 }}>
          <div style={{ flex: '1 1 300px' }}>
            <div className="logo" style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 20 }}>
              Staff<span style={{ color: 'var(--color-primary-200)' }}>io</span>
            </div>
            <p style={{ marginBottom: 24 }}>Contact With Us to Know More About Our Staffio System</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" placeholder="Enter Your Email" style={{ padding: '12px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%', maxWidth: 200 }} />
              <button style={{ padding: '12px 24px', borderRadius: 8, background: 'var(--color-primary-300)', color: '#fff', fontWeight: 600 }}>Send</button>
            </div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 20 }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#features">Features</a><a href="#reviews">Reviews</a><a href="#plans">Plans</a>
            </div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 20 }}>Support</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#">Account Information</a><a href="#">Help Center</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, fontSize: 13 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Privacy Policy</a><a href="#">Terms of service</a>
          </div>
          <div>© 2026 Staffio, Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
