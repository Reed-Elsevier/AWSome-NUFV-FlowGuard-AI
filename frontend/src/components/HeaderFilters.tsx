import React from 'react';
import { Search, Filter, Calendar, Sparkles } from 'lucide-react';
import { ProcessDefinition } from '../types';

interface HeaderFiltersProps {
  processes: ProcessDefinition[];
  selectedProcessId: string;
  onSelectProcess: (processId: string) => void;
  selectedAccessType: string;
  onSelectAccessType: (accessType: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  processes,
  selectedProcessId,
  onSelectProcess,
  selectedAccessType,
  onSelectAccessType,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onAnalyze,
  isLoading
}) => {
  const currentProcess = processes.find(p => p.process_id === selectedProcessId);
  const isHero = selectedProcessId === 'PRC005';

  const applyPreset = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
  };

  return (
    <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: 28 }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Left: Process & Filter Selectors */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>
          {/* Process Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Business Process
            </label>
            <select
              value={selectedProcessId}
              onChange={(e) => onSelectProcess(e.target.value)}
              style={{ minWidth: 260, fontWeight: 500 }}
            >
              {processes.map((proc) => (
                <option key={proc.process_id} value={proc.process_id}>
                  {proc.process_name} ({proc.process_id}) {proc.is_hero ? '★ HERO' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Access Type Filter (Hero Scenario) */}
          {isHero && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Access Type Filter
              </label>
              <select
                value={selectedAccessType}
                onChange={(e) => onSelectAccessType(e.target.value)}
                style={{ minWidth: 210, fontWeight: 500 }}
              >
                <option value="">All Access Types</option>
                <option value="Data Access - PII">Data Access - PII (Hero Case)</option>
                <option value="Data Access - Analytics">Data Access - Analytics</option>
                <option value="Elevated">Elevated Access</option>
                <option value="Standard">Standard Access</option>
              </select>
            </div>
          )}

          {/* Date Range Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Date Range (Optional)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="YYYY-MM-DD"
                style={{ width: 140 }}
              />
              <span style={{ color: 'var(--text-dim)' }}>to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="YYYY-MM-DD"
                style={{ width: 140 }}
              />
            </div>
          </div>
        </div>

        {/* Right: Presets & Analyze Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => applyPreset('', '')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 10px' }}
            >
              All Time
            </button>
            <button
              onClick={() => applyPreset('2024-01-01', '2026-09-30')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 10px' }}
            >
              2024-2026
            </button>
            <button
              onClick={() => applyPreset('2026-01-01', '2026-09-30')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 10px' }}
            >
              2026 Only
            </button>
          </div>

          {/* Main Action Button */}
          <button
            onClick={onAnalyze}
            disabled={isLoading}
            className="btn-primary"
            style={{ padding: '11px 24px', fontSize: '0.92rem' }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: 16,
                  height: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Analyze Process
              </>
            )}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
