import React from 'react';
import { Clock, CheckCircle, AlertTriangle, RefreshCw, DollarSign, Layers } from 'lucide-react';
import { ProcessMetrics, SLAData, ReworkData } from '../types';

interface MetricsGridProps {
  metrics: ProcessMetrics;
  sla: SLAData;
  rework: ReworkData;
  onOpenEvidence: () => void;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, sla, rework, onOpenEvidence }) => {
  const baseline = sla.baseline_comparison;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      gap: 16,
      marginBottom: 28
    }}>
      {/* 1. Cases */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Cases Analyzed
          </span>
          <Layers size={18} color="var(--text-dim)" />
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
          {metrics.cases.toLocaleString()}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 4 }}>
          {metrics.date_range.from ? `${metrics.date_range.from} to ${metrics.date_range.to}` : 'All available history'}
        </div>
      </div>

      {/* 2. Median Turnaround */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Median Turnaround
          </span>
          <Clock size={18} color="var(--accent-primary)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
            {metrics.median_turnaround_hours}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>hours</span>
        </div>
        {baseline && (
          <div style={{ fontSize: '0.75rem', marginTop: 6, color: 'var(--text-dim)' }}>
            Baseline: <strong style={{ color: 'var(--text-muted)' }}>{baseline.official_baseline_hours}h</strong>
            <span style={{ marginLeft: 6, color: baseline.difference_hours > 0 ? 'var(--status-critical)' : 'var(--status-success)' }}>
              ({baseline.difference_hours > 0 ? `+${baseline.difference_hours}` : baseline.difference_hours}h)
            </span>
          </div>
        )}
      </div>

      {/* 3. P90 Turnaround */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            P90 Turnaround
          </span>
          <AlertTriangle size={18} color="var(--status-warning)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
            {metrics.p90_turnaround_hours}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>hours</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 6 }}>
          90% of requests complete within this window
        </div>
      </div>

      {/* 4. SLA Attainment */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            SLA Attainment
          </span>
          <CheckCircle size={18} color={sla.attainment_rate >= 80 ? 'var(--status-success)' : 'var(--status-critical)'} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 800,
            fontFamily: 'Outfit',
            color: sla.attainment_rate >= 80 ? 'var(--status-success)' : 'var(--status-critical)'
          }}>
            {sla.attainment_rate}%
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 6 }}>
          Target: {sla.sla_target_hours}h ({sla.breached_cases} breached)
        </div>
      </div>

      {/* 5. Rework Rate */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Rework Rate
          </span>
          <RefreshCw size={18} color="var(--accent-primary)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 800,
            fontFamily: 'Outfit',
            color: rework.rate_pct > 15 ? 'var(--status-warning)' : '#ffffff'
          }}>
            {rework.rate_pct}%
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Loop: {rework.top_loop}
        </div>
      </div>

      {/* 6. Operational Cost Indicator */}
      <div className="glass-panel" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Process Cost
          </span>
          <DollarSign size={18} color="var(--text-dim)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
            ₱{metrics.median_cost_php.toFixed(0)}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>med/case</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 6 }}>
          Total: ₱{(metrics.total_cost_php / 1000).toFixed(1)}k (Operational indicator)
        </div>
      </div>
    </div>
  );
};
