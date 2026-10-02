export interface ProcessDefinition {
  process_id: string;
  process_name: string;
  division_id?: string;
  source_table?: string;
  sla_hours: number;
  has_event_log: boolean;
  standard_path: string;
  is_hero: boolean;
  supported_filters: {
    access_type?: string[];
  };
}

export interface ProcessMetrics {
  cases: number;
  median_turnaround_hours: number;
  mean_turnaround_hours: number;
  p75_turnaround_hours: number;
  p90_turnaround_hours: number;
  p95_turnaround_hours: number;
  total_cost_php: number;
  median_cost_php: number;
  date_range: {
    from: string;
    to: string;
  };
}

export interface LargestBottleneck {
  activity: string;
  median_wait_hours: number;
  p90_wait_hours: number;
  affected_cases: number;
  delay_share: number;
  plain_language_summary: string;
}

export interface TransitionWait {
  from_activity: string;
  to_activity: string;
  transition: string;
  occurrences: number;
  affected_cases: number;
  median_wait_hours: number;
  p90_wait_hours: number;
  total_wait_hours: number;
  delay_share_pct: number;
}

export interface ApprovalStep {
  step_name: string;
  count: number;
  affected_cases: number;
  median_wait_hours: number;
  p90_wait_hours: number;
  total_wait_hours: number;
  delay_share_pct: number;
}

export interface BottlenecksData {
  largest_bottleneck: LargestBottleneck;
  transitions: TransitionWait[];
  approval_steps: ApprovalStep[];
  total_waiting_hours: number;
}

export interface ReworkLoop {
  loop: string;
  occurrences: number;
  affected_cases: number;
  share_of_rework_cases: number;
}

export interface ReworkData {
  rate: number;
  rate_pct: number;
  affected_cases: number;
  total_cases: number;
  avg_repeat_count: number;
  max_repeat_count: number;
  top_loop: string;
  top_loops: ReworkLoop[];
}

export interface HandoffsData {
  median: number;
  p90: number;
  mean: number;
  max: number;
  total_cases: number;
}

export interface BaselineComparison {
  official_baseline_hours: number;
  calculated_median_hours: number;
  difference_hours: number;
  explanation: string;
}

export interface SLAData {
  sla_target_hours: number;
  total_cases: number;
  met_cases: number;
  breached_cases: number;
  attainment_rate: number;
  breach_rate: number;
  median_breach_hours: number;
  p90_turnaround_hours: number;
  baseline_comparison?: BaselineComparison;
}

export interface VariantData {
  variant: string;
  case_count: number;
  percentage: number;
  median_duration_hours: number;
  p90_duration_hours: number;
  sla_attainment_pct: number;
  rework_rate_pct: number;
}

export interface AutomationCandidate {
  activity_id: string;
  activity_name: string;
  is_manual: boolean;
  standard_sequence: number;
  assessment: 'Still Supported' | 'Needs Reassessment' | 'Insufficient Evidence';
  rationale: string;
  survey_2023: {
    rule_based_pct?: number;
    exception_rate_pct?: number;
    annual_volume?: number;
    automation_score?: number;
    recommended_approach: string;
  };
  current_evidence: {
    observed_volume: number;
    observed_rework_pct: number;
    avg_cost_php: number;
  };
}

export interface AIExplanation {
  executive_summary: string;
  likely_causes: string[];
  business_implications: string[];
  recommended_actions: string[];
  evidence_summary: string[];
  limitations: string[];
  confidence: string;
}

export interface AnalyzeResponse {
  process_id: string;
  process_name: string;
  standard_path: string;
  health_status: 'Critical' | 'Needs Attention' | 'Healthy' | 'Insufficient Data';
  metrics: ProcessMetrics;
  bottlenecks: BottlenecksData;
  rework: ReworkData;
  handoffs: HandoffsData;
  sla: SLAData;
  variants: VariantData[];
  automation: AutomationCandidate[];
  evidence: Record<string, any>;
  ai_explanation: AIExplanation;
}

export interface SimulationResult {
  disclaimer: string;
  target_stage: string;
  parameters: {
    stage_reduction_pct: number;
    rework_reduction_pct: number;
    simulated_stage: string;
  };
  current: {
    median_turnaround_hours: number;
    p90_turnaround_hours: number;
    sla_attainment_pct: number;
    rework_rate_pct: number;
  };
  scenario: {
    estimated_median_turnaround_hours: number;
    estimated_p90_turnaround_hours: number;
    estimated_sla_attainment_pct: number;
    estimated_rework_rate_pct: number;
    median_hours_saved: number;
    sla_improvement_points: number;
  };
  calculation_methodology: {
    formula: string;
    stage_wait_applied: number;
    assumptions: string[];
  };
}

export interface AIUseCaseSummary {
  use_case_id: string;
  use_case_name: string;
  process_id: string;
  process_name: string;
  archetype: string;
  stage: string;
  primary_kpi: string;
  pilot_date?: string;
  scaled_date?: string;
  portfolio_value: {
    expected_annual_value_usd: number;
    realized_annual_value_usd: number;
    hours_saved_annual: number;
    fte_capacity_released: number;
  };
}

export interface AIUseCaseAudit {
  use_case_id: string;
  use_case_name: string;
  process_id: string;
  process_name: string;
  archetype: string;
  stage: string;
  primary_kpi: string;
  portfolio_reported: {
    title: string;
    expected_annual_value_usd: number;
    realized_annual_value_usd: number;
    hours_saved_annual: number;
    fte_capacity_released: number;
    reported_kpis: Array<{
      kpi_id: string;
      kpi_name: string;
      baseline_value: number;
      current_value: number;
      measured_date?: string;
      reported_pct_change: number;
    }>;
  };
  observed_operations: {
    title: string;
    pre_post_analysis?: {
      deployment_anchor_date: string;
      window_days: number;
      pre_period: {
        cases: number;
        median_turnaround_hours: number;
        p90_turnaround_hours: number;
        rework_rate_pct: number;
        avg_cost_php: number;
      };
      post_period: {
        cases: number;
        median_turnaround_hours: number;
        p90_turnaround_hours: number;
        rework_rate_pct: number;
        avg_cost_php: number;
      };
      observed_changes: {
        median_turnaround_change_pct: number;
        rework_rate_point_change: number;
      };
    };
    evidence_status: 'SUPPORTED BY AVAILABLE EVIDENCE' | 'PARTIALLY SUPPORTED' | 'CONFLICTING EVIDENCE' | 'INSUFFICIENT EVIDENCE';
    explanation: string;
  };
}

export interface AskResponse {
  answer: string;
  evidence_references: string[];
  confidence: string;
  grounded: boolean;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  ai_provider: string;
  ai_configured: boolean;
  active_model: string;
  datasets: Record<string, string>;
}
