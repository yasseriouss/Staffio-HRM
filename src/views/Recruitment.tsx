import React from 'react';
import { Briefcase, Users, Clock, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useLang } from '../context/LangContext';

const Recruitment: React.FC = () => {
  const { t } = useLang();

  const JOBS = [
    { roleKey: 'job.senior_fe',   applicants: 24, status: 'active',  postedKey: 'time.2d',  priorityKey: 'rec.high'   },
    { roleKey: 'job.ux_designer',      applicants: 12, status: 'active',  postedKey: 'time.4d',  priorityKey: 'rec.medium' },
    { roleKey: 'job.supply_chain',       applicants: 45, status: 'pending', postedKey: 'time.1w',  priorityKey: 'rec.low'    },
    { roleKey: 'job.data_analyst',               applicants:  8, status: 'active',  postedKey: 'time.2w', priorityKey: 'rec.medium' },
  ];

  const METRICS = [
    { labelKey: 'rec.pipeline',    value: 92, color: 'var(--color-success)' },
    { labelKey: 'rec.time_hire',  value: 65, color: 'var(--color-primary)' },
    { labelKey: 'rec.diversity',    value: 84, color: 'var(--color-gold)'    },
  ];

  const STAGES = [
    { stageKey: 'stage.applied',    count: 248, pct: 100 },
    { stageKey: 'stage.screening',  count: 142, pct: 57  },
    { stageKey: 'stage.interview',  count:  68, pct: 27  },
    { stageKey: 'stage.offer',      count:  24, pct: 10  },
    { stageKey: 'stage.hired',      count:  14, pct:  6  },
  ];

  const STATUS_V: Record<string, 'success' | 'warning' | 'error'> = {
    active: 'success', pending: 'warning', closed: 'error',
  };

  return (
    <div className="grid-3" style={{ gap: 20, alignItems: 'start' }}>
      {/* Job openings list */}
      <div className="col-span-2">
        <Card title={t('rec.open_pos')}>
          <div>
            {JOBS.map((job, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: i < JOBS.length - 1 ? '1px solid var(--surface-border)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Briefcase size={18} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{t(job.roleKey)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                        <Users size={11} /> {job.applicants} {t('rec.applicants')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                        <Clock size={11} /> {t(job.postedKey)}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                        background: job.priorityKey === 'rec.high' ? 'var(--color-error-light)' :
                                    job.priorityKey === 'rec.medium' ? 'var(--color-warning-light)' : 'var(--color-primary-100)',
                        color:      job.priorityKey === 'rec.high' ? 'var(--color-error)' :
                                    job.priorityKey === 'rec.medium' ? 'var(--color-warning)' : 'var(--color-primary)',
                      }}>
                        {t(job.priorityKey)}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Badge variant={STATUS_V[job.status]}>{t(`status.${job.status}`)}</Badge>
                  <button style={{ color: 'var(--text-faint)', padding: 4, borderRadius: 6, display: 'flex' }}>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Hiring funnel */}
        <div style={{ marginTop: 20 }}>
          <Card title={t('rec.funnel')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {STAGES.map(s => (
                <div key={s.stageKey}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(s.stageKey)}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.count}</span>
                  </div>
                  <ProgressBar value={s.pct} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card title={t('rec.metrics')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {METRICS.map(m => (
              <div key={m.labelKey}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(m.labelKey)}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}%</span>
                </div>
                <div style={{
                  height: 6, borderRadius: 99, background: 'var(--color-white-200)', overflow: 'hidden',
                }}>
                  <div style={{ height: '100%', width: `${m.value}%`, background: m.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('rec.ai_screen')}>
          <div style={{
            background: 'var(--color-primary-100)', borderRadius: 'var(--radius-md)',
            padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CheckCircle2 size={16} color="var(--color-primary)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>{t('status.active')}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-neutral-text)', lineHeight: 1.6 }}>
              {t('rec.ai_desc') || (t('lang') === 'ar' ? 'فحص الذكاء الاصطناعي مفعل لجميع الوظائف. تم فحص 84 مرشحاً في آخر 24 ساعة.' : 'AI screening is enabled for all open roles. 84 candidates processed in the last 24 hours.')}
            </p>
            <button className="btn btn-primary" style={{ marginTop: 14, width: '100%', height: 36, fontSize: 13 }}>
              {t('rec.view_report')}
            </button>
          </div>
        </Card>

        <Card title={t('rec.quick_stats')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { labelKey: 'rec.offers', value: '14', icon: TrendingUp },
              { labelKey: 'rec.interviews', value: '6' },
              { labelKey: 'rec.avg_salary', value: '$72,400' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--surface-border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(s.labelKey)}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Recruitment;
