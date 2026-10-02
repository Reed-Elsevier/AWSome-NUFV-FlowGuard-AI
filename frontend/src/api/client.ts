import { 
  ProcessDefinition, 
  AnalyzeResponse, 
  SimulationResult, 
  AIUseCaseSummary, 
  AIUseCaseAudit, 
  AskResponse,
  HealthResponse 
} from '../types';

const API_BASE = '';

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Failed to fetch system health');
  return res.json();
}

export async function fetchProcesses(): Promise<ProcessDefinition[]> {
  const res = await fetch(`${API_BASE}/api/processes`);
  if (!res.ok) throw new Error('Failed to fetch processes');
  return res.json();
}

export async function analyzeProcess(
  processId: string,
  dateFrom?: string,
  dateTo?: string,
  filters?: Record<string, any>
): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      process_id: processId,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      filters: filters || {}
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Analysis failed' }));
    throw new Error(err.detail || 'Analysis failed');
  }
  return res.json();
}

export async function runSimulation(
  processId: string,
  stageReductionPct: number,
  reworkReductionPct: number,
  targetStage?: string,
  dateFrom?: string,
  dateTo?: string,
  accessType?: string
): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      process_id: processId,
      stage_reduction_pct: stageReductionPct,
      rework_reduction_pct: reworkReductionPct,
      target_stage: targetStage || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      access_type: accessType || undefined
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Simulation failed' }));
    throw new Error(err.detail || 'Simulation failed');
  }
  return res.json();
}

export async function fetchAIUseCases(): Promise<AIUseCaseSummary[]> {
  const res = await fetch(`${API_BASE}/api/ai-value`);
  if (!res.ok) throw new Error('Failed to fetch AI portfolio');
  return res.json();
}

export async function fetchAIUseCaseAudit(useCaseId: string): Promise<AIUseCaseAudit> {
  const res = await fetch(`${API_BASE}/api/ai-value/${useCaseId}`);
  if (!res.ok) throw new Error(`Failed to audit AI use case ${useCaseId}`);
  return res.json();
}

export async function askFlowGuard(
  processId: string,
  question: string,
  dateFrom?: string,
  dateTo?: string,
  accessType?: string
): Promise<AskResponse> {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      process_id: processId,
      question,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      access_type: accessType || undefined
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Ask FlowGuard failed' }));
    throw new Error(err.detail || 'Ask FlowGuard failed');
  }
  return res.json();
}
