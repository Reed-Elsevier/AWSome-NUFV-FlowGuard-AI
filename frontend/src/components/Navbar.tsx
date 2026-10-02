import React from 'react';
import { ShieldCheck, Activity, GitFork, Cpu, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import type { HealthResponse } from '../types';

interface NavbarProps {
  activeTab: 'overview' | 'explorer' | 'simulator' | 'ai-value' | 'ask';
  setActiveTab: (tab: 'overview' | 'explorer' | 'simulator' | 'ai-value' | 'ask') => void;
  health: HealthResponse | null;
  onOpenAsk: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, health, onOpenAsk }) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10, 13, 20, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <ShieldCheck size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="brand-font" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                FlowGuard AI
              </span>
              <span className="badge badge-info" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                Track 7
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Operational Intelligence & AI Value Audit
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'explorer', label: 'Process Explorer', icon: GitFork },
            { id: 'simulator', label: 'Fix Simulator', icon: Cpu },
            { id: 'ai-value', label: 'AI Value Audit', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Actions & Health Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Ask FlowGuard Button */}
          <button
            onClick={onOpenAsk}
            className="btn-secondary"
            style={{
              padding: '7px 14px',
              fontSize: '0.82rem',
              borderColor: 'rgba(99, 102, 241, 0.3)',
              background: 'rgba(99, 102, 241, 0.08)'
            }}
          >
            <HelpCircle size={15} color="var(--accent-primary)" />
            Ask FlowGuard
          </button>

          {/* AI Provider Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem'
          }}>
            {health?.ai_configured ? (
              <>
                <CheckCircle2 size={13} color="var(--status-success)" />
                <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>
                  {health.ai_provider?.toUpperCase()}
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={13} color="var(--status-warning)" />
                <span style={{ color: 'var(--status-warning)' }}>
                  Ready for Key ({health?.ai_provider || 'Anthropic'})
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
