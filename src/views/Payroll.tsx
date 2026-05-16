import React from 'react';
import { Download, ShieldCheck, TrendingUp, DollarSign, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

const BATCHES = [
  { id: 'PAY-2026-05', period: 'May 1 – May 31, 2026',   employees: 1284, gross: '$420,000', net: '$310,000', status: 'pending'  },
  { id: 'PAY-2026-04', period: 'Apr 1 – Apr 30, 2026',   employees: 1272, gross: '$415,000', net: '$305,000', status: 'active'   },
  { id: 'PAY-2026-03', period: 'Mar 1 – Mar 31, 2026',   employees: 1260, gross: '$410,000', net: '$302,000', status: 'active'   },
  { id: 'PAY-2026-02', period: 'Feb 1 – Feb 28, 2026',   employees: 1255, gross: '$408,000', net: '$299,500', status: 'active'   },
];

const STATUS_V: Record<string, 'success' | 'warning'> = { active: 'success', pending: 'warning' };

const Payroll: React.FC = () => {
  const { t, lang } = useLang();

  const STATUS_L: Record<string, string> = { 
    active: t('status.disbursed'), 
    pending: t('status.pending') 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary cards */}
      <div className="grid-4">
        {[
          { labelKey: 'pay.monthly',    value: '$842,500', subKey: 'pay.vs_month', icon: DollarSign, color: 'var(--color-primary)'  },
          { labelKey: 'pay.tax',        value: '$124,800', subKey: 'pay.due_72h',  icon: TrendingUp, color: 'var(--color-warning)' },
          { labelKey: 'pay.bonus',      value: '$42,000',  subKey: 'pay.q2_alloc', icon: Users,      color: 'var(--color-success)'  },
          { labelKey: 'pay.compliance', value: '100%',     subKey: 'pay.audits_pass', icon: ShieldCheck,color: 'var(--color-success)'  },
        ].map(m => (
          <Card key={m.labelKey} title={t(m.labelKey)}>
            <p style={{ fontSize: 30, fontWeight: 700, color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {m.value}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{t(m.subKey)}</p>
          </Card>
        ))}
      </div>

      {/* Payroll table */}
      <Card title={t('pay.title')}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                {[
                  { labelKey: 'pay.batch_id' },
                  { labelKey: 'pay.period' },
                  { labelKey: 'pay.employees' },
                  { labelKey: 'pay.gross' },
                  { labelKey: 'pay.net' },
                  { labelKey: 'emp.col_status' },
                  { labelKey: '' },
                ].map((h, idx) => (
                  <th
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.05em', color: 'var(--text-muted)',
                    }}
                  >
                    {h.labelKey ? t(h.labelKey) : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BATCHES.map((b, i) => (
                <tr
                  key={b.id}
                  style={{ borderBottom: i < BATCHES.length - 1 ? '1px solid var(--surface-border)' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>{b.id}</span>
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 13, color: 'var(--text-secondary)' }}>{b.period}</td>
                  <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {b.employees.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 13, color: 'var(--text-secondary)' }}>{b.gross}</td>
                  <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{b.net}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <Badge variant={STATUS_V[b.status]}>{STATUS_L[b.status]}</Badge>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button
                      title={t('action.export')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: 12, color: 'var(--text-muted)',
                        padding: '5px 10px', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--surface-border)',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = 'var(--color-primary)'; el.style.borderColor = 'var(--color-primary)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--surface-border)'; }}
                    >
                      <Download size={13} /> {t('action.export')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--surface-border)',
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {t('pay.showing')} <strong style={{ color: 'var(--text-primary)' }}>4</strong> {t('pay.of')} <strong style={{ color: 'var(--text-primary)' }}>12</strong> {t('pay.cycles')}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" style={{ height: 34, fontSize: 12 }}>{t('pay.prev')}</button>
            <button className="btn btn-primary" style={{ height: 34, fontSize: 12 }}>{t('pay.next')} {lang === 'en' ? '→' : '←'}</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payroll;
