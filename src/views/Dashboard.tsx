import { useLang } from '../context/LangContext';

const Dashboard: React.FC = () => {
  const { t, lang } = useLang();

  const METRICS = [
    { titleKey: 'dash.total_emp',    value: '1,284', icon: TrendingUp, badge: '+12%',      badgeVariant: 'success' as const, subKey: 'dash.vs_month' },
    { titleKey: 'dash.open_pos',     value: '42',    icon: Briefcase,  badge: '8',           badgeVariant: 'warning' as const, subKey: 'dash.critical' },
    { titleKey: 'dash.efficiency',    value: '94.2%', icon: Zap,        progress: 94.2,     progressVariant: 'luxury' as const },
    { titleKey: 'dash.system_load',        value: '28%',   icon: Server,     progress: 28,       progressVariant: 'primary' as const },
  ];

  const PERSONNEL = [
    { id: 'ST-9901', name: 'Alex Morrison',   roleKey: 'stage.screening',   time: 'time.2m',  status: 'success' as const },
    { id: 'ST-9902', name: 'Sara El Amine',   roleKey: 'profile.tasks',      time: 'time.9m',  status: 'warning' as const },
    { id: 'ST-9903', name: 'James Liu',       roleKey: 'rec.ai_screen',      time: 'time.15m', status: 'info' as const },
    { id: 'ST-9904', name: 'Laila Mansour',   roleKey: 'profile.clearance',  time: 'time.22m', status: 'success' as const },
    { id: 'ST-9905', name: 'Omar Khalid',     roleKey: 'profile.attendance', time: 'time.30m', status: 'info' as const },
  ];

  const NODES = [
    { labelKey: 'dash.node_db',   statusKey: 'dash.node_healthy',  variant: 'success' as const },
    { labelKey: 'dash.node_api',  statusKey: 'dash.node_online',   variant: 'success' as const },
    { labelKey: 'dash.node_auth', statusKey: 'dash.node_secured',  variant: 'info'    as const },
  ];

  const initials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <>
      {/* Metric cards */}
      <div className="grid-4 mb-8">
        {METRICS.map((m) => (
          <Card key={m.titleKey} title={t(m.titleKey)}>
            <p className="card-value">{m.value}</p>

            {m.badge && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={m.badgeVariant!}>{m.badge} {t(m.subKey!)}</Badge>
              </div>
            )}

            {m.progress !== undefined && (
              <div className="mt-4">
                <ProgressBar value={m.progress} variant={m.progressVariant} />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid-3">
        {/* Personnel stream */}
        <Card title={t('dash.recent')} className="col-span-2">
          <div>
            {PERSONNEL.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between"
                style={{
                  padding: '14px 0',
                  borderBottom: i < PERSONNEL.length - 1 ? '1px solid var(--surface-border)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar initials={initials(p.name)} size={38} />
                  <div>
                    <p className="text-14 font-600 text-primary">{p.name}</p>
                    <p className="text-12 text-muted" style={{ marginTop: 2 }}>{t(p.roleKey)} · <span style={{ color: 'var(--text-faint)' }}>{p.id}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-11 text-faint">{t(p.time)}</span>
                  <Badge variant={p.status}>{p.status === 'success' ? t('dash.verified') : t('dash.in_progress')}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-4">
          {/* Activity bar chart */}
          <Card title={t('dash.activity')}>
            <div className="flex items-end gap-1" style={{ height: 64, marginBottom: 12 }}>
              {[55, 80, 45, 95, 60, 75, 40].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 3 ? 'var(--color-primary)' : 'var(--color-primary-100)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {['day.m','day.t','day.w','day.th','day.f','day.s','day.su'].map((d, i) => (
                <span key={i} className="text-10 text-faint" style={{ flex: 1, textAlign: 'center' }}>{t(d)}</span>
              ))}
            </div>
          </Card>

          {/* Node status */}
          <Card title={t('dash.sys_status')}>
            <div>
              {NODES.map((n, i) => (
                <div
                  key={n.labelKey}
                  className="flex items-center justify-between"
                  style={{
                    padding: '10px 0',
                    borderBottom: i < NODES.length - 1 ? '1px solid var(--surface-border)' : 'none',
                  }}
                >
                  <span className="text-13 text-secondary">{t(n.labelKey)}</span>
                  <Badge variant={n.variant}>{t(n.statusKey)}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
