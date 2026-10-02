import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, X, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { AIExplanation } from '../types';

interface AIExplanationSectionProps {
  explanation: AIExplanation;
  onOpenEvidence: () => void;
}

export const AIExplanationSection: React.FC<AIExplanationSectionProps> = ({ explanation, onOpenEvidence }) => {
  // Track human review status per recommended action
  const [actionStatuses, setActionStatuses] = useState<Record<number, 'accepted' | 'more_evidence' | 'dismissed'>>({});

  const handleAction = (index: number, status: 'accepted' | 'more_evidence' | 'dismissed') => {
    setActionStatuses(prev => ({ ...prev, [index]: status }));
  };

  return (
    <div className="glass-panel" style={{
      padding: '28px',
      marginBottom: 28,
      border: '1px solid rgba(99, 102, 241, 0.3)',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(18, 24, 38, 0.9) 100%)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              AI Operational Interpretation
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Plain-language translation grounded purely in calculated evidence
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
            Confidence: {explanation.confidence.toUpperCase()}
          </span>
          <button onClick={onOpenEvidence} className="btn-secondary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            View Underlying Evidence
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.25)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        borderLeft: '3px solid var(--accent-primary)',
        marginBottom: 20
      }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 6 }}>
          Executive Summary
        </h4>
        <p style={{ fontSize: '0.96rem', color: '#ffffff', lineHeight: 1.6, margin: 0 }}>
          {explanation.executive_summary}
        </p>
      </div>

      {/* Two-Column Grid: Likely Causes vs Recommended Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* Why this is happening */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            Observed Drivers (Why It's Getting Stuck)
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {explanation.likely_causes.map((cause, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                lineHeight: 1.5
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--status-critical)',
                  marginTop: 8,
                  flexShrink: 0
                }} />
                <span>{cause}</span>
              </li>
            ))}
          </ul>

          {explanation.business_implications?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                Business Implications:
              </div>
              {explanation.business_implications.map((imp, idx) => (
                <p key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                  • {imp}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Actions for Human Review */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            Recommended Actions (Human Review Required)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {explanation.recommended_actions.map((action, idx) => {
              const status = actionStatuses[idx];
              return (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px'
                }}>
                  <p style={{ fontSize: '0.88rem', color: '#ffffff', marginBottom: 10, lineHeight: 1.4 }}>
                    {action}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Decision status: {status ? <strong style={{ color: status === 'accepted' ? 'var(--status-success)' : status === 'dismissed' ? 'var(--status-critical)' : 'var(--status-warning)' }}>{status.replace('_', ' ').toUpperCase()}</strong> : 'Pending Review'}
                    </span>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleAction(idx, 'accepted')}
                        className="btn-secondary"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          color: status === 'accepted' ? 'var(--status-success)' : 'inherit',
                          borderColor: status === 'accepted' ? 'var(--status-success)' : 'var(--border-subtle)'
                        }}
                      >
                        <Check size={12} />
                        Investigate
                      </button>
                      <button
                        onClick={() => handleAction(idx, 'more_evidence')}
                        className="btn-secondary"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          color: status === 'more_evidence' ? 'var(--status-warning)' : 'inherit'
                        }}
                      >
                        <HelpCircle size={12} />
                        More Evidence
                      </button>
                      <button
                        onClick={() => handleAction(idx, 'dismissed')}
                        className="btn-secondary"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          color: status === 'dismissed' ? 'var(--status-critical)' : 'inherit'
                        }}
                      >
                        <X size={12} />
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
