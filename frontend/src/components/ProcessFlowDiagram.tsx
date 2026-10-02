import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { BottlenecksData, ApprovalStep } from '../types';

interface ProcessFlowDiagramProps {
  standardPath: string;
  bottlenecks: BottlenecksData;
  isHero: boolean;
}

export const ProcessFlowDiagram: React.FC<ProcessFlowDiagramProps> = ({ standardPath, bottlenecks, isHero }) => {
  const [showDetailed, setShowDetailed] = useState(false);

  // If Hero scenario (PRC005 Access Requests), display standard sequence with approval steps
  const heroStages = [
    { id: 'submitted', label: 'Request Submitted', isBottleneck: false, wait: '0h' },
    { id: 'manager', label: 'Manager Review', isBottleneck: false, wait: '5.9h' },
    { id: 'data_owner', label: 'Data Owner Review', isBottleneck: true, wait: '128.9h' },
    { id: 'privacy', label: 'Privacy Review', isBottleneck: true, wait: '20.7h' },
    { id: 'infosec', label: 'InfoSec Review', isBottleneck: false, wait: '13.9h' },
    { id: 'provisioning', label: 'Provisioning', isBottleneck: false, wait: '5.0h' },
    { id: 'closed', label: 'Request Closed', isBottleneck: false, wait: '0h' }
  ];

  // For generic processes, parse standard_path
  const genericStages = standardPath.split(' > ').map((step, idx) => {
    const isB = bottlenecks.largest_bottleneck.activity.toLowerCase().includes(step.toLowerCase());
    return {
      id: `step-${idx}`,
      label: step,
      isBottleneck: isB,
      wait: isB ? `${bottlenecks.largest_bottleneck.median_wait_hours}h` : ''
    };
  });

  const stagesToRender = isHero ? heroStages : genericStages;

  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
            Process Flow & Friction Points
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Sequential operational stages highlighting waiting queues and bottleneck friction.
          </p>
        </div>

        <button
          onClick={() => setShowDetailed(!showDetailed)}
          className="btn-secondary"
          style={{ fontSize: '0.82rem', padding: '6px 12px' }}
        >
          {showDetailed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showDetailed ? 'Hide Detailed Transitions' : 'View Transition Matrix'}
        </button>
      </div>

      {/* Process Flow Stages Ribbon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        padding: '16px 8px',
        gap: 12,
        scrollbarWidth: 'thin'
      }}>
        {stagesToRender.map((stage, index) => {
          const isBottleneck = stage.isBottleneck;
          return (
            <React.Fragment key={stage.id}>
              {/* Stage Card */}
              <div style={{
                flex: '0 0 auto',
                minWidth: 140,
                maxWidth: 170,
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: isBottleneck ? 'rgba(244, 63, 94, 0.12)' : 'var(--bg-secondary)',
                border: isBottleneck ? '1.5px solid var(--status-critical)' : '1px solid var(--border-subtle)',
                boxShadow: isBottleneck ? '0 0 15px -3px rgba(244, 63, 94, 0.3)' : 'none',
                position: 'relative'
              }}>
                {isBottleneck && (
                  <div style={{
                    position: 'absolute',
                    top: -9,
                    right: 8,
                    background: 'var(--status-critical)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: 4,
                    textTransform: 'uppercase'
                  }}>
                    Bottleneck
                  </div>
                )}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                  Stage {index + 1}
                </div>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: isBottleneck ? '#ffffff' : 'var(--text-main)',
                  marginBottom: 6,
                  lineHeight: 1.3
                }}>
                  {stage.label}
                </div>
                {stage.wait && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.75rem',
                    color: isBottleneck ? 'var(--status-critical)' : 'var(--text-muted)',
                    fontWeight: 600
                  }}>
                    <Clock size={12} />
                    {stage.wait} med. wait
                  </div>
                )}
              </div>

              {/* Arrow Connector */}
              {index < stagesToRender.length - 1 && (
                <div style={{ flex: '0 0 auto', color: 'var(--text-dim)' }}>
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Expandable Detailed Transitions */}
      {showDetailed && (
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }} className="animate-fade-in">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12 }}>
            Observed Activity Transitions (Ranked by Total Delay Contribution)
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-dim)' }}>
                  <th style={{ padding: '8px 12px' }}>Transition Path</th>
                  <th style={{ padding: '8px 12px' }}>Occurrences</th>
                  <th style={{ padding: '8px 12px' }}>Median Wait</th>
                  <th style={{ padding: '8px 12px' }}>P90 Wait</th>
                  <th style={{ padding: '8px 12px' }}>Delay Share</th>
                </tr>
              </thead>
              <tbody>
                {bottlenecks.transitions.slice(0, 6).map((t, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500, color: '#ffffff' }}>{t.transition}</td>
                    <td style={{ padding: '10px 12px' }}>{t.occurrences.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--status-critical)' }}>{t.median_wait_hours}h</td>
                    <td style={{ padding: '10px 12px' }}>{t.p90_wait_hours}h</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{t.delay_share_pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
