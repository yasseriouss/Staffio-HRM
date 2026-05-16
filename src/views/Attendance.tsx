import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useLang } from '../context/LangContext';

const Attendance: React.FC = () => {
  const { t, rtl } = useLang();
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [timer, setTimer] = useState('00:00:00');
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (isOnDuty && startTime) {
      interval = setInterval(() => {
        const diff = Date.now() - startTime;
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        setTimer(`${h}:${m}:${s}`);
      }, 1000);
    } else {
      setTimer('00:00:00');
    }
    return () => clearInterval(interval);
  }, [isOnDuty, startTime]);

  const handleToggleDuty = () => {
    if (!isOnDuty) {
      setStartTime(Date.now());
    } else {
      setStartTime(null);
    }
    setIsOnDuty(!isOnDuty);
  };

  const TIMESHEETS = [
    { date: '2026-05-15', checkIn: '09:00', checkOut: '17:30', total: '8.5h', status: 'success' },
    { date: '2026-05-14', checkIn: '08:45', checkOut: '18:15', total: '9.5h', status: 'warning' },
    { date: '2026-05-13', checkIn: '09:10', checkOut: '17:00', total: '7.8h', status: 'success' },
    { date: '2026-05-12', checkIn: '08:55', checkOut: '17:45', total: '8.8h', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid-3 gap-6">
        {/* Clock In/Out Card */}
        <Card title={t('att.status')} className="col-span-1">
          <div className="flex flex-col items-center py-4">
            <div 
              className="mb-6 flex items-center justify-center"
              style={{
                width: 120, height: 120,
                borderRadius: '50%',
                border: `4px solid ${isOnDuty ? 'var(--color-success)' : 'var(--surface-border)'}`,
                background: 'var(--surface-bg)',
                boxShadow: isOnDuty ? '0 0 20px rgba(61, 220, 151, 0.2)' : 'none'
              }}
            >
              <div className="text-center">
                <Clock size={32} color={isOnDuty ? 'var(--color-success)' : 'var(--text-faint)'} className="mx-auto mb-2" />
                <span className="text-18 font-700 text-primary font-mono">{timer}</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <Badge variant={isOnDuty ? 'success' : 'info'}>
                {isOnDuty ? t('att.on_duty') : t('att.off_duty')}
              </Badge>
            </div>

            <button 
              onClick={handleToggleDuty}
              className={`btn ${isOnDuty ? 'btn-outline' : 'btn-primary'} w-full`}
              style={{ height: 48, borderRadius: 'var(--radius-lg)' }}
            >
              {isOnDuty ? t('att.clock_out') : t('att.clock_in')}
            </button>
          </div>
        </Card>

        {/* Weekly Stats */}
        <Card title={t('att.hours')} className="col-span-2">
           <div className="flex items-end gap-3 h-48 mb-8">
              {[45, 65, 85, 35, 95, 0, 0].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${h}%`, 
                      background: i < 5 ? 'var(--color-primary)' : 'var(--surface-border)',
                      borderRadius: 'var(--radius-sm)'
                    }} 
                  />
                  <span className="text-10 text-faint uppercase">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
           </div>
           
           <div className="grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: 'var(--surface-border)' }}>
              <div className="text-center">
                <p className="text-12 text-muted mb-1">{t('att.hours')}</p>
                <p className="text-18 font-700 text-primary">34.6h</p>
              </div>
              <div className="text-center border-x" style={{ borderColor: 'var(--surface-border)' }}>
                <p className="text-12 text-muted mb-1">{t('att.overtime')}</p>
                <p className="text-18 font-700 text-success">2.4h</p>
              </div>
              <div className="text-center">
                <p className="text-12 text-muted mb-1">Leaves</p>
                <p className="text-18 font-700 text-primary">0</p>
              </div>
           </div>
        </Card>
      </div>

      {/* Timesheet Table */}
      <Card title={t('att.timesheet')}>
        <div className="overflow-x-auto">
          <table className="w-full text-left" dir={rtl ? 'rtl' : 'ltr'}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th className="py-3 text-12 font-600 text-muted">{t('att.date')}</th>
                <th className="py-3 text-12 font-600 text-muted">{t('att.clock_in')}</th>
                <th className="py-3 text-12 font-600 text-muted">{t('att.clock_out')}</th>
                <th className="py-3 text-12 font-600 text-muted">{t('att.hours')}</th>
                <th className="py-3 text-12 font-600 text-muted text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {TIMESHEETS.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < TIMESHEETS.length - 1 ? '1px solid var(--surface-border)' : 'none' }}>
                  <td className="py-4 text-13 text-primary">{row.date}</td>
                  <td className="py-4 text-13 text-secondary">{row.checkIn}</td>
                  <td className="py-4 text-13 text-secondary">{row.checkOut}</td>
                  <td className="py-4 text-13 font-600 text-primary">{row.total}</td>
                  <td className="py-4 text-right">
                    <Badge variant={row.status as any}>
                      {row.status === 'success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      <span className="ml-1">Verified</span>
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Attendance;
