import type { InterviewStep, PositionCandidate } from './kanbanUtils';

export const getDragId = (candidateId: number): string => `candidate-${candidateId}`;

export const parseDragId = (dragId: string): number | undefined => {
  const match = dragId.match(/^candidate-(\d+)$/);
  return match ? parseInt(match[1], 10) : undefined;
};

export const getStepDropId = (stepId: number): string => `step-${stepId}`;

export const parseStepDropId = (dropId: string): number | undefined => {
  const match = dropId.match(/^step-(\d+)$/);
  return match ? parseInt(match[1], 10) : undefined;
};

export const moveCandidateToStep = (
  grouped: Record<string, PositionCandidate[]>,
  candidateId: number,
  fromStepName: string,
  toStepName: string
): Record<string, PositionCandidate[]> => {
  if (fromStepName === toStepName) {
    return grouped;
  }

  const candidate = grouped[fromStepName]?.find((c) => c.id === candidateId);
  if (!candidate) {
    return grouped;
  }

  const next: Record<string, PositionCandidate[]> = {};
  Object.keys(grouped).forEach((stepName) => {
    next[stepName] = grouped[stepName].filter((c) => c.id !== candidateId);
  });

  const updatedCandidate: PositionCandidate = {
    ...candidate,
    currentInterviewStep: toStepName,
  };

  next[toStepName] = [...(next[toStepName] ?? []), updatedCandidate];

  return next;
};

export const findCandidateStepName = (
  candidateId: number,
  grouped: Record<string, PositionCandidate[]>
): string | undefined => {
  const entry = Object.entries(grouped).find(([, list]) =>
    list.some((c) => c.id === candidateId)
  );
  return entry?.[0];
};

export const findStepByDropId = (
  dropId: string,
  steps: InterviewStep[]
): InterviewStep | undefined => {
  const stepId = parseStepDropId(dropId);
  if (stepId === undefined) {
    return undefined;
  }
  return steps.find((s) => s.id === stepId);
};

export type ProcessStageChangeParams = {
  candidateId: number;
  fromStepName: string;
  toStepName: string;
  toStepId: number;
  applicationId: number;
  grouped: Record<string, PositionCandidate[]>;
  updateStage: (
    candidateId: number,
    payload: { applicationId: number; currentInterviewStep: number }
  ) => Promise<void>;
};

export type ProcessStageChangeResult = {
  grouped: Record<string, PositionCandidate[]>;
  error?: string;
};

export const processStageChange = async (
  params: ProcessStageChangeParams
): Promise<ProcessStageChangeResult> => {
  const {
    candidateId,
    fromStepName,
    toStepName,
    toStepId,
    applicationId,
    grouped,
    updateStage,
  } = params;

  if (fromStepName === toStepName) {
    return { grouped };
  }

  const optimistic = moveCandidateToStep(
    grouped,
    candidateId,
    fromStepName,
    toStepName
  );

  try {
    await updateStage(candidateId, {
      applicationId,
      currentInterviewStep: toStepId,
    });
    return { grouped: optimistic };
  } catch (error) {
    return {
      grouped,
      error: error instanceof Error ? error.message : undefined,
    };
  }
};
