import React from 'react';
import { Award, MessageSquare, ChevronRight, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

const Performance: React.FC = () => {
  const { t, rtl } = useLang();

  const GOALS = [
    { title: 'Project Q2 Delivery', progress: 85, category: 'Engineering' },
    { title: 'Customer Satisfaction Index', progress: 92, category: 'Support' },
    { title: 'Technical Debt Reduction', progress: 40, category: 'System' },
    { title: 'Team Mentorship Program', progress: 60, category: 'Leadership' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid-3 gap-6">
        {/* Performance Score */}
        <Card title={t('perf.score')} className="col-span-1">
          <div className="flex flex-col items-center py-6">
            <div 
              style={{
                width: 140, height: 140,
                borderRadius: '50%',
                border: '8px solid var(--surface-border)',
                borderTopColor: 'var(--color-primary)',
                borderRightColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-45deg)'
              }}
            >
              <div style={{ transform: 'rotate(45deg)', textAlign: 'center' }}>
                <span className="text-32 font-900 text-primary">94</span>
                <p className="text-12 text-muted uppercase tracking-wider">A+</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-14 text-primary font-600 mb-1">Top 5% in Department</p>
              <p className="text-12 text-muted">{t('app.logo_sub')}</p>
            </div>
          </div>
        </Card>

        {/* Goals List */}
        <Card title={t('perf.goals')} className="col-span-2">
          <div className="space-y-6">
            {GOALS.map((goal, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-14 font-600 text-primary">{goal.title}</span>
                    <span className="mx-2 text-faint">•</span>
                    <span className="text-11 text-muted uppercase tracking-widest">{goal.category}</span>
                  </div>
                  <span className="text-13 font-700 text-primary">{goal.progress}%</span>
                </div>
                <ProgressBar value={goal.progress} variant={i % 2 === 0 ? 'luxury' : 'primary'} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid-2 gap-6">
         {/* Quarterly Reviews */}
         <Card title={t('perf.reviews')}>
            <div className="space-y-4">
              {[
                { quarter: 'Q1 2026', date: 'Mar 15, 2026', rating: 'Exceptional', icon: Award },
                { quarter: 'Q4 2025', date: 'Dec 12, 2025', rating: 'Satisfactory', icon: CheckCircle },
              ].map((review, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-4 bg-main rounded-xl border border-surface-border hover:border-primary transition-colors cursor-pointer"
                  dir={rtl ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-bg flex items-center justify-center text-primary">
                      <review.icon size={20} />
                    </div>
                    <div>
                      <p className="text-14 font-600 text-primary">{review.quarter}</p>
                      <p className="text-12 text-muted">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="success">{review.rating}</Badge>
                    <ChevronRight size={16} className="text-faint" style={{ transform: rtl ? 'rotate(180deg)' : 'none' }} />
                  </div>
                </div>
              ))}
            </div>
         </Card>

         {/* Mentorship / Feedback */}
         <Card title="Feedback & Mentorship">
            <div className="flex flex-col items-center justify-center py-8 text-center">
               <div className="w-16 h-16 rounded-full bg-surface-bg flex items-center justify-center mb-4 text-faint border border-dashed border-surface-border">
                  <MessageSquare size={24} />
               </div>
               <p className="text-14 text-primary font-500 mb-2">No new feedback yet</p>
               <p className="text-12 text-muted max-w-xs">Recent feedback from your manager and peers will appear here after the Q2 review cycle starts.</p>
               <button className="btn btn-outline mt-6" style={{ height: 36, fontSize: 12 }}>
                  Request Feedback
               </button>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Performance;
