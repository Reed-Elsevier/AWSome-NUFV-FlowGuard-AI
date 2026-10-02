import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle, HelpCircle, ArrowRight, DollarSign, Clock, Users, FileSpreadsheet } from 'lucide-react';
import { fetchAIUseCases, fetchAIUseCaseAudit } from '../api/client';
import { AIUseCaseSummary, AIUseCaseAudit } from '../types';

export const AIValueAuditView: React.FC = () => {
  const [useCases, setUseCases] = useState<AIUseCaseSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [auditDetail, setAuditDetail] = useState<AIUseCaseAudit | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      setLoadingList(true);
      try {
        const list = await fetchAIUseCases();
        setUseCases(list);
        if (list.length > 0) {
          // Select first scaled or pilot use case
          const defaultUc = list.find(u => u.stage === 'Scaled') || list[0];
          setSelectedId(defaultUc.use_case_id);
        }
      } catch (e) {
        console.error('Error fetching AI portfolio:', e);
      } finally {
        setLoadingList(false);
      }
    }
    loadPortfolio();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    async function loadAudit() {
      setLoadingDetail(true);
      try {
        const audit = await fetchAIUseCaseAudit(selectedId);
        setAuditDetail(audit);
      } catch (e) {
        console.error('Error fetching audit:', e);
      } finally {
        setLoadingDetail(false);
      }
    }
    loadAudit();
  }, [selectedId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUPPORTED BY AVAILABLE EVIDENCE':
        return <span className="badge badge-success"><CheckCircle2 size={13} /> {status}</span>;
      case 'PARTIALLY SUPPORTED':
        return <span className="badge badge-warning"><AlertTriangle size={13} /> {status}</span>;
      case 'CONFLICTING EVIDENCE':
        return <span className="badge badge-critical"><AlertCircle size={13} /> {status}</span>;
      default:
        return <span className="badge badge-info"><HelpCircle size={13} /> {status}</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1300, margin: '0 auto' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                AI Value Audit
              </h2>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                Cross-Domain Differentiator
              </span>
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Independent empirical reconciliation of self-reported AI KPI claims against actual operational event logs.
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left: Initiative Selector Sidebar */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              AI Portfolio Initiatives ({useCases.length})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '68vh', overflowY: 'auto' }}>
            {useCases.map((uc) => {
              const isSelected = uc.use_case_id === selectedId;
              return (
                <div
                  key={uc.use_case_id}
                  onClick={() => setSelectedId(uc.use_case_id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      {uc.use_case_id} • {uc.process_id}
                    </span>
                    <span className={`badge ${
                      uc.stage === 'Scaled' ? 'badge-success' : uc.stage === 'Pilot' ? 'badge-warning' : 'badge-info'
                    }`} style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                      {uc.stage}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                    lineHeight: 1.3
                  }}>
                    {uc.use_case_name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>
                    KPI: {uc.primary_kpi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Audit View */}
        <div>
          {loadingDetail && (
            <div className="glass-panel" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              Analyzing operational logs for AI reconciliation...
            </div>
          )}

          {!loadingDetail && auditDetail && (
            <div>
              {/* Header Card */}
              <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 24 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      {auditDetail.use_case_id} • Archetype: {auditDetail.archetype} • Stage: {auditDetail.stage}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                      {auditDetail.use_case_name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                      Linked Operational Process: <strong style={{ color: '#ffffff' }}>{auditDetail.process_name} ({auditDetail.process_id})</strong>
                    </p>
                  </div>

                  <div>
                    {getStatusBadge(auditDetail.observed_operations.evidence_status)}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.25)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: 'var(--text-main)'
                }}>
                  {auditDetail.observed_operations.explanation}
                </div>
              </div>

              {/* Side-by-Side: Portfolio Reported vs Observed Reality */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, marginBottom: 24 }}>
                {/* 1. Portfolio Reported */}
                <div className="glass-panel" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <FileSpreadsheet size={18} color="var(--text-muted)" />
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', margin: 0 }}>
                      Portfolio-Reported Claims (Self-Reported)
                    </h4>
                  </div>

                  {/* Portfolio KPI Value Box */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                    marginBottom: 16
                  }}>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Expected Annual Value</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit' }}>
                        ${(auditDetail.portfolio_reported.expected_annual_value_usd / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Realized Annual Value</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-info)', fontFamily: 'Outfit' }}>
                        ${(auditDetail.portfolio_reported.realized_annual_value_usd / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                    <div>Hours Saved: <strong style={{ color: '#ffffff' }}>{auditDetail.portfolio_reported.hours_saved_annual.toLocaleString()}h</strong></div>
                    <div>FTE Released: <strong style={{ color: '#ffffff' }}>{auditDetail.portfolio_reported.fte_capacity_released} FTE</strong></div>
                  </div>

                  {/* Specific KPIs */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>
                      Owner-Reported Primary KPI:
                    </div>
                    {auditDetail.portfolio_reported.reported_kpis.length > 0 ? (
                      auditDetail.portfolio_reported.reported_kpis.map((kpi, idx) => (
                        <div key={idx} style={{
                          background: 'rgba(255,255,255,0.02)',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: 6
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#ffffff', fontWeight: 500 }}>{kpi.kpi_name}</span>
                            <span style={{ color: 'var(--status-info)', fontWeight: 700 }}>
                              {kpi.baseline_value} → {kpi.current_value} ({kpi.reported_pct_change > 0 ? `+${kpi.reported_pct_change}` : kpi.reported_pct_change}%)
                            </span>
                          </div>
                          {kpi.measured_date && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 2 }}>
                              Measured as of: {kpi.measured_date}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>No specific KPI measurement logged in portfolio.</div>
                    )}
                  </div>
                </div>

                {/* 2. Observed in Operational Data */}
                <div className="glass-panel" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Clock size={18} color="var(--accent-primary)" />
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', margin: 0 }}>
                      Observed in Operational Event Logs
                    </h4>
                  </div>

                  {auditDetail.observed_operations.pre_post_analysis ? (
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 12 }}>
                        Anchor Date: <strong style={{ color: '#ffffff' }}>{auditDetail.observed_operations.pre_post_analysis.deployment_anchor_date}</strong> (±180-Day Window)
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginBottom: 14 }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-dim)' }}>
                            <th style={{ padding: '6px 8px' }}>Metric</th>
                            <th style={{ padding: '6px 8px' }}>Pre (180d)</th>
                            <th style={{ padding: '6px 8px' }}>Post (180d)</th>
                            <th style={{ padding: '6px 8px' }}>Observed Shift</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '8px', color: 'var(--text-muted)' }}>Cases</td>
                            <td style={{ padding: '8px' }}>{auditDetail.observed_operations.pre_post_analysis.pre_period.cases}</td>
                            <td style={{ padding: '8px' }}>{auditDetail.observed_operations.pre_post_analysis.post_period.cases}</td>
                            <td style={{ padding: '8px', color: 'var(--text-dim)' }}>Volume</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '8px', color: 'var(--text-muted)' }}>Median Turnaround</td>
                            <td style={{ padding: '8px' }}>{auditDetail.observed_operations.pre_post_analysis.pre_period.median_turnaround_hours}h</td>
                            <td style={{ padding: '8px', fontWeight: 700, color: '#ffffff' }}>{auditDetail.observed_operations.pre_post_analysis.post_period.median_turnaround_hours}h</td>
                            <td style={{ padding: '8px', fontWeight: 700, color: auditDetail.observed_operations.pre_post_analysis.observed_changes.median_turnaround_change_pct < 0 ? 'var(--status-success)' : 'var(--status-critical)' }}>
                              {auditDetail.observed_operations.pre_post_analysis.observed_changes.median_turnaround_change_pct}%
                            </td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '8px', color: 'var(--text-muted)' }}>Rework Rate</td>
                            <td style={{ padding: '8px' }}>{auditDetail.observed_operations.pre_post_analysis.pre_period.rework_rate_pct}%</td>
                            <td style={{ padding: '8px', color: '#ffffff' }}>{auditDetail.observed_operations.pre_post_analysis.post_period.rework_rate_pct}%</td>
                            <td style={{ padding: '8px', fontWeight: 700, color: auditDetail.observed_operations.pre_post_analysis.observed_changes.rework_rate_point_change <= 0 ? 'var(--status-success)' : 'var(--status-warning)' }}>
                              {auditDetail.observed_operations.pre_post_analysis.observed_changes.rework_rate_point_change > 0 ? `+${auditDetail.observed_operations.pre_post_analysis.observed_changes.rework_rate_point_change}` : auditDetail.observed_operations.pre_post_analysis.observed_changes.rework_rate_point_change} pts
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(0,0,0,0.2)',
                      padding: '20px',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                      color: 'var(--text-dim)',
                      fontSize: '0.85rem'
                    }}>
                      No deployment date or insufficient event window available in process_event_log.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
