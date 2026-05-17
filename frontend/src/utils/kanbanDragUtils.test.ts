import {
  moveCandidateToStep,
  parseDragId,
  getDragId,
  processStageChange,
} from './kanbanDragUtils';
import { ERROR_ACTUALIZAR_FASE } from '../constants/kanbanLabels';

describe('kanbanDragUtils', () => {
  const grouped = {
    'Initial Screening': [
      {
        fullName: 'A',
        averageScore: 3,
        currentInterviewStep: 'Initial Screening',
        id: 1,
        applicationId: 1,
      },
    ],
    'Technical Interview': [],
  };

  it('getDragId and parseDragId are inverse', () => {
    expect(parseDragId(getDragId(42))).toBe(42);
  });

  it('moveCandidateToStep moves candidate between columns', () => {
    const next = moveCandidateToStep(
      grouped,
      1,
      'Initial Screening',
      'Technical Interview'
    );
    expect(next['Initial Screening']).toHaveLength(0);
    expect(next['Technical Interview']).toHaveLength(1);
    expect(next['Technical Interview'][0].currentInterviewStep).toBe(
      'Technical Interview'
    );
  });

  it('returns same grouped when from equals to', () => {
    const next = moveCandidateToStep(
      grouped,
      1,
      'Initial Screening',
      'Initial Screening'
    );
    expect(next).toBe(grouped);
  });

  describe('processStageChange', () => {
    it('keeps optimistic grouped on success', async () => {
      const updateStage = jest.fn().mockResolvedValue(undefined);
      const result = await processStageChange({
        candidateId: 1,
        fromStepName: 'Initial Screening',
        toStepName: 'Technical Interview',
        toStepId: 20,
        applicationId: 1,
        grouped,
        updateStage,
      });
      expect(updateStage).toHaveBeenCalledWith(1, {
        applicationId: 1,
        currentInterviewStep: 20,
      });
      expect(result.error).toBeUndefined();
      expect(result.grouped['Technical Interview']).toHaveLength(1);
    });

    it('reverts grouped on failure', async () => {
      const updateStage = jest
        .fn()
        .mockRejectedValue(new Error(ERROR_ACTUALIZAR_FASE));
      const result = await processStageChange({
        candidateId: 1,
        fromStepName: 'Initial Screening',
        toStepName: 'Technical Interview',
        toStepId: 20,
        applicationId: 1,
        grouped,
        updateStage,
      });
      expect(result.error).toBe(ERROR_ACTUALIZAR_FASE);
      expect(result.grouped).toBe(grouped);
    });
  });
});
