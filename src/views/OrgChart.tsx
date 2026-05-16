import React from 'react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

interface OrgNode {
  id: string;
  name: string;
  roleKey: string;
  department: string;
  reports?: OrgNode[];
}

const ORG_DATA: OrgNode = {
  id: 'E-001',
  name: 'Sarah Chen',
  roleKey: 'org.ceo',
  department: 'Executive',
  reports: [
    {
      id: 'E-002',
      name: 'Michael Rodriguez',
      roleKey: 'org.cto',
      department: 'Engineering',
      reports: [
        { id: 'E-005', name: 'David Kim', roleKey: 'org.eng_lead', department: 'Frontend' },
        { id: 'E-006', name: 'Elena Rostova', roleKey: 'org.eng_lead', department: 'Backend' },
      ]
    },
    {
      id: 'E-003',
      name: 'Aisha Patel',
      roleKey: 'org.cfo',
      department: 'Finance',
    },
    {
      id: 'E-004',
      name: 'James Wilson',
      roleKey: 'org.hr_dir',
      department: 'Human Resources',
    }
  ]
};

const OrgNodeCard: React.FC<{ node: OrgNode; isRtl: boolean; t: any }> = ({ node, isRtl, t }) => {
  const initials = node.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div 
        style={{
          background: 'var(--surface-bg)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          width: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Avatar initials={initials} size={56} />
        <div style={{ textAlign: 'center' }}>
          <h3 className="text-15 font-600 text-primary mb-1">{node.name}</h3>
          <p className="text-12 text-muted mb-3">{t(node.roleKey)}</p>
          <Badge variant="info">{node.department}</Badge>
        </div>
        
        {node.reports && node.reports.length > 0 && (
          <div style={{ 
            position: 'absolute', 
            bottom: -12, 
            background: 'var(--surface-card)', 
            border: '1px solid var(--surface-border)', 
            padding: '2px 8px', 
            borderRadius: 12,
            fontSize: 10,
            color: 'var(--text-faint)'
          }}>
            {node.reports.length} {t('org.reports')}
          </div>
        )}
      </div>

      {node.reports && node.reports.length > 0 && (
        <>
          {/* Vertical line down from parent */}
          <div style={{ width: 2, height: 24, background: 'var(--surface-border)', zIndex: 1 }} />
          
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingTop: 24 }}>
            {/* Horizontal connecting line */}
            {node.reports.length > 1 && (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: isRtl ? 'auto' : 'calc(50% / ' + node.reports.length + ')', 
                right: isRtl ? 'calc(50% / ' + node.reports.length + ')' : 'auto', 
                width: `calc(100% - 100% / ${node.reports.length})`, 
                height: 2, 
                background: 'var(--surface-border)',
                zIndex: 1
              }} />
            )}
            
            <div style={{ display: 'flex', gap: 32, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              {node.reports.map((report, index) => (
                <div key={report.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Vertical line up to horizontal line */}
                  <div style={{ position: 'absolute', top: -24, width: 2, height: 24, background: 'var(--surface-border)', zIndex: 1 }} />
                  <OrgNodeCard node={report} isRtl={isRtl} t={t} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const OrgChart: React.FC = () => {
  const { t, rtl } = useLang();

  return (
    <div className="space-y-6">
      <Card title={t('org.title')}>
        <div style={{ padding: '40px 0', overflowX: 'auto' }}>
          <div style={{ minWidth: '800px', display: 'flex', justifyContent: 'center' }}>
             <OrgNodeCard node={ORG_DATA} isRtl={rtl} t={t} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrgChart;
