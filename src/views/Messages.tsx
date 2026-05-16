import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import { useLang } from '../context/LangContext';

const THREADS = [
  { id: 1, name: 'Alex Morrison',  last: 'msg.last.report',        time: 'time.2m',   online: true  },
  { id: 2, name: 'Sara El Amine',  last: 'msg.last.inspect',       time: 'time.1h',   online: true  },
  { id: 3, name: 'James Liu',      last: 'msg.last.logist',        time: 'time.3h',   online: false },
  { id: 4, name: 'Laila Mansour',  last: 'msg.last.pay',           time: 'time.5h',   online: false },
];

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

const Messages: React.FC = () => {
  const { t, lang } = useLang();
  const [active, setActive] = useState(1);
  const contact = THREADS.find(t => t.id === active)!;
  const isRtl = lang === 'ar';

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 200px)',
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
    }}>
      {/* Thread list */}
      <div style={{
        width: 300, flexShrink: 0,
        borderRight: isRtl ? 'none' : '1px solid var(--surface-border)',
        borderLeft: isRtl ? '1px solid var(--surface-border)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Search */}
        <div style={{ padding: 16, borderBottom: '1px solid var(--surface-border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface-bg)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0 12px', height: 36,
          }}>
            <Search size={13} color="var(--text-faint)" />
            <input
              placeholder={t('msg.search')}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%', color: 'var(--text-primary)', textAlign: isRtl ? 'right' : 'left' }}
            />
          </div>
        </div>

        {/* Threads */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {THREADS.map(t_item => (
            <button
              key={t_item.id}
              onClick={() => setActive(t_item.id)}
              style={{
                width: '100%', 
                textAlign: isRtl ? 'right' : 'left',
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: '1px solid var(--surface-border)',
                background: t_item.id === active ? 'var(--color-primary-100)' : 'transparent',
                borderLeft: !isRtl && t_item.id === active ? '3px solid var(--color-primary)' : '3px solid transparent',
                borderRight: isRtl && t_item.id === active ? '3px solid var(--color-primary)' : '3px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar initials={initials(t_item.name)} size={38} />
                {t_item.online && (
                  <span style={{
                    position: 'absolute', bottom: 1, 
                    right: isRtl ? 'auto' : 1,
                    left: isRtl ? 1 : 'auto',
                    width: 9, height: 9, borderRadius: '50%',
                    background: 'var(--color-success)',
                    border: '2px solid var(--surface-card)',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t_item.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{t(t_item.time)}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t(t_item.last)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface-bg)' }}>
        {/* Header */}
        <div style={{
          padding: '0 24px', height: 64, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface-card)',
          borderBottom: '1px solid var(--surface-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initials={initials(contact.name)} size={36} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{contact.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: contact.online ? 'var(--color-success)' : 'var(--color-black-100)',
                }} />
                <span style={{ fontSize: 11, color: contact.online ? 'var(--color-success)' : 'var(--text-faint)' }}>
                  {contact.online ? t('status.online') : t('status.offline')}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[Phone, Video, MoreVertical].map((Icon, i) => (
              <button key={i} style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', background: 'var(--surface-bg)',
                border: '1px solid var(--surface-border)',
              }}>
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Date divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--surface-border)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-faint)', padding: '4px 12px', borderRadius: 99, background: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
              {t('msg.today')}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--surface-border)' }} />
          </div>

          {/* Received */}
          <div style={{ alignSelf: isRtl ? 'flex-end' : 'flex-start', maxWidth: '65%' }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--surface-card)',
              border: '1px solid var(--surface-border)',
              borderRadius: isRtl ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
              fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)',
              textAlign: isRtl ? 'right' : 'left'
            }}>
              {t('msg.chat.recv')}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4, display: 'block' }}>2:20 PM</span>
          </div>

          {/* Sent */}
          <div style={{ alignSelf: isRtl ? 'flex-start' : 'flex-end', maxWidth: '65%' }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--color-primary)',
              borderRadius: isRtl ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
              fontSize: 14, lineHeight: 1.6, color: '#fff',
              textAlign: isRtl ? 'right' : 'left'
            }}>
              {t('msg.chat.sent')}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4, display: 'block', textAlign: isRtl ? 'left' : 'right' }}>
              2:22 PM · {t('msg.delivered')}
            </span>
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', background: 'var(--surface-card)', borderTop: '1px solid var(--surface-border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--surface-bg)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '0 16px', height: 48,
            flexDirection: isRtl ? 'row-reverse' : 'row'
          }}>
            <Paperclip size={16} color="var(--text-faint)" style={{ cursor: 'pointer', flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t('msg.write')}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: 'var(--text-primary)', textAlign: isRtl ? 'right' : 'left' }}
            />
            <Smile size={16} color="var(--text-faint)" style={{ cursor: 'pointer', flexShrink: 0 }} />
            <button style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transform: isRtl ? 'scaleX(-1)' : 'none'
            }}>
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
