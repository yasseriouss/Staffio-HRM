import React, { useState } from 'react';
import { Shield, Bell, RefreshCw, ChevronDown, Lock, Sun, Moon, User } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

const Toggle: React.FC<{ on: boolean; onToggle: () => void }> = ({ on, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      width: 44, height: 24,
      borderRadius: 99,
      background: on ? 'var(--color-primary)' : 'var(--color-white-200)',
      position: 'relative',
      transition: 'background 0.2s',
      flexShrink: 0,
      border: 'none', cursor: 'pointer',
    }}
  >
    <span style={{
      position: 'absolute',
      width: 18, height: 18,
      borderRadius: '50%',
      background: '#fff',
      top: 3,
      left: on ? 22 : 3,
      transition: 'left 0.2s',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    }} />
  </button>
);

const Row: React.FC<{ label: string; sub: string; children: React.ReactNode; isRtl: boolean }> = ({ label, sub, children, isRtl }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
    <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</p>
    </div>
    {children}
  </div>
);

const Settings: React.FC = () => {
  const { t, lang, setLang } = useLang();
  const [notifs, setNotifs] = useState({ hiring: true, payroll: true, security: false });
  const isRtl = lang === 'ar';

  return (
    <div className="grid-3" style={{ gap: 20, alignItems: 'start' }}>
      {/* Left (col-span-2) */}
      <div className="col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* General */}
        <Card title={t('set.general')}>
          {/* Language */}
          <div style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: 16, marginBottom: 0 }}>
            <Row label={t('set.lang')} sub={t('set.lang_sub')} isRtl={isRtl}>
              <div style={{ display: 'flex', gap: 8, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {(['en', 'ar'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={lang === l ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ height: 34, fontSize: 12, borderRadius: 'var(--radius-md)' }}
                  >
                    {l === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
            </Row>
          </div>

          {/* Data sync */}
          <div style={{ paddingTop: 16 }}>
            <Row label={t('set.sync')} sub={t('set.sync_sub')} isRtl={isRtl}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0 12px', height: 36, cursor: 'pointer',
                background: 'var(--surface-bg)',
                flexDirection: isRtl ? 'row-reverse' : 'row'
              }}>
                <RefreshCw size={13} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t('set.realtime')}</span>
                <ChevronDown size={13} color="var(--text-faint)" />
              </div>
            </Row>
          </div>
        </Card>

        {/* Security */}
        <Card title={t('set.security')}>
          <div>
            {[
              { labelKey: 'set.2fa', subKey: 'set.2fa_sub', icon: Lock, enabled: true },
              { labelKey: 'set.timeout', subKey: 'set.timeout_sub', icon: Shield, enabled: false },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-bg)',
                  marginBottom: i < 1 ? 10 : 0,
                  flexDirection: isRtl ? 'row-reverse' : 'row'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    background: item.enabled ? 'var(--color-success-light)' : 'var(--color-white-200)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <item.icon size={16} color={item.enabled ? 'var(--color-success)' : 'var(--text-muted)'} />
                  </div>
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t(item.labelKey)}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t(item.subKey)}</p>
                  </div>
                </div>
                <Badge variant={item.enabled ? 'success' : 'info'}>{item.enabled ? t('set.enabled') : t('set.disabled')}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card title={t('set.notif')}>
          <div>
            {([
              { key: 'hiring' as const,  labelKey: 'set.notif_hiring',  subKey: 'set.notif_hiring_sub', icon: User   },
              { key: 'payroll' as const, labelKey: 'set.notif_payroll', subKey: 'set.notif_payroll_sub', icon: RefreshCw },
              { key: 'security' as const,labelKey: 'set.notif_sec',     subKey: 'set.notif_sec_sub',     icon: Shield  },
            ]).map((n, i) => (
              <div
                key={n.key}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: i < 2 ? '1px solid var(--surface-border)' : 'none',
                  flexDirection: isRtl ? 'row-reverse' : 'row'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <n.icon size={16} color="var(--color-primary)" />
                  </div>
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t(n.labelKey)}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t(n.subKey)}</p>
                  </div>
                </div>
                <Toggle on={notifs[n.key]} onToggle={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* App info */}
        <Card title={t('set.info')}>
          {[
            { labelKey: 'set.version',  value: '2.4.0'      },
            { labelKey: 'set.env',      value: t('set.env_val') },
            { labelKey: 'set.uptime',   value: t('set.uptime_val') },
            { labelKey: 'set.updated',  value: t('set.updated_val') },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: i < 3 ? '1px solid var(--surface-border)' : 'none',
                flexDirection: isRtl ? 'row-reverse' : 'row'
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t(item.labelKey)}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
            </div>
          ))}
        </Card>

        {/* Permissions */}
        <Card title={t('set.perms')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { labelKey: 'set.hr_admin',   granted: true  },
              { labelKey: 'set.pay_access', granted: true  },
              { labelKey: 'set.sys_set',    granted: true  },
              { labelKey: 'set.audit_logs', granted: false },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(p.labelKey)}</span>
                <Badge variant={p.granted ? 'success' : 'error'}>{p.granted ? t('set.granted') : t('set.denied')}</Badge>
              </div>
            ))}
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: 16, height: 36, fontSize: 13 }}>
            {t('set.req_access')}
          </button>
        </Card>

        {/* Appearance */}
        <Card title={t('set.appear')}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, textAlign: isRtl ? 'right' : 'left' }}>{t('set.theme_pref')}</p>
          <div style={{ display: 'flex', gap: 8, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            <button className="btn btn-primary" style={{ flex: 1, height: 36, fontSize: 12, gap: 6 }}>
              <Sun size={13} /> {t('set.light')}
            </button>
            <button className="btn btn-outline" style={{ flex: 1, height: 36, fontSize: 12, gap: 6 }}>
              <Moon size={13} /> {t('set.dark')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
