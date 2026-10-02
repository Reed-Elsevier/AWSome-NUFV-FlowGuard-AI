import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  HeaderFilters 
} from './components/HeaderFilters';
import { 
  MetricsGrid 
} from './components/MetricsGrid';
import { 
  BottleneckCard 
} from './components/BottleneckCard';
import { 
  ProcessFlowDiagram 
} from './components/ProcessFlowDiagram';
import { 
  AIExplanationSection 
} from './components/AIExplanationSection';
import { 
  EvidenceDrawer 
} from './components/EvidenceDrawer';
import { 
  VariantsTable 
} from './components/VariantsTable';
import { 
  AutomationSection 
} from './components/AutomationSection';
import { 
  FixSimulatorView 
} from './components/FixSimulatorView';
import { 
  AIValueAuditView 
} from './components/AIValueAuditView';
import { 
  AskFlowGuardModal 
} from './components/AskFlowGuardModal';

import { 
  fetchProcesses, 
  analyzeProcess, 
  fetchHealth 
} from './api/client';
import { 
  ProcessDefinition, 
  AnalyzeResponse, 
  HealthResponse 
} from './types';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  FileText, 
  GitFork, 
  HelpCircle, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Zap 
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'simulator' | 'ai-value' | 'ask'>('overview');
  const [processes, setProcesses] = useState<ProcessDefinition[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState<string>('PRC005');
  const [selectedAccessType, setSelectedAccessType] = useState<string>('Data Access - PII');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  
  const [analysisData, setAnalysisData] = useState<AnalyzeResponse | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);
  const [isAskOpen, setIsAskOpen] = useState<boolean>(false);

  // Initial data loading
  useEffect(() => {
    async function init() {
      try {
        const [h, procs] = await Promise.all([
          fetchHealth().catch(() => null),
          fetchProcesses().catch(() => [])
        ]);
        if (h) setHealth(h);
        if (procs.length > 0) {
          setProcesses(procs);
          // Run default Hero analysis immediately
          handleAnalyze('PRC005', 'Data Access - PII', '', '');
        }
      } catch (err) {
        console.error('Initialization error:', err);
      }
    }
    init();
  }, []);

  const handleAnalyze = async (
    procId = selectedProcessId,
    accType = selectedAccessType,
    dFrom = dateFrom,
    dTo = dateTo
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const filters: Record<string, any> = {};
      if (procId === 'PRC005' && accType) {
        filters.access_type = accType;
      }
      const data = await analyzeProcess(procId, dFrom, dTo, filters);
      setAnalysisData(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'Operational analysis failed. Verify backend service is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentProcess = processes.find(p => p.process_id === selectedProcessId);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        health={health}
        onOpenAsk={() => setIsAskOpen(true)}
      />

      {/* Main Container */}
      <main style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '24px', flex: 1 }}>
        {/* Global Process & Date Filter Bar (Active on Overview & Explorer) */}
        {(activeTab === 'overview' || activeTab === 'explorer') && (
          <HeaderFilters
            processes={processes}
            selectedProcessId={selectedProcessId}
            onSelectProcess={(id) => {
              setSelectedProcessId(id);
              handleAnalyze(id, selectedAccessType, dateFrom, dateTo);
            }}
            selectedAccessType={selectedAccessType}
            onSelectAccessType={(acc) => {
              setSelectedAccessType(acc);
              handleAnalyze(selectedProcessId, acc, dateFrom, dateTo);
            }}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            onAnalyze={() => handleAnalyze()}
            isLoading={isLoading}
          />
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-critical-bg)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--status-critical)',
            marginBottom: 24,
            fontSize: '0.9rem'
          }}>
            {errorMessage}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: OPERATIONS OVERVIEW (10-Second Executive Scan) */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && analysisData && (
          <div className="animate-fade-in">
            {/* Overview Header Banner */}
            <div className="glass-panel" style={{
              padding: '24px 28px',
              marginBottom: 24,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {analysisData.process_name}
                  </h1>
                  <span className={`badge ${
                    analysisData.health_status === 'Healthy'
                      ? 'badge-success'
                      : analysisData.health_status === 'Critical'
                      ? 'badge-critical'
                      : 'badge-warning'
                  }`}>
                    {analysisData.health_status}
                  </span>
                  {selectedProcessId === 'PRC005' && selectedAccessType && (
                    <span className="badge badge-info">
                      {selectedAccessType}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Standard SLA Target: <strong>{analysisData.sla.sla_target_hours} hours</strong> • Owner: Global Shared Services
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setActiveTab('explorer')} className="btn-primary" style={{ fontSize: '0.88rem' }}>
                  <GitFork size={16} />
                  Deep-Dive Process Explorer
                </button>
                <button onClick={() => setActiveTab('simulator')} className="btn-secondary" style={{ fontSize: '0.88rem' }}>
                  <Zap size={16} />
                  Launch Fix Simulator
                </button>
              </div>
            </div>

            {/* Spotlight Bottleneck Banner */}
            <BottleneckCard
              bottleneck={analysisData.bottlenecks.largest_bottleneck}
              onSimulateFix={() => setActiveTab('simulator')}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />

            {/* Metrics Grid */}
            <MetricsGrid
              metrics={analysisData.metrics}
              sla={analysisData.sla}
              rework={analysisData.rework}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />

            {/* Process Flow Ribbon */}
            <ProcessFlowDiagram
              standardPath={analysisData.standard_path}
              bottlenecks={analysisData.bottlenecks}
              isHero={selectedProcessId === 'PRC005'}
            />

            {/* AI Explanation Grounded Section */}
            <AIExplanationSection
              explanation={analysisData.ai_explanation}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PROCESS EXPLORER (Full Analytics Drilldown) */}
        {/* ========================================================================= */}
        {activeTab === 'explorer' && analysisData && (
          <div className="animate-fade-in">
            {/* Spotlight Bottleneck */}
            <BottleneckCard
              bottleneck={analysisData.bottlenecks.largest_bottleneck}
              onSimulateFix={() => setActiveTab('simulator')}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />

            {/* Metrics Grid */}
            <MetricsGrid
              metrics={analysisData.metrics}
              sla={analysisData.sla}
              rework={analysisData.rework}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />

            {/* Visual Process Flow */}
            <ProcessFlowDiagram
              standardPath={analysisData.standard_path}
              bottlenecks={analysisData.bottlenecks}
              isHero={selectedProcessId === 'PRC005'}
            />

            {/* Top Variants Table */}
            <VariantsTable variants={analysisData.variants} />

            {/* Automation Candidates Section */}
            <AutomationSection candidates={analysisData.automation} />

            {/* AI Grounded Interpretation */}
            <AIExplanationSection
              explanation={analysisData.ai_explanation}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: FIX SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'simulator' && (
          <FixSimulatorView
            processId={selectedProcessId}
            defaultTargetStage={
              selectedProcessId === 'PRC005'
                ? selectedAccessType.includes('PII')
                  ? 'Privacy'
                  : 'Data Owner'
                : 'Top Bottleneck'
            }
            accessType={selectedProcessId === 'PRC005' ? selectedAccessType : undefined}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AI VALUE AUDIT */}
        {/* ========================================================================= */}
        {activeTab === 'ai-value' && (
          <AIValueAuditView />
        )}
      </main>

      {/* Traceable Evidence Drawer Modal */}
      <EvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        data={analysisData}
      />

      {/* Ask FlowGuard Natural Language Q&A Modal */}
      <AskFlowGuardModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
        processId={selectedProcessId}
        processName={currentProcess?.process_name || selectedProcessId}
        accessType={selectedProcessId === 'PRC005' ? selectedAccessType : undefined}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
}

export default App;
