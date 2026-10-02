import React, { useState } from 'react';
import { HelpCircle, X, Send, Sparkles, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { askFlowGuard } from '../api/client';
import { AskResponse } from '../types';

interface AskFlowGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  processId: string;
  processName: string;
  accessType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const AskFlowGuardModal: React.FC<AskFlowGuardModalProps> = ({
  isOpen,
  onClose,
  processId,
  processName,
  accessType,
  dateFrom,
  dateTo
}) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<AskResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Where is work getting stuck?',
    'Why is Privacy review taking so long?',
    'Where is most rework happening?',
    'Which step is a good automation candidate?',
    'Did the linked AI initiative improve performance?'
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);
    try {
      const res = await askFlowGuard(processId, q, dateFrom, dateTo, accessType);
      setResponse(res);
    } catch (e: any) {
      setResponse({
        answer: 'Failed contacting FlowGuard backend analytics.',
        evidence_references: [],
        confidence: 'low',
        grounded: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 680,
          padding: '28px',
          background: 'rgba(16, 22, 34, 0.98)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Ask FlowGuard
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Natural-language Q&A strictly grounded in calculated evidence for <strong>{processName}</strong>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px 10px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Suggested Question Chips */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>
            Suggested Inquiries:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(prompt);
                  handleAsk(prompt);
                }}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '5px 10px', borderRadius: 9999 }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(question)}
            placeholder="Ask anything about delays, rework, or automation candidates..."
            style={{ flex: 1, padding: '12px 16px', fontSize: '0.92rem' }}
          />
          <button
            onClick={() => handleAsk(question)}
            disabled={isLoading || !question.trim()}
            className="btn-primary"
            style={{ padding: '0 20px' }}
          >
            {isLoading ? 'Thinking...' : <Send size={16} />}
          </button>
        </div>

        {/* Response Card */}
        {response && (
          <div className="animate-fade-in" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  Grounded Answer
                </span>
              </div>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                Confidence: {response.confidence.toUpperCase()}
              </span>
            </div>

            <p style={{ fontSize: '0.94rem', color: '#ffffff', lineHeight: 1.6, marginBottom: 14 }}>
              {response.answer}
            </p>

            {response.evidence_references?.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                  Citations from Evidence Engine:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {response.evidence_references.map((ref, idx) => (
                    <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      • {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
