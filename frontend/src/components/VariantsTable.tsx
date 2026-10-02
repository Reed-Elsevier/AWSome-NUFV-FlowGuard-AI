import React from 'react';
import { GitCommit, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { VariantData } from '../types';

interface VariantsTableProps {
  variants: VariantData[];
}

export const VariantsTable: React.FC<VariantsTableProps> = ({ variants }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
          Top Process Variants
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Most frequent sequential execution paths showing duration and rework distribution.
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-dim)' }}>
              <th style={{ padding: '10px 14px' }}>Rank & Variant Path</th>
              <th style={{ padding: '10px 14px' }}>Cases (%)</th>
              <th style={{ padding: '10px 14px' }}>Median Turnaround</th>
              <th style={{ padding: '10px 14px' }}>P90 Turnaround</th>
              <th style={{ padding: '10px 14px' }}>SLA Met</th>
              <th style={{ padding: '10px 14px' }}>Rework</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, idx) => (
              <tr key={idx} style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: idx === 0 ? 'rgba(99, 102, 241, 0.03)' : 'transparent'
              }}>
                <td style={{ padding: '12px 14px', maxWidth: 450 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: idx === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{
                      fontWeight: 500,
                      color: idx === 0 ? '#ffffff' : 'var(--text-main)',
                      lineHeight: 1.4,
                      wordBreak: 'break-word'
                    }}>
                      {v.variant}
                    </span>
                  </div>
                </td>

                <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                  {v.case_count.toLocaleString()} <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>({v.percentage}%)</span>
                </td>

                <td style={{ padding: '12px 14px', color: '#ffffff' }}>
                  {v.median_duration_hours}h
                </td>

                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                  {v.p90_duration_hours}h
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <span style={{
                    color: v.sla_attainment_pct >= 80 ? 'var(--status-success)' : 'var(--status-critical)',
                    fontWeight: 600
                  }}>
                    {v.sla_attainment_pct}%
                  </span>
                </td>

                <td style={{ padding: '12px 14px' }}>
                  {v.rework_rate_pct > 0 ? (
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                      {v.rework_rate_pct}% loop
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
