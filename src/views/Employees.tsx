import React, { useState } from 'react';
import {
  Search, Download, MoreVertical, UserCheck,
  ChevronDown, Mail
} from 'lucide-react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

/* ── Types ── */
type Status = 'active' | 'pending' | 'inactive';

interface Employee {
  id: string;
  name: string;
  email: string;
  roleKey: string;
  deptKey: string;
  status: Status;
  performance: number;
  joinDate: string;
}

/* ── Stat Card ── */
interface StatProps { label: string; value: string; sub: string; accent?: string }
const Stat: React.FC<StatProps> = ({ label, value, sub, accent }) => (
  <Card>
    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{label}</p>
    <p style={{ fontSize: 32, fontWeight: 700, color: accent ?? 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{sub}</p>
  </Card>
);

/* ── Main View ── */
const Employees: React.FC = () => {
  const { t, lang } = useLang();
  const [search, setSearch]   = useState('');
  const [deptKey, setDeptKey] = useState('dept.all');
  const [sortCol, setSortCol] = useState<keyof Employee>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const EMPLOYEES: Employee[] = [
    { id: 'ST-001', name: 'Marcus Aurelius',    email: 'marcus@staffio.io',    roleKey: 'role.senior_eng',   deptKey: 'dept.eng',    status: 'active',   performance: 98, joinDate: 'Jan 2022' },
    { id: 'ST-002', name: 'Sara El Amine',      email: 'sara@staffio.io',      roleKey: 'role.ux_lead',      deptKey: 'dept.design', status: 'active',   performance: 91, joinDate: 'Mar 2022' },
    { id: 'ST-003', name: 'James Liu',          email: 'james@staffio.io',     roleKey: 'role.proc_eng',     deptKey: 'dept.ops',    status: 'pending',  performance: 75, joinDate: 'Jul 2022' },
    { id: 'ST-004', name: 'Laila Mansour',      email: 'laila@staffio.io',     roleKey: 'role.fin_analyst',  deptKey: 'dept.fin',    status: 'active',   performance: 95, joinDate: 'Sep 2022' },
    { id: 'ST-005', name: 'Omar Khalid',        email: 'omar@staffio.io',      roleKey: 'role.hr_spec',      deptKey: 'dept.hr',     status: 'active',   performance: 88, joinDate: 'Nov 2022' },
    { id: 'ST-006', name: 'Yuna Tanaka',        email: 'yuna@staffio.io',      roleKey: 'role.acc_exec',     deptKey: 'dept.sales',  status: 'inactive', performance: 62, joinDate: 'Feb 2023' },
    { id: 'ST-007', name: 'Amir Hassan',        email: 'amir@staffio.io',      roleKey: 'role.be_dev',       deptKey: 'dept.eng',    status: 'active',   performance: 93, joinDate: 'Apr 2023' },
    { id: 'ST-008', name: 'Fatima Al-Zahra',   email: 'fatima@staffio.io',    roleKey: 'role.prod_design',  deptKey: 'dept.design', status: 'pending',  performance: 80, joinDate: 'Jun 2023' },
  ];

  const DEPT_KEYS = ['dept.all', 'dept.eng', 'dept.design', 'dept.ops', 'dept.fin', 'dept.hr', 'dept.sales'];

  const STATUS_MAP: Record<Status, { labelKey: string; variant: 'success' | 'warning' | 'error' }> = {
    active:   { labelKey: 'status.active',   variant: 'success' },
    pending:  { labelKey: 'status.pending',  variant: 'warning' },
    inactive: { labelKey: 'status.inactive', variant: 'error'   },
  };

  const perf_color = (v: number) =>
    v >= 90 ? 'var(--color-success)' :
    v >= 75 ? 'var(--color-warning)' :
              'var(--color-error)';

  const toggleSort = (col: keyof Employee) => {
    if (sortCol === col) setSortAsc(p => !p);
    else { setSortCol(col); setSortAsc(true); }
  };

  const filtered = EMPLOYEES
    .filter(e =>
      (deptKey === 'dept.all' || e.deptKey === deptKey) &&
      (e.name.toLowerCase().includes(search.toLowerCase()) ||
       t(e.roleKey).toLowerCase().includes(search.toLowerCase()) ||
       e.id.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const av = String(a[sortCol]), bv = String(b[sortCol]);
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const activeCount  = EMPLOYEES.filter(e => e.status === 'active').length;
  const pendingCount = EMPLOYEES.filter(e => e.status === 'pending').length;
  const avgPerf = Math.round(EMPLOYEES.reduce((s, e) => s + e.performance, 0) / EMPLOYEES.length);

  return (
    <div>
      {/* ── Stats row ── */}
      <div className="grid-4 mb-6">
        <Stat label={t('dash.total_emp')} value="1,284"        sub={t('dash.total_emp_sub')} />
        <Stat label={t('status.active')}          value={String(activeCount)}  sub={t('dash.active_sub')}   accent="var(--color-success)" />
        <Stat label={t('emp.pending')}  value={String(pendingCount)} sub={t('emp.pending')}  accent="var(--color-warning)" />
        <Stat label={t('emp.performance')} value={`${avgPerf}%`}  sub={t('dash.perf_sub')}  accent="var(--color-primary)" />
      </div>

      {/* ── Toolbar ── */}
      <Card>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--surface-bg)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0 14px', height: 38, width: 280,
          }}>
            <Search size={14} color="var(--text-faint)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('app.search')}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: 'var(--text-primary)', width: '100%' }}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Export */}
            <button className="btn btn-outline" style={{ gap: 6, fontSize: 13 }}>
              <Download size={14} /> {t('action.export')}
            </button>
          </div>
        </div>

        {/* Department tabs */}
        <div className="flex gap-2" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
          {DEPT_KEYS.map(k => (
            <button
              key={k}
              onClick={() => setDeptKey(k)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12, fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.15s',
                background:   deptKey === k ? 'var(--color-primary)' : 'transparent',
                borderColor:  deptKey === k ? 'var(--color-primary)' : 'var(--surface-border)',
                color:        deptKey === k ? '#fff'                  : 'var(--text-muted)',
              }}
            >
              {t(k)}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                {([
                  { key: 'name',        labelKey: 'emp.col_emp'    },
                  { key: 'roleKey',     labelKey: 'emp.col_role'   },
                  { key: 'deptKey',     labelKey: 'emp.col_dept'   },
                  { key: 'status',      labelKey: 'emp.col_status' },
                  { key: 'performance', labelKey: 'emp.col_perf'   },
                  { key: 'joinDate',    labelKey: 'emp.col_joined' },
                ] as { key: keyof Employee; labelKey: string }[]).map(col => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    style={{
                      padding: '10px 12px',
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: 'var(--text-muted)',
                      cursor: 'pointer', userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {t(col.labelKey)}
                      <ChevronDown
                        size={11}
                        style={{
                          opacity: sortCol === col.key ? 1 : 0.3,
                          transform: sortCol === col.key && !sortAsc ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </span>
                  </th>
                ))}
                <th style={{ padding: '10px 12px' }} />
              </tr>
            </thead>

            <tbody>
              {filtered.map((emp, i) => {
                const { labelKey, variant } = STATUS_MAP[emp.status];
                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <tr
                    key={emp.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--surface-border)' : 'none',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Employee */}
                    <td style={{ padding: '14px 12px' }}>
                      <div className="flex items-center gap-3">
                        <Avatar initials={initials} size={36} />
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{emp.name}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 1 }}>{emp.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td style={{ padding: '14px 12px' }}>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(emp.roleKey)}</p>
                    </td>

                    {/* Department */}
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-primary-100)',
                        color: 'var(--color-primary)',
                      }}>
                        {t(emp.deptKey)}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 12px' }}>
                      <Badge variant={variant}>{t(labelKey)}</Badge>
                    </td>

                    {/* Performance */}
                    <td style={{ padding: '14px 12px' }}>
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: 52, height: 6,
                          background: 'var(--color-white-200)',
                          borderRadius: 99, overflow: 'hidden',
                        }}>
                          <div style={{
                            height: '100%', width: `${emp.performance}%`,
                            background: perf_color(emp.performance),
                            borderRadius: 99, transition: 'width 0.3s',
                          }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: perf_color(emp.performance) }}>
                          {emp.performance}%
                        </span>
                      </div>
                    </td>

                    {/* Join date */}
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{emp.joinDate}</span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 12px' }}>
                      <div className="flex items-center gap-2">
                        <button title="Approve" style={{ color: 'var(--text-muted)', padding: 4, borderRadius: 6, transition: 'all 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-100)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          <UserCheck size={15} />
                        </button>
                        <button title="Email" style={{ color: 'var(--text-muted)', padding: 4, borderRadius: 6, transition: 'all 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-100)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          <Mail size={15} />
                        </button>
                        <button title="More" style={{ color: 'var(--text-muted)', padding: 4, borderRadius: 6, transition: 'all 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-bg)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--surface-border)' }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {t('pay.showing')} <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> {t('pay.of')} <strong style={{ color: 'var(--text-primary)' }}>1,284</strong> {t('nav.employees')}
          </p>
          <div className="flex gap-2">
            <button className="btn btn-outline" style={{ height: 34, fontSize: 12 }}>{t('pay.prev')}</button>
            <button className="btn btn-primary" style={{ height: 34, fontSize: 12 }}>{t('pay.next')} {lang === 'en' ? '→' : '←'}</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Employees;
