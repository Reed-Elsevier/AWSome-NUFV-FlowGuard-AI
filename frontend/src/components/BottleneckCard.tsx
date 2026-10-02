import React from 'react';
import { AlertCircle, ArrowRight, FileText, Zap } from 'lucide-react';
import { LargestBottleneck } from '../types';

interface BottleneckCardProps {
  bottleneck: LargestBottleneck;
  onSimulateFix: () => void;
  onOpenEvidence: () => void;
}

export const BottleneckCard: React.FC<BottleneckCardProps> = ({ bottleneck, onSimulateFix, onOpenEvidence }) => {
  return (
    <div className="glass-panel" style={{
      padding: '24px 28px',
      marginBottom: 28,
      borderLeft: '4px solid var(--status-critical)',
      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(18, 24, 38, 0.85) 100%)'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20
      }}>
        {/* Left: Summary */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-critical">
              <AlertCircle size={13} />
              Largest Operational Bottleneck
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Deterministic Finding
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            {bottleneck.activity}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: 16 }}>
            {bottleneck.plain_language_summary}
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onSimulateFix} className="btn-primary" style={{ fontSize: '0.88rem', padding: '9px 18px' }}>
              <Zap size={16} />
              Simulate Fix
            </button>
            <button onClick={onOpenEvidence} className="btn-secondary" style={{ fontSize: '0.88rem', padding: '9px 18px' }}>
              <FileText size={16} />
              View Evidence
            </button>
          </div>
        </div>

        {/* Right: Key Deterministic Proof Numbers */}
        <div style={{
          display: 'flex',
          gap: 20,
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Median Wait
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--status-critical)', fontFamily: 'Outfit' }}>
              {bottleneck.median_wait_hours}h
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              P90: {bottleneck.p90_wait_hours}h
            </div>
          </div>

          <div style={{ width: 1, background: 'var(--border-subtle)' }} />

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Delay Share
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
              {Math.round(bottleneck.delay_share * 100)}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              of total process waiting
            </div>
          </div>

          <div style={{ width: 1, background: 'var(--border-subtle)' }} />

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Affected Cases
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
              {bottleneck.affected_cases}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              delayed at this step
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
