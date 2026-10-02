import React from 'react';
import { Cpu, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';
import { AutomationCandidate } from '../types';

interface AutomationSectionProps {
  candidates: AutomationCandidate[];
}

export const AutomationSection: React.FC<AutomationSectionProps> = ({ candidates }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Cpu size={22} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Automation Opportunity Discovery
          </h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Comparing 2023 Automation Survey assumptions against empirical operational execution logs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {candidates.map((cand) => {
          const isSupported = cand.assessment === 'Still Supported';
          const isReassess = cand.assessment === 'Needs Reassessment';

          return (
            <div
              key={cand.activity_id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: isSupported
                  ? '1px solid rgba(16, 185, 129, 0.3)'
                  : isReassess
                  ? '1px solid rgba(245, 158, 11, 0.3)'
                  : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      Stage {cand.standard_sequence} • {cand.activity_id}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: 2 }}>
                      {cand.activity_name}
                    </h4>
                  </div>

                  <span className={`badge ${
                    isSupported ? 'badge-success' : isReassess ? 'badge-warning' : 'badge-info'
                  }`}>
                    {isSupported && <CheckCircle2 size={12} />}
                    {isReassess && <AlertTriangle size={12} />}
                    {!isSupported && !isReassess && <HelpCircle size={12} />}
                    {cand.assessment}
                  </span>
                </div>

                {/* Rationale */}
                <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: 14 }}>
                  {cand.rationale}
                </p>

                {/* Comparison Grid: Survey 2023 vs Current Reality */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  background: 'rgba(0,0,0,0.25)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  marginBottom: 12
                }}>
                  <div>
                    <div style={{ color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                      2023 Survey
                    </div>
                    <div>Rule-Based: <strong style={{ color: '#ffffff' }}>{cand.survey_2023.rule_based_pct ?? 'N/A'}%</strong></div>
                    <div>Exception Rate: <strong style={{ color: '#ffffff' }}>{cand.survey_2023.exception_rate_pct ?? 'N/A'}%</strong></div>
                    <div>Survey Score: <strong style={{ color: '#ffffff' }}>{cand.survey_2023.automation_score ?? 'N/A'}</strong></div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                      Current Evidence
                    </div>
                    <div>Observed Volume: <strong style={{ color: '#ffffff' }}>{cand.current_evidence.observed_volume.toLocaleString()}</strong></div>
                    <div>Observed Rework: <strong style={{
                      color: cand.current_evidence.observed_rework_pct > 15 ? 'var(--status-warning)' : '#ffffff'
                    }}>{cand.current_evidence.observed_rework_pct}%</strong></div>
                    <div>Cost: <strong style={{ color: '#ffffff' }}>₱{cand.current_evidence.avg_cost_php.toFixed(1)}</strong></div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Recommended: <strong style={{ color: 'var(--text-main)' }}>{cand.survey_2023.recommended_approach}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
