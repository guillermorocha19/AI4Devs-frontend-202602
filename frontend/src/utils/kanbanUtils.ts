export type InterviewStep = {
  id: number;
  name: string;
  orderIndex: number;
  interviewFlowId: number;
  interviewTypeId: number;
};

export type PositionCandidate = {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  id: number;
  applicationId: number;
};

export const scoreToDotCount = (score: number): number =>
  Math.max(0, Math.trunc(score));

export const sortCandidatesByScoreDesc = (
  candidates: PositionCandidate[]
): PositionCandidate[] =>
  [...candidates].sort((a, b) => b.averageScore - a.averageScore);

export const sortStepsByOrderIndex = (steps: InterviewStep[]): InterviewStep[] =>
  [...steps].sort((a, b) => {
    if (a.orderIndex !== b.orderIndex) {
      return a.orderIndex - b.orderIndex;
    }
    return a.id - b.id;
  });

export const groupCandidatesByStepName = (
  candidates: PositionCandidate[],
  stepNames: string[]
): Record<string, PositionCandidate[]> => {
  const grouped: Record<string, PositionCandidate[]> = {};
  stepNames.forEach((name) => {
    grouped[name] = sortCandidatesByScoreDesc(
      candidates.filter((c) => c.currentInterviewStep === name)
    );
  });
  return grouped;
};

export const resolveStepIdByName = (
  stepName: string,
  steps: InterviewStep[]
): number | undefined => steps.find((s) => s.name === stepName)?.id;

export const getStepDisplayName = (
  stepName: string,
  labelsMap: Record<string, string>
): string => labelsMap[stepName] ?? stepName;
