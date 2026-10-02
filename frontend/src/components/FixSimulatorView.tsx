import React, { useState, useEffect } from 'react';
import { Cpu, Sliders, ArrowRight, Info, CheckCircle2, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { runSimulation } from '../api/client';
import { SimulationResult } from '../types';

interface FixSimulatorViewProps {
  processId: string;
  defaultTargetStage?: string;
  accessType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const FixSimulatorView: React.FC<FixSimulatorViewProps> = ({
  processId,
  defaultTargetStage = 'Privacy',
  accessType,
  dateFrom,
  dateTo
}) => {
  const [targetStage, setTargetStage] = useState(defaultTargetStage);
  const [stageReduction, setStageReduction] = useState(30);
  const [reworkReduction, setReworkReduction] = useState(50);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const availableStages = processId === 'PRC005'
    ? ['Privacy', 'Data Owner', 'InfoSec', 'Manager', 'Provisioning']
    : ['Top Bottleneck', 'Review Stage', 'Approval Stage'];

  const executeSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await runSimulation(
        processId,
        stageReduction,
        reworkReduction,
        targetStage,
        dateFrom,
        dateTo,
        accessType
      );
      setSimResult(res);
    } catch (e) {
      console.error('Simulation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    executeSimulation();
  }, [processId, targetStage, stageReduction, reworkReduction]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            background: 'var(--cyan-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Cpu size={20} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Process Friction Fix Simulator
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Interactive scenario modeling based on deterministic process arithmetic
            </span>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div style={{
          marginTop: 14,
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          fontSize: '0.82rem',
          color: 'var(--status-info)',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <span>
            <strong>SCENARIO ESTIMATE:</strong> Based on observed process data and user-selected assumptions. Not a machine learning forecast or guaranteed outcome.
          </span>
        </div>
      </div>

      {/* Control Sliders Panel */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: 28 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: 20 }}>
          Simulation Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Target Stage Selector */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Target Stage to Optimize
            </label>
            <select
              value={targetStage}
              onChange={(e) => setTargetStage(e.target.value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {availableStages.map(s => (
                <option key={s} value={s}>{s} Stage</option>
              ))}
            </select>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 6 }}>
              Select the friction stage or approval queue you plan to streamline.
            </p>
          </div>

          {/* Stage Waiting Time Reduction Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Stage Wait Time Reduction
              </label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--status-info)' }}>
                {stageReduction}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={stageReduction}
              onChange={(e) => setStageReduction(Number(e.target.value))}
              style={{ width: '100%', marginTop: 12, accentColor: 'var(--accent-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              <span>0% (No change)</span>
              <span>25%</span>
              <span>50%</span>
              <span>100% (Instant)</span>
            </div>
          </div>

          {/* Rework Reduction Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Rework Loop Reduction
              </label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--status-info)' }}>
                {reworkReduction}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={reworkReduction}
              onChange={(e) => setReworkReduction(Number(e.target.value))}
              style={{ width: '100%', marginTop: 12, accentColor: 'var(--accent-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              <span>0% (Unchanged)</span>
              <span>50% (Cut in half)</span>
              <span>100% (Eliminated)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Current vs Scenario Estimate */}
      {simResult && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 24,
          marginBottom: 28
        }}>
          {/* Current State */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Current Observed Operations
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: 4, marginBottom: 20 }}>
              Baseline Performance
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Median Turnaround:</span>
                <strong style={{ color: '#ffffff' }}>{simResult.current.median_turnaround_hours}h</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>P90 Turnaround:</span>
                <strong style={{ color: 'var(--status-warning)' }}>{simResult.current.p90_turnaround_hours}h</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>SLA Attainment:</span>
                <strong style={{ color: '#ffffff' }}>{simResult.current.sla_attainment_pct}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Rework Rate:</span>
                <strong style={{ color: '#ffffff' }}>{simResult.current.rework_rate_pct}%</strong>
              </div>
            </div>
          </div>

          {/* Scenario Estimate */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderLeft: '4px solid var(--status-success)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(18, 24, 38, 0.9) 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-success)', textTransform: 'uppercase' }}>
                Simulated Scenario Estimate
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                Estimated Result
              </span>
            </div>

            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 4, marginBottom: 20 }}>
              Projected Post-Improvement
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Median:</span>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--status-success)', fontSize: '1.1rem' }}>
                    {simResult.scenario.estimated_median_turnaround_hours}h
                  </strong>
                  <span style={{ marginLeft: 6, fontSize: '0.78rem', color: 'var(--status-success)' }}>
                    (-{simResult.scenario.median_hours_saved}h saved)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated P90:</span>
                <strong style={{ color: '#ffffff' }}>{simResult.scenario.estimated_p90_turnaround_hours}h</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated SLA Attainment:</span>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--status-success)', fontSize: '1.1rem' }}>
                    {simResult.scenario.estimated_sla_attainment_pct}%
                  </strong>
                  <span style={{ marginLeft: 6, fontSize: '0.78rem', color: 'var(--status-success)' }}>
                    (+{simResult.scenario.sla_improvement_points}% pts)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Rework:</span>
                <strong style={{ color: '#ffffff' }}>{simResult.scenario.estimated_rework_rate_pct}%</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "How Was This Calculated?" Accordion */}
      {simResult && (
        <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: 28 }}>
          <button
            onClick={() => setShowFormula(!showFormula)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 0
            }}
          >
            <Info size={16} />
            {showFormula ? 'Hide Calculation Methodology' : 'How was this calculated? (Transparent Methodology)'}
          </button>

          {showFormula && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }} className="animate-fade-in">
              <div style={{
                background: 'rgba(0,0,0,0.35)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                marginBottom: 12
              }}>
                {simResult.calculation_methodology.formula}
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                {simResult.calculation_methodology.assumptions.map((ass, i) => (
                  <li key={i}>• {ass}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
