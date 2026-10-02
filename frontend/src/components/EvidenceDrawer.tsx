import React from 'react';
import { X, Database, ShieldCheck, CheckCircle2, FileCode } from 'lucide-react';
import { AnalyzeResponse } from '../types';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalyzeResponse | null;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'rgba(16, 22, 34, 0.98)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Database size={22} color="var(--accent-primary)" />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Auditable Evidence Ledger
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Deterministic operational calculations supporting all AI outputs
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px 10px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Traceable Data Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Card 1: Sample & Source Provenance */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 10 }}>
              1. Provenance & Sample Size
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: '0.86rem' }}>
              <div>Primary Source: <strong style={{ color: '#ffffff' }}>process_event_log.parquet</strong></div>
              <div>Secondary Table: <strong style={{ color: '#ffffff' }}>access_requests.parquet</strong></div>
              <div>Cases Evaluated: <strong style={{ color: '#ffffff' }}>{data.metrics.cases.toLocaleString()} cases</strong></div>
              <div>Date Range: <strong style={{ color: '#ffffff' }}>{data.metrics.date_range.from || 'Min'} to {data.metrics.date_range.to || 'Max'}</strong></div>
            </div>
          </div>

          {/* Card 2: Turnaround Distribution */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 10 }}>
              2. Verified Cycle Time Distribution
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, textAlign: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>MEDIAN</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{data.metrics.median_turnaround_hours}h</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>P75</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{data.metrics.p75_turnaround_hours}h</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>P90</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--status-critical)' }}>{data.metrics.p90_turnaround_hours}h</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>P95</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{data.metrics.p95_turnaround_hours}h</div>
              </div>
            </div>
          </div>

          {/* Card 3: Bottleneck Evidence */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 10 }}>
              3. Critical Stage Delay Evidence
            </h4>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              <div>Stage: <strong style={{ color: '#ffffff' }}>{data.bottlenecks.largest_bottleneck.activity}</strong></div>
              <div>Median Stage Wait: <strong style={{ color: 'var(--status-critical)' }}>{data.bottlenecks.largest_bottleneck.median_wait_hours} hours</strong></div>
              <div>P90 Stage Wait: <strong style={{ color: '#ffffff' }}>{data.bottlenecks.largest_bottleneck.p90_wait_hours} hours</strong></div>
              <div>Affected Cases: <strong style={{ color: '#ffffff' }}>{data.bottlenecks.largest_bottleneck.affected_cases} ({((data.bottlenecks.largest_bottleneck.affected_cases / data.metrics.cases)*100).toFixed(1)}%)</strong></div>
              <div>Delay Contribution: <strong style={{ color: 'var(--status-critical)' }}>{(data.bottlenecks.largest_bottleneck.delay_share * 100).toFixed(1)}% of total observed waiting</strong></div>
            </div>
          </div>

          {/* Card 4: Raw Evidence JSON preview */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 8 }}>
              <FileCode size={14} />
              <span>Compact Structured Evidence Sent to LLM (Token Efficient JSON)</span>
            </div>
            <pre style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              overflowX: 'auto',
              maxHeight: 140,
              fontFamily: 'monospace'
            }}>
              {JSON.stringify(data.evidence, null, 2)}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-secondary">
            Close Evidence Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
