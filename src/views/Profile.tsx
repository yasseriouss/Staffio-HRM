import React, { useState } from 'react';
import {
  Camera, Mail, Phone, MapPin, Calendar,
  Shield, Edit3, Clock, CheckCircle2,
  Laptop, CreditCard as CardIcon, Smartphone
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useLang } from '../context/LangContext';

const ACTIVITY_LOGS = [
  { event: 'event.session',      node: 'sys.chrome',   time: '14:25',         ok: true  },
  { event: 'event.updated',      node: 'sys.system',   time: '10:42',         ok: true  },
  { event: 'event.failed',       node: 'sys.unknown',  time: 'time.yesterday',ok: false },
  { event: 'event.sync',         node: 'sys.iphone',   time: 'time.2d',       ok: true  },
];

const SKILLS = [
  { name: 'skill.mgmt',          level: 95 },
  { name: 'skill.talent',        level: 88 },
  { name: 'skill.payroll',       level: 78 },
  { name: 'skill.law',           level: 82 },
  { name: 'skill.data',          level: 65 },
];

const DEVICES = [
  { icon: Laptop,     label: 'device.macbook', sub: 'device.primary'  },
  { icon: Smartphone, label: 'device.iphone',   sub: 'device.mobile'   },
  { icon: CardIcon,   label: 'device.card',     sub: 'device.card_id'  },
];

const Profile: React.FC = () => {
  const { t, rtl } = useLang();
  const [editing, setEditing] = useState(false);

  const STATS = [
    { label: t('profile.performance'), value: '96%',   color: 'var(--color-success)'  },
    { label: t('profile.attendance'),  value: '98%',   color: 'var(--color-primary)'  },
    { label: t('profile.tasks'),       value: '142',   color: 'var(--color-gold)'     },
    { label: t('profile.clearance'),   value: 'L-5',   color: 'var(--color-error)'    },
  ];

  const INFO = [
    { icon: Mail,     label: t('profile.email'),    value: 'john.doe@staffio.io'  },
    { icon: Phone,    label: t('profile.phone'),    value: '+966 50 000 1234'     },
    { icon: MapPin,   label: t('profile.location'), value: t('profile.loc_val')   },
    { icon: Calendar, label: t('profile.joined'),   value: t('profile.join_val')  },
    { icon: Shield,   label: t('profile.dept'),     value: t('profile.dept_hr')   },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, alignItems: 'start' }}>
      {/* ── Left column: Identity Card ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: 8 }}>
            {/* Avatar */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, fontWeight: 700, color: '#fff',
                border: '4px solid var(--color-primary-200)',
                boxShadow: '0 0 0 4px var(--color-primary-100)',
              }}>
                JD
              </div>
              <button style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--surface-card)',
                border: '2px solid var(--surface-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}>
                <Camera size={12} color="var(--text-muted)" />
              </button>
            </div>

            {/* Name & Role */}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              {rtl ? 'جون دو' : 'John Doe'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600, marginTop: 4 }}>
              {t('profile.role')}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {t('profile.dept_hr')}
            </p>

            {/* Status badge */}
            <div style={{ marginTop: 10 }}>
              <Badge variant="success">{t('status.active')}</Badge>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: 'var(--surface-border)', margin: '20px 0' }} />

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  padding: '12px 8px', borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-bg)',
                  border: '1px solid var(--surface-border)',
                }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Edit button */}
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 16, gap: 8 }}
              onClick={() => setEditing(!editing)}
            >
              <Edit3 size={14} />
              {t('action.edit')}
            </button>
          </div>
        </Card>

        {/* Devices */}
        <Card title={t('profile.devices')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DEVICES.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <d.icon size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t(d.label)}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t(d.sub)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Right column ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Personal Information (editable) */}
        <Card title={t('profile.info')}>
          {editing ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: t('profile.email'),    defaultValue: 'john.doe@staffio.io'    },
                { label: t('profile.phone'),    defaultValue: '+966 50 000 1234'       },
                { label: t('profile.location'), defaultValue: t('profile.loc_val')     },
                { label: t('profile.dept'),     defaultValue: t('profile.dept_hr')      },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {f.label}
                  </label>
                  <input
                    defaultValue={f.defaultValue}
                    className="input"
                    style={{ marginTop: 6 }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                <button className="btn btn-outline" style={{ height: 36, fontSize: 13 }} onClick={() => setEditing(false)}>
                  {t('action.cancel')}
                </button>
                <button className="btn btn-primary" style={{ height: 36, fontSize: 13 }} onClick={() => setEditing(false)}>
                  {t('action.save')}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {INFO.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 0',
                  borderBottom: i < INFO.length - 1 ? '1px solid var(--surface-border)' : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-bg)',
                    border: '1px solid var(--surface-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={15} color="var(--text-muted)" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 1 }}>{item.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Skills */}
        <Card title={t('profile.skills')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SKILLS.map(s => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {t(s.name)}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>
                    {s.level}%
                  </span>
                </div>
                <ProgressBar value={s.level} />
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Log */}
        <Card title={t('profile.activity')}>
          <div>
            {ACTIVITY_LOGS.map((log, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 0',
                borderBottom: i < ACTIVITY_LOGS.length - 1 ? '1px solid var(--surface-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 'var(--radius-md)',
                    background: log.ok ? 'var(--color-success-light)' : 'var(--color-error-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {log.ok
                      ? <CheckCircle2 size={15} color="var(--color-success)" />
                      : <Shield size={15} color="var(--color-error)" />
                    }
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {t(log.event)}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{t(log.node)}</p>
                  </div>
                </div>
                <div style={{ textAlign: rtl ? 'left' : 'right' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} /> {t(log.time).includes('.') ? t(log.time) : log.time}
                  </span>
                  <Badge variant={log.ok ? 'success' : 'error'} style={{ marginTop: 4 }}>
                    {log.ok ? t('status.success') : t('status.failure')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
