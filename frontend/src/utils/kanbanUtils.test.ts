import {
  scoreToDotCount,
  sortCandidatesByScoreDesc,
  sortStepsByOrderIndex,
  groupCandidatesByStepName,
  resolveStepIdByName,
  getStepDisplayName,
} from './kanbanUtils';

describe('scoreToDotCount', () => {
  it('truncates toward zero for positive decimals', () => {
    expect(scoreToDotCount(4.9)).toBe(4);
    expect(scoreToDotCount(4.1)).toBe(4);
  });

  it('returns 0 for negative scores', () => {
    expect(scoreToDotCount(-1)).toBe(0);
  });
});

describe('sortCandidatesByScoreDesc', () => {
  it('orders by averageScore descending', () => {
    const candidates = [
      { fullName: 'A', averageScore: 2, currentInterviewStep: 'S', id: 1, applicationId: 1 },
      { fullName: 'B', averageScore: 5, currentInterviewStep: 'S', id: 2, applicationId: 2 },
      { fullName: 'C', averageScore: 3, currentInterviewStep: 'S', id: 3, applicationId: 3 },
    ];
    const sorted = sortCandidatesByScoreDesc(candidates);
    expect(sorted.map((c) => c.averageScore)).toEqual([5, 3, 2]);
  });
});

describe('sortStepsByOrderIndex', () => {
  it('orders by orderIndex then id', () => {
    const steps = [
      { id: 3, name: 'C', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 1 },
      { id: 1, name: 'A', orderIndex: 1, interviewFlowId: 1, interviewTypeId: 1 },
      { id: 2, name: 'B', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 1 },
    ];
    const sorted = sortStepsByOrderIndex(steps);
    expect(sorted.map((s) => s.id)).toEqual([1, 2, 3]);
  });
});

describe('groupCandidatesByStepName', () => {
  it('places candidates in columns by currentInterviewStep', () => {
    const candidates = [
      { fullName: 'A', averageScore: 3, currentInterviewStep: 'Technical Interview', id: 1, applicationId: 1 },
      { fullName: 'B', averageScore: 5, currentInterviewStep: 'Initial Screening', id: 2, applicationId: 2 },
    ];
    const grouped = groupCandidatesByStepName(candidates, [
      'Initial Screening',
      'Technical Interview',
    ]);
    expect(grouped['Initial Screening']).toHaveLength(1);
    expect(grouped['Technical Interview']).toHaveLength(1);
    expect(grouped['Initial Screening'][0].fullName).toBe('B');
  });

  it('returns empty arrays for steps with no candidates', () => {
    const grouped = groupCandidatesByStepName([], ['Initial Screening']);
    expect(grouped['Initial Screening']).toEqual([]);
  });
});

describe('resolveStepIdByName', () => {
  const steps = [
    { id: 10, name: 'Initial Screening', orderIndex: 1, interviewFlowId: 1, interviewTypeId: 1 },
    { id: 20, name: 'Technical Interview', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 2 },
  ];

  it('returns step id when name exists', () => {
    expect(resolveStepIdByName('Technical Interview', steps)).toBe(20);
  });

  it('returns undefined when name is missing', () => {
    expect(resolveStepIdByName('Unknown', steps)).toBeUndefined();
  });
});

describe('getStepDisplayName', () => {
  const labels = { 'Technical Interview': 'Entrevista técnica' };

  it('returns translated label when mapped', () => {
    expect(getStepDisplayName('Technical Interview', labels)).toBe('Entrevista técnica');
  });

  it('falls back to api name when not mapped', () => {
    expect(getStepDisplayName('Other Step', labels)).toBe('Other Step');
  });
});
